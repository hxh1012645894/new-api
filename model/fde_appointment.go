package model

import "github.com/QuantumNous/new-api/common"

const FdeAppointmentStatusPending = "pending"

type FdeAppointment struct {
	Id                 int64  `json:"id" gorm:"primaryKey"`
	Name               string `json:"name" gorm:"type:varchar(50);not null"`
	Company            string `json:"company" gorm:"type:varchar(100);not null"`
	Title              string `json:"title" gorm:"type:varchar(50);not null"`
	Contact            string `json:"contact" gorm:"type:varchar(200);not null"`
	Scenario           string `json:"scenario" gorm:"type:text;not null"`
	CooperationRequest string `json:"request" gorm:"column:request;type:varchar(64);not null"`
	Status             string `json:"status" gorm:"type:varchar(16);not null;index:idx_fde_appointments_status_created,priority:1"`
	CreatedTime        int64  `json:"created_time" gorm:"bigint;not null;index:idx_fde_appointments_status_created,priority:2"`
	UpdatedTime        int64  `json:"updated_time" gorm:"bigint;not null"`
}

func (appointment *FdeAppointment) Insert() error {
	now := common.GetTimestamp()
	appointment.Status = FdeAppointmentStatusPending
	appointment.CreatedTime = now
	appointment.UpdatedTime = now
	return DB.Create(appointment).Error
}
