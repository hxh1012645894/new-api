package controller

import (
	"errors"
	"net/http"

	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/dto"
	"github.com/QuantumNous/new-api/logger"
	"github.com/QuantumNous/new-api/service"
	"github.com/gin-gonic/gin"
)

func CreateFdeAppointment(c *gin.Context) {
	var request dto.FdeAppointmentRequest
	if err := common.DecodeJson(c.Request.Body, &request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "invalid appointment request",
		})
		return
	}

	id, err := service.CreateFdeAppointment(request)
	if errors.Is(err, service.ErrInvalidFdeAppointment) {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "invalid appointment request",
		})
		return
	}
	if err != nil {
		logger.LogError(c.Request.Context(), "failed to persist FDE appointment: "+err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "failed to save appointment",
		})
		return
	}

	common.ApiSuccess(c, dto.FdeAppointmentCreated{Id: id})
}
