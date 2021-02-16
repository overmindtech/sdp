package sdp

import (
	"fmt"
	reflect "reflect"

	"google.golang.org/protobuf/types/known/structpb"
)

// ToValue converts the following data types to protobuf struct values:
//
// * Bool
// * Int
// * Int8
// * Int16
// * Int32
// * Int64
// * Uint
// * Uint8
// * Uint16
// * Uint32
// * Uint64
// * Float32
// * Float64
// * Array
// * Map
// * Slice
// * String
//
func ToValue(i interface{}) (*structpb.Value, error) {
	v := reflect.ValueOf(i)

	if i == nil {
		return structpb.NewNullValue(), nil
	}

	switch v.Kind() {
	case reflect.Bool:
		return structpb.NewBoolValue(v.Bool()), nil
	case reflect.Int:
		return structpb.NewNumberValue(float64(v.Int())), nil
	case reflect.Int8:
		return structpb.NewNumberValue(float64(v.Int())), nil
	case reflect.Int16:
		return structpb.NewNumberValue(float64(v.Int())), nil
	case reflect.Int32:
		return structpb.NewNumberValue(float64(v.Int())), nil
	case reflect.Int64:
		return structpb.NewNumberValue(float64(v.Int())), nil
	case reflect.Uint:
		return structpb.NewNumberValue(float64(v.Uint())), nil
	case reflect.Uint8:
		return structpb.NewNumberValue(float64(v.Uint())), nil
	case reflect.Uint16:
		return structpb.NewNumberValue(float64(v.Uint())), nil
	case reflect.Uint32:
		return structpb.NewNumberValue(float64(v.Uint())), nil
	case reflect.Uint64:
		return structpb.NewNumberValue(float64(v.Uint())), nil
	case reflect.Float32:
		return structpb.NewNumberValue(float64(v.Float())), nil
	case reflect.Float64:
		return structpb.NewNumberValue(float64(v.Float())), nil
	case reflect.String:
		return structpb.NewStringValue(v.String()), nil
	case reflect.Array:
		var list *structpb.ListValue
		var value *structpb.Value
		var err error
		var interfaceSlice []interface{}

		// Convert to a slice of interfaces
		for idx := 0; idx < v.Len(); idx++ {
			interfaceSlice = append(interfaceSlice, v.Index(idx).Interface())
		}

		list, err = structpb.NewList(interfaceSlice)

		if err != nil {
			return value, err
		}

		return structpb.NewListValue(list), nil
	case reflect.Slice:
		var list *structpb.ListValue
		var value *structpb.Value
		var err error
		var interfaceSlice []interface{}

		// Convert to a slice of interfaces
		for idx := 0; idx < v.Len(); idx++ {
			interfaceSlice = append(interfaceSlice, v.Index(idx).Interface())
		}

		list, err = structpb.NewList(interfaceSlice)

		if err != nil {
			return value, err
		}

		return structpb.NewListValue(list), nil
	case reflect.Map:
		var str *structpb.Struct
		var s map[string]interface{}
		var value *structpb.Value
		var err error

		// str, err = structpb.NewStruct()
		s = make(map[string]interface{})

		// Loop of the map
		iter := v.MapRange()
		for iter.Next() {
			k := iter.Key()
			v := iter.Value()

			keyString := k.String()
			value, err := ToValue(v.Interface())

			if err != nil {
				return &structpb.Value{}, err
			}

			s[keyString] = value
		}

		str, err = structpb.NewStruct(s)

		if err != nil {
			return value, err
		}

		return structpb.NewStructValue(str), nil
	default:
		return &structpb.Value{}, fmt.Errorf("Could not convert %v to protocol buffer value", v.Kind())
	}
}
