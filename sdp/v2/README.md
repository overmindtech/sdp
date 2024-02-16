* have frontend/gateway and gatewa/source communications based on the same messages
* be able to trace/connect all messages tthroughout the entire system to its originator
* consistent correlation of responses to requests
* switch to human-readable UUIDs (as strings) to help inspecting/debugging message flows
* follow `buf lint` naming conventions
* parallel implementation in sdp.v2 for seamless upgrades
* Minimize object size by using symbolic references where possible
* Elevate Edges to top-level objects in the protocol, to replace LinkedItemQueries and clean up post-processing
* Separate discovered (immutable) and status/internal (mutable) data to make caches more efficient (only cache immutable data)

* always call references "(Something)Ref" to avoid confusion when using the property


# subject hierarchy

All v2 sources subscribe to `query.v2.${scope}.${type}`. This allows easy query
broadcasting for wildcard queries to `query.v2.${scope}.*` (for all types in a
specific scope), `query.v2.*.${type}` (for a specific type in all scopes) or
`query.v2.*.*` (for broadcasting to all sources).
