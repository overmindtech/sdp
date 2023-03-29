package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"net"
	"net/http"

	connect_go "github.com/bufbuild/connect-go"
	pb "github.com/overmindtech/sdp/gen/sdp-go"
	"github.com/overmindtech/sdp/gen/sdp-go/sdp_goconnect"
	"golang.org/x/net/websocket"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/emptypb"
)

var (
	port = flag.Int("port", 50051, "The server port")
)

type server struct {
}

func (s *server) List(ctx context.Context, req *connect_go.Request[emptypb.Empty]) (*connect_go.Response[pb.BookmarkListResult], error) {
	return nil, status.Error(codes.Unimplemented, "todo")
}

func main() {
	flag.Parse()

	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", *port))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	mux := http.NewServeMux()

	var gatewayWSServer websocket.Server // Handles websocket requests
	mux.Handle("/gateway", gatewayWSServer)

	api := http.NewServeMux()
	api.Handle(sdp_goconnect.NewBookmarksHandler(&server{}))
	// If you configure a prefix, be sure to include it in the base URL you pass to your Connect clients (for example, https://acme.com/api/). Unfortunately, grpc-go clients don't support prefixes: if you need to support gRPC clients, don't prefix your routes!
	mux.Handle("/grpc/", http.StripPrefix("/grpc", api))

	log.Printf("server listening at %v", lis.Addr())
	if err := http.Serve(lis, mux); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
