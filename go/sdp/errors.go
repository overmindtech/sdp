package sdp

// Ensure that the ItemRequestError is seen as a valid error in golang
func (e *ItemRequestError) Error() string {
	return e.GetErrorString()
}

// NewItemRequestError converts a regular error to an ItemRequestError of type
// OTHER. If the input error is already an ItemRequestError then it is preserved
func NewItemRequestError(err error) *ItemRequestError {
	if sdpErr, ok := err.(*ItemRequestError); ok {
		return sdpErr
	}

	return &ItemRequestError{
		ErrorType:   ItemRequestError_OTHER,
		ErrorString: err.Error(),
	}
}
