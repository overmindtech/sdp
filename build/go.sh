#!/bin/bash

# Exit on failures
set -e

# Build settings
GO_SDP_FINAL_PATH=../sdp-go
GO_SDP_BUILD_PATH=$(mktemp -d)

# Check build path exists
[ ! -d $GO_SDP_FINAL_PATH ] && echo "❌ Final build path ${GO_SDP_FINAL_PATH} does not exist" && exit 1

echo "🛠 SDP Golang compilation settings:"
echo "Final path: ${GO_SDP_FINAL_PATH}"
echo "Build path: ${GO_SDP_BUILD_PATH}"


echo "⚙️ Compiling .proto files"
# Compile
protoc -I . --go_out $GO_SDP_BUILD_PATH *.proto

echo "🚛 Moving into final path"
# Clean slate
rm -f $GO_SDP_FINAL_PATH/*.pb.go
mkdir -p $GO_SDP_FINAL_PATH

# Move into place
mv -fv $GO_SDP_BUILD_PATH/github.com/dylanratcliffe/sdp/go/sdp/* $GO_SDP_FINAL_PATH
rm -rf $GO_SDP_BUILD_PATH

echo "✅ Complete"