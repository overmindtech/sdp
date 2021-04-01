# State Description Protocol

State Description Protocol is designed to allow for the serialization of the description of the current state of a computer system for the purposes of auditing, monitoring etc. It is deliberately simplistic and is designed to transmit the details of things that we don't know the importance of. For this reason it doesn't contain dedicated ways of describing files, packages etc. since it doesn't presume to know what it is describing, other than the fact that it is "state".

This has been somewhat inspired by [Z Notation](https://en.wikipedia.org/wiki/Z_notation)

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

## Item Uniqueness

An item is considered unique with a unique combination of:

* Type
* UniqueAttributeValue
* Context

While the UniqueAttributeValue will always be unique for a given type, this same item may exist in many contexts. AN example could be the same package installed on many servers, or the same deployment in many Kubernetes namespaces. Hence context is required to ensure uniqueness globally.

## Message Queue Topics/Subjects

When implementing SDP over a message queue, you should follow the below naming convention for topics/subjects.

### `items.{context}`

All producers of SDP items should post their items to this topic, regardless of `itemSubject`, `linkedItemSubject`, `responseSubject` or `errorSubject`. Items will be published into this topic with `{context}` replaced by whatever the current context is. Users can subscribe to a particular context, or all contexts using a wildcard.

### `requests.all`

Everything will listen on this subject for requests. Any requests that are placed onto this subject will be responded to by everything that is currently active.

### `requests.contexts.{context}`

We will listen on the this subject for requests that are specific to our given context and respond to them

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
go get -v github.com/dylanratcliffe/sdp/go/sdp
```
