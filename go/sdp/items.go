package sdp

import (
	"crypto/sha1"
	"encoding/base32"
	"errors"
	"fmt"
	"reflect"
	"strings"

	"google.golang.org/protobuf/types/known/durationpb"
	"google.golang.org/protobuf/types/known/structpb"
	"google.golang.org/protobuf/types/known/timestamppb"
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

// Copy copies all information from one item pointer to another
func (i *Item) Copy(dest *Item) {
	// Values can be copied directly
	dest.Type = i.Type
	dest.UniqueAttribute = i.UniqueAttribute
	dest.Context = i.Context

	// We need to check that any pointers are actually populated with pointers
	// to somewhere in memory. If they are nil then there is no data structure
	// to copy the data into, therefore we need to create it first
	if dest.Metadata == nil {
		dest.Metadata = &Metadata{}
	}

	if dest.Attributes == nil {
		dest.Attributes = &ItemAttributes{}
	}

	i.Metadata.Copy(dest.Metadata)
	i.Attributes.Copy(dest.Attributes)

	dest.LinkedItemRequests = make([]*ItemRequest, 0)
	dest.LinkedItems = make([]*Reference, 0)

	for _, r := range i.LinkedItemRequests {
		newItemRequest := &ItemRequest{}

		r.Copy(newItemRequest)

		dest.LinkedItemRequests = append(dest.LinkedItemRequests, newItemRequest)
	}

	for _, r := range i.LinkedItems {
		newLinkedItem := &Reference{}

		r.Copy(newLinkedItem)

		dest.LinkedItems = append(dest.LinkedItems, newLinkedItem)
	}
}

// Hash Returns a 12 character hash for the item. This is unlikely but not
// guaranteed to be unique. The hash is calculated using the GloballyUniqueName
func (i *Item) Hash() string {
	return hashSum(([]byte(fmt.Sprint(i.GloballyUniqueName()))))
}

// Hash Returns a 12 character hash for the item. This is unlikely but not
// guaranteed to be unique. The hash is calculated using the GloballyUniqueName
func (r *Reference) Hash() string {
	return hashSum(([]byte(fmt.Sprint(r.GloballyUniqueName()))))
}

// GloballyUniqueName Returns a string that defines the Item globally. This a
// combination of the following values:
//
//  * context
//  * type
//  * uniqueAttributeValue
//
// They are concatenated with dots (.)
func (r *Reference) GloballyUniqueName() string {
	return strings.Join([]string{
		r.GetContext(),
		r.GetType(),
		r.GetUniqueAttributeValue(),
	},
		".",
	)
}

// Copy copies all information from one Reference pointer to another
func (r *Reference) Copy(dest *Reference) {
	dest.Type = r.Type
	dest.UniqueAttributeValue = r.UniqueAttributeValue
	dest.Context = r.Context
}

// Copy copies all information from one Metadata pointer to another
func (m *Metadata) Copy(dest *Metadata) {
	dest.BackendName = m.BackendName
	dest.RequestMethod = m.RequestMethod
	dest.BackendPackage = m.BackendPackage

	dest.Timestamp = &timestamppb.Timestamp{
		Seconds: m.Timestamp.GetSeconds(),
		Nanos:   m.Timestamp.GetNanos(),
	}

	dest.BackendDuration = &durationpb.Duration{
		Seconds: m.BackendDuration.GetSeconds(),
		Nanos:   m.BackendDuration.GetNanos(),
	}

	dest.BackendDurationPerItem = &durationpb.Duration{
		Seconds: m.BackendDurationPerItem.GetSeconds(),
		Nanos:   m.BackendDurationPerItem.GetNanos(),
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

// Set sets an attribute. Values are converted to structpb versions and an
// errort will be return if this fails
func (a *ItemAttributes) Set(name string, value interface{}) error {
	// Check to make sure that the pointer is not nil
	if a == nil {
		return errors.New("Set called on nil pointer")
	}

	// Ensure that this interface will be able to be converted to a struct value
	sanitizedValue := sanitizeInterface(value)
	structValue, err := structpb.NewValue(sanitizedValue)

	if err != nil {
		return err
	}

	fields := a.GetAttrStruct().GetFields()

	fields[name] = structValue

	return nil
}

// Copy copies all information from one ItemAttributes pointer to another
func (a *ItemAttributes) Copy(dest *ItemAttributes) {
	m := a.GetAttrStruct().AsMap()

	dest.AttrStruct, _ = structpb.NewStruct(m)
}

// Copy copies all information from one ItemRequest pointer to another
func (r *ItemRequest) Copy(dest *ItemRequest) {
	dest.Type = r.Type
	dest.Method = r.Method
	dest.Query = r.Query
	dest.LinkDepth = r.LinkDepth
	dest.Context = r.Context
	dest.ItemSubject = r.ItemSubject
	dest.LinkedItemSubject = r.LinkedItemSubject
	dest.ResponseSubject = r.ResponseSubject
	dest.ErrorSubject = r.ErrorSubject
}

// ToAttributes Convers a map[string]interface{} to an ItemAttributes object
func ToAttributes(m map[string]interface{}) (*ItemAttributes, error) {
	if m == nil {
		return nil, nil
	}

	var s map[string]*structpb.Value
	var err error

	// str, err = structpb.NewStruct()
	s = make(map[string]*structpb.Value)

	// Loop of the map
	for k, v := range m {
		if v == nil {
			// If the value is nil then ignore
			continue
		}

		sanitizedValue := sanitizeInterface(v)
		structValue, err := structpb.NewValue(sanitizedValue)

		if err != nil {
			return nil, err
		}

		s[k] = structValue
	}

	return &ItemAttributes{
		AttrStruct: &structpb.Struct{
			Fields: s,
		},
	}, err
}

// sanitizeInterface Ensures that en interface is ina format that can be
// converted to a protobuf value. The structpb.ToValue() function expects things
// to be in one of the following formats:
//
//  ╔════════════════════════╤════════════════════════════════════════════╗
//  ║ Go type                │ Conversion                                 ║
//  ╠════════════════════════╪════════════════════════════════════════════╣
//  ║ nil                    │ stored as NullValue                        ║
//  ║ bool                   │ stored as BoolValue                        ║
//  ║ int, int32, int64      │ stored as NumberValue                      ║
//  ║ uint, uint32, uint64   │ stored as NumberValue                      ║
//  ║ float32, float64       │ stored as NumberValue                      ║
//  ║ string                 │ stored as StringValue; must be valid UTF-8 ║
//  ║ []byte                 │ stored as StringValue; base64-encoded      ║
//  ║ map[string]interface{} │ stored as StructValue                      ║
//  ║ []interface{}          │ stored as ListValue                        ║
//  ╚════════════════════════╧════════════════════════════════════════════╝
//
// However this means that a data type like []string won't work, despite the
// function being perfectly able to represent it in a protobuf struct. This
// function does its best to example the available data type to ensure that as
// long as the data can in theory be represented by a protobuf struct, the
// conversion will work.
func sanitizeInterface(i interface{}) interface{} {
	v := reflect.Indirect(reflect.ValueOf(i))

	if i == nil {
		return nil
	}

	switch v.Kind() {
	case reflect.Bool:
		return v.Bool()
	case reflect.Int:
		return v.Int()
	case reflect.Int8:
		return v.Int()
	case reflect.Int16:
		return v.Int()
	case reflect.Int32:
		return v.Int()
	case reflect.Int64:
		return v.Int()
	case reflect.Uint:
		return v.Uint()
	case reflect.Uint8:
		return v.Uint()
	case reflect.Uint16:
		return v.Uint()
	case reflect.Uint32:
		return v.Uint()
	case reflect.Uint64:
		return v.Uint()
	case reflect.Float32:
		return v.Float()
	case reflect.Float64:
		return v.Float()
	case reflect.String:
		return fmt.Sprint(v)
	case reflect.Array:
		// We need to check the type if each element in the array and do
		// conversion on that

		// returnSlice Returns the array in the format that protobuf can deal with
		var returnSlice []interface{}

		returnSlice = make([]interface{}, v.Len())

		for index := 0; index < v.Len(); index++ {
			returnSlice[index] = sanitizeInterface(v.Index(index).Interface())
		}

		return returnSlice
	case reflect.Slice:
		var returnSlice []interface{}

		returnSlice = make([]interface{}, v.Len())

		for index := 0; index < v.Len(); index++ {
			returnSlice[index] = sanitizeInterface(v.Index(index).Interface())
		}

		return returnSlice
	case reflect.Map:
		var returnMap map[string]interface{}

		returnMap = make(map[string]interface{})

		for _, mapKey := range v.MapKeys() {
			// Convert the key to a string
			stringKey := fmt.Sprint(mapKey.Interface())

			// Convert the value to a compatible interface
			value := sanitizeInterface(v.MapIndex(mapKey).Interface())

			returnMap[stringKey] = value
		}

		return returnMap
	case reflect.Struct:
		// In the case of a struct we basically want to turn it into a
		// map[string]interface{}
		var returnMap map[string]interface{}

		returnMap = make(map[string]interface{})

		t := v.Type()

		// Range over fields
		n := t.NumField()
		for i := 0; i < n; i++ {
			field := t.Field(i)

			// Get the zero value for this field
			zero := reflect.Zero(reflect.TypeOf(field)).Interface()

			// Check if the field is it's nil value
			// Check if there actually was a field with that name
			if reflect.DeepEqual(field, zero) == false {
				returnMap[field.Name] = v.Field(i).Interface()
			}
		}

		return sanitizeInterface(returnMap)
	default:
		// If we don't recognize the type then we need to see what the
		// underlying type is and see if we can convert that
		return i
	}
}

func hashSum(b []byte) string {
	var shaSum [20]byte
	var paddedEncoding *base32.Encoding
	var unpaddedEncoding *base32.Encoding

	shaSum = sha1.Sum(b)

	// We need to specify a custom encoding here since dGraph has fairly struct
	// requirements aboout what name a variable
	paddedEncoding = base32.NewEncoding("abcdefghijklmnopqrstuvwxyzABCDEF")

	// We also can't have padding since "=" is not allowed in variable names
	unpaddedEncoding = paddedEncoding.WithPadding(base32.NoPadding)

	return unpaddedEncoding.EncodeToString(shaSum[:11])
}
