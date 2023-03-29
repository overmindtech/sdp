package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"net"
	"net/http"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	pb "github.com/overmindtech/sdp/gen/sdp-go"
	"golang.org/x/net/websocket"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/emptypb"
)

var (
	port = flag.Int("port", 50051, "The server port")
)

type server struct {
	pb.UnimplementedBookmarksServer
}

func (s *server) List(context.Context, *emptypb.Empty) (*pb.BookmarkListResult, error) {
	return nil, status.Error(codes.Unimplemented, "todo")
}

func main() {
	flag.Parse()

	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", *port))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	ctx := context.TODO()
	mux := runtime.NewServeMux()

	err = pb.RegisterBookmarksHandlerServer(ctx, mux, &server{})
	if err != nil {
		log.Fatalf("failed to RegisterBookmarksHandlerServer: %v", err)
	}

	var gatewayWSServer websocket.Server // Handles websocket requests
	err = mux.HandlePath("GET", "/gateway", func(w http.ResponseWriter, r *http.Request, pathParams map[string]string) {
		// 🤞
		gatewayWSServer.ServeHTTP(w, r)
	})
	if err != nil {
		log.Fatalf("failed to HandlePath: %v", err)
	}

	log.Printf("server listening at %v", lis.Addr())
	if err := http.Serve(lis, mux); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
