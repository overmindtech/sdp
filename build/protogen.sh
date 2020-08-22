#!/bin/bash

# Absolute path to this script, e.g. /home/user/bin/foo.sh
SCRIPT=$(readlink "$0")
# Absolute path this script is in, thus /home/user/bin
SCRIPTPATH=$(dirname "$SCRIPT")
# Repo dir
REPOPATH=$(dirname "$SCRIPTPATH")

# Golang build
GO_SDP_BUILD_PATH=${REPOPATH}/go/sdp

# Clean slate
rm -rf GO_SDP_BUILD_PATH
mkdir -p $GO_SDP_BUILD_PATH

protoc -I $REPOPATH --go_out $GO_SDP_BUILD_PATH *.proto 