# BookmarkDescriptor

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**UUID** | Pointer to **string** |  | [optional] 
**Created** | Pointer to **time.Time** |  | [optional] 
**Name** | Pointer to **string** |  | [optional] 
**Description** | Pointer to **string** |  | [optional] 
**Size** | Pointer to **int64** |  | [optional] 

## Methods

### NewBookmarkDescriptor

`func NewBookmarkDescriptor() *BookmarkDescriptor`

NewBookmarkDescriptor instantiates a new BookmarkDescriptor object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewBookmarkDescriptorWithDefaults

`func NewBookmarkDescriptorWithDefaults() *BookmarkDescriptor`

NewBookmarkDescriptorWithDefaults instantiates a new BookmarkDescriptor object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetUUID

`func (o *BookmarkDescriptor) GetUUID() string`

GetUUID returns the UUID field if non-nil, zero value otherwise.

### GetUUIDOk

`func (o *BookmarkDescriptor) GetUUIDOk() (*string, bool)`

GetUUIDOk returns a tuple with the UUID field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUUID

`func (o *BookmarkDescriptor) SetUUID(v string)`

SetUUID sets UUID field to given value.

### HasUUID

`func (o *BookmarkDescriptor) HasUUID() bool`

HasUUID returns a boolean if a field has been set.

### GetCreated

`func (o *BookmarkDescriptor) GetCreated() time.Time`

GetCreated returns the Created field if non-nil, zero value otherwise.

### GetCreatedOk

`func (o *BookmarkDescriptor) GetCreatedOk() (*time.Time, bool)`

GetCreatedOk returns a tuple with the Created field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreated

`func (o *BookmarkDescriptor) SetCreated(v time.Time)`

SetCreated sets Created field to given value.

### HasCreated

`func (o *BookmarkDescriptor) HasCreated() bool`

HasCreated returns a boolean if a field has been set.

### GetName

`func (o *BookmarkDescriptor) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *BookmarkDescriptor) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *BookmarkDescriptor) SetName(v string)`

SetName sets Name field to given value.

### HasName

`func (o *BookmarkDescriptor) HasName() bool`

HasName returns a boolean if a field has been set.

### GetDescription

`func (o *BookmarkDescriptor) GetDescription() string`

GetDescription returns the Description field if non-nil, zero value otherwise.

### GetDescriptionOk

`func (o *BookmarkDescriptor) GetDescriptionOk() (*string, bool)`

GetDescriptionOk returns a tuple with the Description field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDescription

`func (o *BookmarkDescriptor) SetDescription(v string)`

SetDescription sets Description field to given value.

### HasDescription

`func (o *BookmarkDescriptor) HasDescription() bool`

HasDescription returns a boolean if a field has been set.

### GetSize

`func (o *BookmarkDescriptor) GetSize() int64`

GetSize returns the Size field if non-nil, zero value otherwise.

### GetSizeOk

`func (o *BookmarkDescriptor) GetSizeOk() (*int64, bool)`

GetSizeOk returns a tuple with the Size field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSize

`func (o *BookmarkDescriptor) SetSize(v int64)`

SetSize sets Size field to given value.

### HasSize

`func (o *BookmarkDescriptor) HasSize() bool`

HasSize returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


