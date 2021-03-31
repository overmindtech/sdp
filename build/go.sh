#!/bin/bash

set -x

# Golang build
GO_SDP_FINAL_PATH=go/sdp
GO_SDP_BUILD_PATH=$(mktemp -d)

# Compile
protoc -I . --go_out $GO_SDP_BUILD_PATH *.proto

# Clean slate
rm -f $GO_SDP_FINAL_PATH/*.pb.go
mkdir -p $GO_SDP_FINAL_PATH

# Move into place
mv -fv $GO_SDP_BUILD_PATH/github.com/dylanratcliffe/sdp/go/sdp/* $GO_SDP_FINAL_PATH
rm -rf $GO_SDP_BUILD_PATH
