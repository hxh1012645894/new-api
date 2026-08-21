package controller

import (
	"fmt"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/model"
	"github.com/gin-gonic/gin"
	"github.com/glebarez/sqlite"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"gorm.io/gorm"
)

type fdeAppointmentResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
	Data    struct {
		Id int64 `json:"id"`
	} `json:"data"`
}

func setupFdeAppointmentControllerTest(t *testing.T) (*gorm.DB, *gin.Engine) {
	t.Helper()

	previousDB := model.DB
	gin.SetMode(gin.TestMode)
	dsn := fmt.Sprintf("file:%s?mode=memory&cache=shared", strings.ReplaceAll(t.Name(), "/", "_"))
	db, err := gorm.Open(sqlite.Open(dsn), &gorm.Config{})
	require.NoError(t, err)
	require.NoError(t, db.AutoMigrate(&model.FdeAppointment{}))
	model.DB = db

	router := gin.New()
	router.POST("/api/fde/appointments", CreateFdeAppointment)

	t.Cleanup(func() {
		model.DB = previousDB
		sqlDB, dbErr := db.DB()
		if dbErr == nil {
			_ = sqlDB.Close()
		}
	})

	return db, router
}

func performFdeAppointmentRequest(t *testing.T, router *gin.Engine, payload any) *httptest.ResponseRecorder {
	t.Helper()
	body, err := common.Marshal(payload)
	require.NoError(t, err)
	request := httptest.NewRequest(http.MethodPost, "/api/fde/appointments", strings.NewReader(string(body)))
	request.Header.Set("Content-Type", "application/json")
	response := httptest.NewRecorder()
	router.ServeHTTP(response, request)
	return response
}

func TestCreateFdeAppointmentPersistsNormalizedRequest(t *testing.T) {
	db, router := setupFdeAppointmentControllerTest(t)

	response := performFdeAppointmentRequest(t, router, map[string]any{
		"name":     "  张三  ",
		"company":  "  皋如信息科技有限公司  ",
		"title":    "  技术负责人  ",
		"contact":  "  zhangsan@example.com  ",
		"scenario": "  希望把分散的业务数据建设为可供 AI 决策使用的数据仓库。  ",
		"request":  "Enterprise Brain setup",
	})

	require.Equal(t, http.StatusOK, response.Code)
	var payload fdeAppointmentResponse
	require.NoError(t, common.Unmarshal(response.Body.Bytes(), &payload))
	require.True(t, payload.Success)
	require.Positive(t, payload.Data.Id)

	var saved model.FdeAppointment
	require.NoError(t, db.First(&saved, payload.Data.Id).Error)
	assert.Equal(t, "张三", saved.Name)
	assert.Equal(t, "皋如信息科技有限公司", saved.Company)
	assert.Equal(t, "技术负责人", saved.Title)
	assert.Equal(t, "zhangsan@example.com", saved.Contact)
	assert.Equal(t, "希望把分散的业务数据建设为可供 AI 决策使用的数据仓库。", saved.Scenario)
	assert.Equal(t, "Enterprise Brain setup", saved.CooperationRequest)
	assert.Equal(t, model.FdeAppointmentStatusPending, saved.Status)
	assert.Positive(t, saved.CreatedTime)
	assert.Equal(t, saved.CreatedTime, saved.UpdatedTime)
}

func TestCreateFdeAppointmentRejectsInvalidRequestsWithoutWriting(t *testing.T) {
	tests := []struct {
		name     string
		override map[string]any
	}{
		{name: "missing name", override: map[string]any{"name": ""}},
		{name: "invalid contact", override: map[string]any{"contact": "not-a-contact"}},
		{name: "short scenario", override: map[string]any{"scenario": "太短"}},
		{name: "unsupported request", override: map[string]any{"request": "unknown"}},
		{name: "name too long", override: map[string]any{"name": strings.Repeat("张", 51)}},
		{name: "contact too long", override: map[string]any{"contact": strings.Repeat("a", 190) + "@example.com"}},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			db, router := setupFdeAppointmentControllerTest(t)
			request := map[string]any{
				"name":     "张三",
				"company":  "皋如信息科技有限公司",
				"title":    "技术负责人",
				"contact":  "13800138000",
				"scenario": "希望把客服流程通过 AI 快速落地并持续优化。",
				"request":  "Joint FDE landing",
			}
			for key, value := range test.override {
				request[key] = value
			}

			response := performFdeAppointmentRequest(t, router, request)

			assert.Equal(t, http.StatusBadRequest, response.Code)
			var count int64
			require.NoError(t, db.Model(&model.FdeAppointment{}).Count(&count).Error)
			assert.Zero(t, count)
		})
	}
}

func TestCreateFdeAppointmentDoesNotExposeInputWhenStorageFails(t *testing.T) {
	db, router := setupFdeAppointmentControllerTest(t)
	sqlDB, err := db.DB()
	require.NoError(t, err)
	require.NoError(t, sqlDB.Close())

	response := performFdeAppointmentRequest(t, router, map[string]any{
		"name":     "敏感姓名",
		"company":  "敏感公司",
		"title":    "负责人",
		"contact":  "sensitive@example.com",
		"scenario": "这是不能出现在错误响应里的敏感业务场景说明。",
		"request":  "Other",
	})

	assert.Equal(t, http.StatusInternalServerError, response.Code)
	assert.NotContains(t, response.Body.String(), "敏感")
	assert.NotContains(t, response.Body.String(), "sensitive@example.com")
}
