package controller

import (
	"net/http"
	"strconv"

	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/model"
	"github.com/gin-gonic/gin"
)

func GetAllRequestAudits(c *gin.Context) {
	pageInfo := common.GetPageQuery(c)
	params := model.RequestAuditQueryParams{
		Username:  c.Query("username"),
		ModelName: c.Query("model_name"),
		RequestId: c.Query("request_id"),
		Keyword:   c.Query("keyword"),
	}
	if v, err := strconv.ParseInt(c.Query("start_timestamp"), 10, 64); err == nil {
		params.StartAt = v
	}
	if v, err := strconv.ParseInt(c.Query("end_timestamp"), 10, 64); err == nil {
		params.EndAt = v
	}
	audits, total, err := model.GetAllRequestAudits(pageInfo.GetStartIdx(), pageInfo.GetPageSize(), params)
	if err != nil {
		common.ApiError(c, err)
		return
	}
	pageInfo.SetTotal(int(total))
	pageInfo.SetItems(audits)
	common.ApiSuccess(c, pageInfo)
}

func GetRequestAudit(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil || id <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "invalid audit id",
		})
		return
	}
	audit, err := model.GetRequestAuditById(id)
	if err != nil {
		common.ApiError(c, err)
		return
	}
	if audit == nil {
		c.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"message": "audit record not found",
		})
		return
	}
	common.ApiSuccess(c, audit)
}
