package model

import (
	"errors"

	"github.com/QuantumNous/new-api/common"
)

var ErrFdeAppointmentNotFound = errors.New("appointment not found")

const (
	FdeAppointmentStatusPending   = "pending"
	FdeAppointmentStatusContacted = "contacted"
	FdeAppointmentStatusWon       = "won"
	FdeAppointmentStatusClosed    = "closed"
)

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
	AdminNote          string `json:"admin_note" gorm:"type:varchar(500)"`
	FeishuSynced       bool   `json:"feishu_synced"`
}

// IsValidFdeAppointmentStatus reports whether status is an admin-manageable state.
func IsValidFdeAppointmentStatus(status string) bool {
	switch status {
	case FdeAppointmentStatusPending,
		FdeAppointmentStatusContacted,
		FdeAppointmentStatusWon,
		FdeAppointmentStatusClosed:
		return true
	}
	return false
}

func (appointment *FdeAppointment) Insert() error {
	now := common.GetTimestamp()
	appointment.Status = FdeAppointmentStatusPending
	appointment.CreatedTime = now
	appointment.UpdatedTime = now
	return DB.Create(appointment).Error
}

func GetAllFdeAppointments(startIdx int, num int, status string, keyword string) ([]*FdeAppointment, int64, error) {
	var appointments []*FdeAppointment
	var total int64
	tx := DB.Model(&FdeAppointment{})
	if status != "" {
		tx = tx.Where("status = ?", status)
	}
	if keyword != "" {
		like := "%" + keyword + "%"
		tx = tx.Where("name LIKE ? OR company LIKE ? OR contact LIKE ?", like, like, like)
	}
	err := tx.Count(&total).Error
	if err != nil {
		return nil, 0, err
	}
	err = tx.Order("id desc").Limit(num).Offset(startIdx).Find(&appointments).Error
	return appointments, total, err
}

func GetFdeAppointmentById(id int64) (*FdeAppointment, error) {
	if id <= 0 {
		return nil, nil
	}
	var appointment *FdeAppointment
	err := DB.First(&appointment, "id = ?", id).Error
	if err != nil {
		return nil, err
	}
	return appointment, nil
}

// UpdateFdeAppointmentAdmin updates follow-up status and admin note. Empty
// status keeps the current one so a note-only edit does not need to resend it.
func UpdateFdeAppointmentAdmin(id int64, status string, adminNote string) error {
	appointment, err := GetFdeAppointmentById(id)
	if err != nil {
		return err
	}
	if appointment == nil {
		return ErrFdeAppointmentNotFound
	}
	if status != "" {
		appointment.Status = status
	}
	if adminNote != "" {
		appointment.AdminNote = adminNote
	}
	appointment.UpdatedTime = common.GetTimestamp()
	return DB.Save(appointment).Error
}

func MarkFdeAppointmentFeishuSynced(id int64) error {
	return DB.Model(&FdeAppointment{}).Where("id = ?", id).Update("feishu_synced", true).Error
}
