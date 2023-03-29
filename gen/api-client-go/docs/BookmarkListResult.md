# BookmarkListResult

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Success** | Pointer to **bool** |  | [optional] 
**ErrorMessage** | Pointer to **string** |  | [optional] 
**Bookmarks** | Pointer to [**[]BookmarkDescriptor**](BookmarkDescriptor.md) |  | [optional] 

## Methods

### NewBookmarkListResult

`func NewBookmarkListResult() *BookmarkListResult`

NewBookmarkListResult instantiates a new BookmarkListResult object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewBookmarkListResultWithDefaults

`func NewBookmarkListResultWithDefaults() *BookmarkListResult`

NewBookmarkListResultWithDefaults instantiates a new BookmarkListResult object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetSuccess

`func (o *BookmarkListResult) GetSuccess() bool`

GetSuccess returns the Success field if non-nil, zero value otherwise.

### GetSuccessOk

`func (o *BookmarkListResult) GetSuccessOk() (*bool, bool)`

GetSuccessOk returns a tuple with the Success field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSuccess

`func (o *BookmarkListResult) SetSuccess(v bool)`

SetSuccess sets Success field to given value.

### HasSuccess

`func (o *BookmarkListResult) HasSuccess() bool`

HasSuccess returns a boolean if a field has been set.

### GetErrorMessage

`func (o *BookmarkListResult) GetErrorMessage() string`

GetErrorMessage returns the ErrorMessage field if non-nil, zero value otherwise.

### GetErrorMessageOk

`func (o *BookmarkListResult) GetErrorMessageOk() (*string, bool)`

GetErrorMessageOk returns a tuple with the ErrorMessage field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetErrorMessage

`func (o *BookmarkListResult) SetErrorMessage(v string)`

SetErrorMessage sets ErrorMessage field to given value.

### HasErrorMessage

`func (o *BookmarkListResult) HasErrorMessage() bool`

HasErrorMessage returns a boolean if a field has been set.

### GetBookmarks

`func (o *BookmarkListResult) GetBookmarks() []BookmarkDescriptor`

GetBookmarks returns the Bookmarks field if non-nil, zero value otherwise.

### GetBookmarksOk

`func (o *BookmarkListResult) GetBookmarksOk() (*[]BookmarkDescriptor, bool)`

GetBookmarksOk returns a tuple with the Bookmarks field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetBookmarks

`func (o *BookmarkListResult) SetBookmarks(v []BookmarkDescriptor)`

SetBookmarks sets Bookmarks field to given value.

### HasBookmarks

`func (o *BookmarkListResult) HasBookmarks() bool`

HasBookmarks returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


