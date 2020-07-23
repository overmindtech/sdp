# State Description Protocol

State Description Protocol is designed to allow for the serialization of the description of the current state of a computer system for the purposes of auditing, monitoring etc. It is deliberately simplistic and is designed to transmit the details of things that we don't know the importance of. For this reason it doesn't contain dedicated ways of describing files, packages etc. since it doesn't presume to know what it is describing, other than the fact that it is "state".

This has been somewhat inspired by [Z Notation](https://en.wikipedia.org/wiki/Z_notation)

## Libraries

### Golang

Currently the golang libraries for this live in this repo since I can't be bother splitting them out right now:

```
go get -v github.com/dylanratcliffe/sdp/go/sdp
```
