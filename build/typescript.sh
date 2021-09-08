#!/bin/bash

set -x
set -e

# Requires:
#
# * NodeJS

# Install the plugins
npm install

# Path to the plugin
PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"

# Golang build
SDP_FINAL_PATH=../sdp-js
SDP_BUILD_PATH=$(mktemp -d)

# Compile
protoc \
    -I ../ \
    --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
    --js_out="import_style=commonjs,binary:${SDP_BUILD_PATH}" \
    --ts_out="${SDP_BUILD_PATH}" \
    --proto_path . \
    *.proto

# Clean slate
rm -f $SDP_FINAL_PATH/*_pb.d.ts
rm -f $SDP_FINAL_PATH/*_pb.js
rm -rf $SDP_FINAL_PATH/google

# Move into place
mv -fv $SDP_BUILD_PATH/* $SDP_FINAL_PATH
rm -rf $SDP_BUILD_PATH

# Compile extra typescript
cd $SDP_FINAL_PATH
tsc
cd -

set +x

echo ""
echo "Compile complete. Run the following to publish:"
echo "cd ../sdp-js && npm publish && cd -"