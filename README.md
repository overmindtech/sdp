# REDACTED Protocols

This repo contains the protocol buffers used in the redacted project. These will be shared between components

## Generating Libraries

Do not commit generated libraries to this repo!

### Golang

From the current directory run:

```shell
protoc -I .  --go_out=./ items.proto
```