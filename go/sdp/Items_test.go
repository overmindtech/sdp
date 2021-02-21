package sdp

import (
	"encoding/json"
	"testing"
)

type ToAttributesTest struct {
	Name  string
	Input map[string]interface{}
}

var ToAttributesTests = []ToAttributesTest{
	{
		Name: "Basic strings map",
		Input: map[string]interface{}{
			"firstName": "Dylan",
			"lateName":  "Ratcliffe",
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

			// Convert the input to JSON
			inputBytes, err = json.MarshalIndent(tat.Input, "", "  ")

			if err != nil {
				t.Fatal(err)
			}

			// Convert the input to Attributes
			attributes, err = ToAttributes(tat.Input)

			if err != nil {
				t.Fatal(err)
			}

			// Convert the attributes to JSON
			attributesBytes, err = json.MarshalIndent(attributes.AttrStruct.AsMap(), "", "  ")

			// Compare
			inputJSON = string(inputBytes)
			attributesJSON = string(attributesBytes)

			if inputJSON != attributesJSON {
				t.Errorf("JSON did not match\nInput: %v\nAttributes: %v", inputJSON, attributesJSON)
			}
		})

	}
}
