package service

import (
	"errors"
	"regexp"
	"strings"
	"unicode/utf8"

	"github.com/QuantumNous/new-api/dto"
	"github.com/QuantumNous/new-api/model"
)

var ErrInvalidFdeAppointment = errors.New("invalid FDE appointment request")

var (
	fdeEmailPattern = regexp.MustCompile(`^[^\s@]+@[^\s@]+\.[^\s@]+$`)
	fdePhonePattern = regexp.MustCompile(`^1[3-9]\d{9}$`)
)

var fdeCooperationRequests = map[string]struct{}{
	"Call audit & cost governance":     {},
	"Enterprise Brain setup":           {},
	"Joint FDE landing":                {},
	"Data warehouse & decision engine": {},
	"Other":                            {},
}

func CreateFdeAppointment(request dto.FdeAppointmentRequest) (int64, error) {
	request.Name = strings.TrimSpace(request.Name)
	request.Company = strings.TrimSpace(request.Company)
	request.Title = strings.TrimSpace(request.Title)
	request.Contact = strings.TrimSpace(request.Contact)
	request.Scenario = strings.TrimSpace(request.Scenario)
	request.CooperationRequest = strings.TrimSpace(request.CooperationRequest)

	nameLength := utf8.RuneCountInString(request.Name)
	companyLength := utf8.RuneCountInString(request.Company)
	titleLength := utf8.RuneCountInString(request.Title)
	contactLength := utf8.RuneCountInString(request.Contact)
	scenarioLength := utf8.RuneCountInString(request.Scenario)
	if nameLength < 1 || nameLength > 50 ||
		companyLength < 1 || companyLength > 100 ||
		titleLength < 1 || titleLength > 50 ||
		contactLength < 1 || contactLength > 200 ||
		scenarioLength < 10 || scenarioLength > 1000 {
		return 0, ErrInvalidFdeAppointment
	}
	if !fdeEmailPattern.MatchString(request.Contact) && !fdePhonePattern.MatchString(request.Contact) {
		return 0, ErrInvalidFdeAppointment
	}
	if _, ok := fdeCooperationRequests[request.CooperationRequest]; !ok {
		return 0, ErrInvalidFdeAppointment
	}

	appointment := model.FdeAppointment{
		Name:               request.Name,
		Company:            request.Company,
		Title:              request.Title,
		Contact:            request.Contact,
		Scenario:           request.Scenario,
		CooperationRequest: request.CooperationRequest,
	}
	if err := appointment.Insert(); err != nil {
		return 0, err
	}
	return appointment.Id, nil
}
