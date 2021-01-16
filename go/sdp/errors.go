package sdp

// Ensure that the ItemRequestError is seen as a valid error in golang
func (e ItemRequestError) Error() string {
	return e.GetErrorString()
}
