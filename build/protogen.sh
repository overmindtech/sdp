#!/bin/bash

set -x

# Absolute path to this script, e.g. /home/user/bin/foo.sh
SCRIPT=$(readlink "$0")
# Absolute path this script is in, thus /home/user/bin
SCRIPTPATH=$(dirname "$SCRIPT")
# Repo dir
REPOPATH=$(dirname "$SCRIPTPATH")

# Golang build
GO_SDP_FINAL_PATH=${REPOPATH}/go
GO_SDP_BUILD_PATH=$(mktemp -d)

# Compile
protoc -I $REPOPATH --go_out $GO_SDP_BUILD_PATH *.proto

# Clean slate
rm -rf $GO_SDP_FINAL_PATH
mkdir -p $GO_SDP_FINAL_PATH

# Move into place
mv "$GO_SDP_BUILD_PATH/github.com/dylanratcliffe/sdp/go/sdp" "$GO_SDP_FINAL_PATH/"
rm -rf $GO_SDP_BUILD_PATH
