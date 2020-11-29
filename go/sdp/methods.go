package sdp

import (
	"fmt"
	"strings"

	"google.golang.org/protobuf/types/known/structpb"
)

// UniqueAttributeValue return the value of whatever the Unique Attribute if
// for this item. This will then be converted to a string and returned
func (i *Item) UniqueAttributeValue() string {
	var value interface{}
	var err error

	value, err = i.GetAttributes().Get(i.UniqueAttribute)

	if err == nil {
		return fmt.Sprint(value)
	}

	return ""
}

// Reference returns an SDP reference for the item
func (i *Item) Reference() Reference {
	return Reference{
		Context:              i.Context,
		Type:                 i.Type,
		UniqueAttributeValue: i.UniqueAttributeValue(),
	}
}

// GloballyUniqueName Returns a string that defines the Item globally. This a
// combination of the following values:
//
//  * context
//  * type
//  * uniqueAttributeValue
//
// They are concatenated with dots (.)
func (i *Item) GloballyUniqueName() string {
	return strings.Join([]string{
		i.GetContext(),
		i.GetType(),
		i.UniqueAttributeValue(),
	},
		".",
	)
}

// Get Returns the value of a given attribute by name. If the attribute is
// a nested hash, nested values can be referenced using dot notation e.g.
// location.country
func (a *ItemAttributes) Get(name string) (interface{}, error) {
	var m map[string]interface{}

	m = a.GetAttrStruct().AsMap()

	if v, ok := m[name]; ok == true {
		return v, nil
	}

	return "", fmt.Errorf("Attribute %v not found", name)
}

// ToAttributes Convers a map[string]interface{} to an ItemAttributes object
func ToAttributes(m map[string]interface{}) (*ItemAttributes, error) {
	newMap := make(map[string]interface{})

	for k, v := range m {
		newMap[k] = sanitizeInterface(v)
	}

	attrStruct, err := structpb.NewStruct(m)

	return &ItemAttributes{
		AttrStruct: attrStruct,
	}, err
}

func sanitizeInterface(i interface{}) interface{} {
	// Test to see if this is going to be able to convert to struct value
	_, err := structpb.NewValue(i)

	// If there was an error this means there is some sanitising we need to do
	if err != nil {
		return fmt.Sprint(i)
	}

	return i
}
