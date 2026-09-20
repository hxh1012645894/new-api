package controller

import (
	"encoding/csv"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/model"
	"github.com/gin-gonic/gin"
)

func GetAllFdeAppointments(c *gin.Context) {
	pageInfo := common.GetPageQuery(c)
	status := c.Query("status")
	keyword := c.Query("keyword")
	appointments, total, err := model.GetAllFdeAppointments(pageInfo.GetStartIdx(), pageInfo.GetPageSize(), status, keyword)
	if err != nil {
		common.ApiError(c, err)
		return
	}
	pageInfo.SetTotal(int(total))
	pageInfo.SetItems(appointments)
	common.ApiSuccess(c, pageInfo)
}

type UpdateFdeAppointmentRequest struct {
	Status    string `json:"status"`
	AdminNote string `json:"admin_note"`
}

func UpdateFdeAppointment(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil || id <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "invalid appointment id",
		})
		return
	}
	var request UpdateFdeAppointmentRequest
	if err = common.DecodeJson(c.Request.Body, &request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "invalid request",
		})
		return
	}
	if request.Status != "" && !model.IsValidFdeAppointmentStatus(request.Status) {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "invalid status",
		})
		return
	}
	if len(request.AdminNote) > 500 {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "note too long",
		})
		return
	}
	if err = model.UpdateFdeAppointmentAdmin(id, request.Status, request.AdminNote); err != nil {
		common.ApiError(c, err)
		return
	}
	common.ApiSuccess(c, nil)
}

func ExportFdeAppointments(c *gin.Context) {
	status := c.Query("status")
	keyword := c.Query("keyword")
	appointments, _, err := model.GetAllFdeAppointments(0, 10000, status, keyword)
	if err != nil {
		common.ApiError(c, err)
		return
	}

	filename := fmt.Sprintf("fde_appointments_%s.csv", time.Now().Format("20060102_150405"))
	c.Header("Content-Disposition", "attachment; filename="+filename)
	c.Header("Content-Type", "text/csv; charset=utf-8")
	// BOM so Excel renders Chinese characters correctly.
	c.Writer.WriteString("\xEF\xBB\xBF")

	writer := csv.NewWriter(c.Writer)
	_ = writer.Write([]string{
		"ID", "提交时间", "状态", "姓名", "公司", "职务", "联系方式",
		"合作诉求", "业务场景", "备注", "飞书同步",
	})
	for _, appointment := range appointments {
		_ = writer.Write([]string{
			strconv.FormatInt(appointment.Id, 10),
			time.Unix(appointment.CreatedTime, 0).Format("2006-01-02 15:04:05"),
			appointment.Status,
			appointment.Name,
			appointment.Company,
			appointment.Title,
			appointment.Contact,
			appointment.CooperationRequest,
			appointment.Scenario,
			appointment.AdminNote,
			strconv.FormatBool(appointment.FeishuSynced),
		})
	}
	writer.Flush()
}
