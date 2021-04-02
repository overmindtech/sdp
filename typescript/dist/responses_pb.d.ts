// package: 
// file: responses.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_duration_pb from "google-protobuf/google/protobuf/duration_pb";

export class Response extends jspb.Message {
  getContext(): string;
  setContext(value: string): void;

  getState(): Response.ResponseStateMap[keyof Response.ResponseStateMap];
  setState(value: Response.ResponseStateMap[keyof Response.ResponseStateMap]): void;

  hasNextupdatein(): boolean;
  clearNextupdatein(): void;
  getNextupdatein(): google_protobuf_duration_pb.Duration | undefined;
  setNextupdatein(value?: google_protobuf_duration_pb.Duration): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Response.AsObject;
  static toObject(includeInstance: boolean, msg: Response): Response.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Response, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Response;
  static deserializeBinaryFromReader(message: Response, reader: jspb.BinaryReader): Response;
}

export namespace Response {
  export type AsObject = {
    context: string,
    state: Response.ResponseStateMap[keyof Response.ResponseStateMap],
    nextupdatein?: google_protobuf_duration_pb.Duration.AsObject,
  }

  export interface ResponseStateMap {
    WORKING: 0;
    COMPLETE: 1;
  }

  export const ResponseState: ResponseStateMap;
}

