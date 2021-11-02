# State Description Protocol

State Description Protocol is designed to allow for the serialization of the description of the current state of a computer system for the purposes of auditing, monitoring etc. It is deliberately simplistic and is designed to transmit the details of things that we don't know the importance of. For this reason it doesn't contain dedicated ways of describing files, packages etc. since it doesn't presume to know what it is describing, other than the fact that it is "state".

This has been somewhat inspired by [Z Notation](https://en.wikipedia.org/wiki/Z_notation)

## Additional Dynamic Data

Other than the methods that are are generated from the protocol buffers, we provide the following methods for convenience on all platforms. Certain libraries may provide more functionality above the methods listed below but these methods at least will be present and return consistent results across all libraries. Not however that the naming of the methods might change to reflect best-practices in a given library.

### `item.UniqueAttributeValue`

Returns the value of whatever the Unique Attribute is for this item

### `item.Reference`

Returns an SDP reference for the item

### `item.GloballyUniqueName`

GloballyUniqueName Returns a string that defines the Item globally. This a
combination of the following values:

 * context
 * type
 * uniqueAttributeValue

They are concatenated with dots (.)

### `reference.GloballyUniqueName`

Same as for Item

### `item.Hash`

Returns a 12 character hash for the item. This is likely but not guaranteed to be unique. The hash is calculated as follows:

* Take the SHA-1 sum of the GloballyUniqueName
* Encode the SHA-1 binary value using base-32 with a custom encoding
  * The custom encoding is designed to ensure that all hashes are also valid variable names in DGraph and other databases. To this end the following encoding string is used: `abcdefghijklmnopqrstuvwxyzABCDEF`
  * The encoding is also non-padded, though this likely wont matter since we strip the end off anyway
* Return the first 12 characters of the resulting string

### `reference.Hash`

Same as item.Hash

## Querying State

SDP is designed to be usable over a message queue infrastructure where a single request may be responded to by many, many respondents. In order to have this process work efficiently and provide a reasonable amount of feedback to the user about how the query is going and how much longer it might be expected to take, interim responses are used.

An interim response is designed to give the requester the following information:

* How many responders are currently working on the request
* If responders have stopped responding or whether they are just taking a long time to execute the query
* When things have finished

The communication looks as follows:

```sequence {theme="hand"}
requester->>responder: Initial Request
Note right of responder: The initial request will include\nthe following subjects for the\nresponders to send responses on:\n* Items\n* InterimResponses\n* Errors
responder->>requester: Interim Response: WORKING
Note right of responder: While the responder works\nit will keep sending interim\nresponses so that the requester\nknows it's still working
responder->>requester: Interim Response: WORKING
responder->>requester: Item
responder->>requester: Item
responder->>requester: Item
responder->>requester: Final Response: DONE
```

The subjects upon which the responses and items should be sent are determined by the requester and sent within the request itself. The naming conventions for this are found below.

## Item Uniqueness

An item is considered unique with a unique combination of:

* Type
* UniqueAttributeValue
* Context

While the UniqueAttributeValue will always be unique for a given type, this same item may exist in many contexts. AN example could be the same package installed on many servers, or the same deployment in many Kubernetes namespaces. Hence context is required to ensure uniqueness globally.

## Message Queue Topics/Subjects

When implementing SDP over a message queue, you should follow the below naming convention for topics/subjects.

### `request.all`

Everything will listen on this subject for requests. Any requests that are placed onto this subject will be responded to by everything that is currently active.

### `request.context.{context}`

We will listen on the this subject for requests that are specific to our given context and respond to them

### `return.response.{inbox}`

Responses to a request should be sent on this topic, with `{inbox}` being replaced with a randomly generated string. This is specified in the `ItemRequest` itself

### `return.item.{inbox}`

Items should be sent to this topic as part of a request, with `{inbox}` being replaced with a randomly generated string. This is specified in the `ItemRequest` itself

## Errors

Item requests that are not successful will return an `ItemRequestError`. The structure of these errors is:

* `errorType`: The error type (enum)
  * `NOTFOUND`: NOTFOUND means that the item was not found. This is only returned as the result of a GET request since all other requests would return an empty list instead
  * `NOCONTEXT`: NOCONTEXT means that the item was not found because we don't have access to the requested context. This should not be interpreted as "The item doesn't exist" (as with a NOTFOUND error) but rather as "We can't tell you whether or not the item exists"
  * `OTHER`: This should be used of all other failure modes, such as timeouts, unexpected failures when querying state, permissions errors etc. Errors that return this type should not be cached as the error may be transient.
* `errorString`: The string contents of the error
* `context`: The context from which the error was raised

### Deprecated Subjects

#### `items.all`

This has been removed in favour of the wildcard subscription to `return.item.>`

#### `items.{context}`

This has been removed in favour of the wildcard subscription to `return.item.>`. Not that this doesn't allow for subscribing to items from only one context since the inboxes are random, but I can't currently see a use for that anyway.

## Building

Each target language has it's own build script in the `build` directory. For example:


```shell
./build/go.sh
./build/typescript.sh
```

## Libraries

### Golang

Currently the golang libraries for this live in this repo since I can't be bother splitting them out right now:

```
go get -v github.com/overmindtech/sdp/go/sdp
```
