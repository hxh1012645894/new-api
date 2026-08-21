package dto

type FdeAppointmentRequest struct {
	Name               string `json:"name"`
	Company            string `json:"company"`
	Title              string `json:"title"`
	Contact            string `json:"contact"`
	Scenario           string `json:"scenario"`
	CooperationRequest string `json:"request"`
}

type FdeAppointmentCreated struct {
	Id int64 `json:"id"`
}
