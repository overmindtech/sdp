#!/bin/bash

set -x

# Requires:
#
# * NodeJS
cd typescript

# Install the plugins
npm install

# Path to the plugin
PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"

# Golang build
SDP_FINAL_PATH=.
SDP_BUILD_PATH=$(mktemp -d)

# Compile
protoc \
    -I ../ \
    --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
    --js_out="import_style=commonjs,binary:${SDP_BUILD_PATH}" \
    --ts_out="${SDP_BUILD_PATH}" \
    ../*.proto

# Clean slate
rm -f $SDP_FINAL_PATH/*.ts
rm -f $SDP_FINAL_PATH/*.js
mkdir -p $SDP_FINAL_PATH

# Move into place
mv -fv $SDP_BUILD_PATH/* $SDP_FINAL_PATH
rm -rf $SDP_BUILD_PATH

# Generate the indexex
./node_modules/.bin/create-index ./
./node_modules/.bin/ctix --verbose --project ./tsconfig.json 

cd -