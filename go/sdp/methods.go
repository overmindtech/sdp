package sdp

import (
	"fmt"

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
func ToAttributes(m map[string]interface{}) *ItemAttributes {
	attrStruct, _ := structpb.NewStruct(m)

	return &ItemAttributes{
		AttrStruct: attrStruct,
	}
}
