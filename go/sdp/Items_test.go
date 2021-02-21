package sdp

import (
	"encoding/json"
	"reflect"
	"testing"
)

type ToAttributesTest struct {
	Name  string
	Input map[string]interface{}
}

type CustomString string

var Dylan CustomString = "Dylan"

type CustomBool bool

var Bool1 CustomBool = false

type CustomStruct struct {
	Foo           string
	Bar           string
	Baz           string
	internalThing string
}

var Struct CustomStruct = CustomStruct{
	Foo: "foo",
	Bar: "bar",
	Baz: "baz",
}

var ToAttributesTests = []ToAttributesTest{
	{
		Name: "Basic strings map",
		Input: map[string]interface{}{
			"firstName": "Dylan",
			"lastName":  "Ratcliffe",
		},
	},
	{
		Name: "Arrays map",
		Input: map[string]interface{}{
			"empty": []string{},
			"single-level": []string{
				"one",
				"two",
			},
			"multi-level": [][]string{
				{
					"one-one",
					"one-two",
				},
				{
					"two-one",
					"two-two",
				},
			},
		},
	},
	{
		Name: "Nested strings maps",
		Input: map[string]interface{}{
			"strings map": map[string]string{
				"foo": "bar",
			},
		},
	},
	{
		Name: "Nested integer map",
		Input: map[string]interface{}{
			"numbers map": map[string]int{
				"one": 1,
				"two": 2,
			},
		},
	},
	{
		Name: "Nested string-array map",
		Input: map[string]interface{}{
			"arrays map": map[string][]string{
				"dogs": {
					"pug",
					"also pug",
				},
			},
		},
	},
	{
		Name: "Nested non-string keys map",
		Input: map[string]interface{}{
			"non-string keys": map[int]string{
				1: "one",
				2: "two",
				3: "three",
			},
		},
	},
	{
		Name: "Composite types",
		Input: map[string]interface{}{
			"underlying string": Dylan,
			"underlying bool":   Bool1,
		},
	},
	{
		Name: "Pointers",
		Input: map[string]interface{}{
			"pointer": &Bool1,
		},
	},
	{
		Name: "structs",
		Input: map[string]interface{}{
			"named struct": Struct,
			"anon struct": struct {
				Yes bool
			}{
				Yes: true,
			},
		},
	},
}

func TestToAttributes(t *testing.T) {
	for _, tat := range ToAttributesTests {
		t.Run(tat.Name, func(t *testing.T) {
			var inputBytes []byte
			var attributesBytes []byte
			var inputJSON string
			var attributesJSON string
			var attributes *ItemAttributes
			var err error

			// Convert the input to Attributes
			attributes, err = ToAttributes(tat.Input)

			if err != nil {
				t.Fatal(err)
			}

			// In order to compate these reliably I'm going to do the following:
			//
			// 1. Convert to JSON
			// 2. Convert back again
			// 3. Compare with reflect.DeepEqual()

			// Convert the input to JSON
			inputBytes, err = json.MarshalIndent(tat.Input, "", "  ")

			if err != nil {
				t.Fatal(err)
			}

			// Convert the attributes to JSON
			attributesBytes, err = json.MarshalIndent(attributes.AttrStruct.AsMap(), "", "  ")

			if err != nil {
				t.Fatal(err)
			}

			var input map[string]interface{}
			var output map[string]interface{}

			err = json.Unmarshal(inputBytes, &input)

			if err != nil {
				t.Fatal(err)
			}

			err = json.Unmarshal(attributesBytes, &output)

			if err != nil {
				t.Fatal(err)
			}

			if !reflect.DeepEqual(input, output) {
				// Convert to strings for printing
				inputJSON = string(inputBytes)
				attributesJSON = string(attributesBytes)

				t.Errorf("JSON did not match (note that order of map keys doesn't matter)\nInput: %v\nAttributes: %v", inputJSON, attributesJSON)
			}
		})

	}
}
