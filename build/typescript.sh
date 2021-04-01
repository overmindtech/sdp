#!/bin/bash

set -x

# Requires:
#
# * NodeJS
cd typescript

# Install the plugins
npm install

# Download the latest grpc protoc compiler plugin
curl -s https://api.github.com/repos/grpc/grpc-web/releases/latest \
| grep -E "darwin-x86_64\"" \
| cut -d : -f 2,3 \
| tr -d \" \
| wget -O node_modules/.bin/protoc-gen-grpc-web -i -

chmod +x node_modules/.bin/protoc-gen-grpc-web

# Path to the plugin
PLUGIN_PATH="./node_modules/.bin/protoc-gen-grpc-web"

# Golang build
SDP_FINAL_PATH=.
SDP_BUILD_PATH=$(mktemp -d)

# Compile
protoc \
    -I ../ \
    --plugin="protoc-gen-grpc-web=${PLUGIN_PATH}" \
    --js_out="import_style=commonjs,binary:${SDP_BUILD_PATH}" \
    --grpc-web_out="import_style=typescript,mode=grpcweb:${SDP_BUILD_PATH}" \
    ../*.proto
    # --ts_out="${SDP_BUILD_PATH}" \

# Clean slate
rm -f $SDP_FINAL_PATH/*.ts
rm -f $SDP_FINAL_PATH/*.js
mkdir -p $SDP_FINAL_PATH

# Move into place
mv -fv $SDP_BUILD_PATH/* $SDP_FINAL_PATH
rm -rf $SDP_BUILD_PATH

# Generate the index
./node_modules/.bin/create-index ./
./node_modules/.bin/ctix --verbose --project ./tsconfig.json 

cd -

set +x

echo ""
echo "Compile complete. Run the following to publish:"
echo "cd typescript && npm publish && cd -"