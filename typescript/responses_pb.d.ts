import * as jspb from 'google-protobuf'

import * as google_protobuf_duration_pb from 'google-protobuf/google/protobuf/duration_pb';


export class Response extends jspb.Message {
  getContext(): string;
  setContext(value: string): Response;

  getState(): esponse.ResponseState;
  setState(value: esponse.ResponseState): Response;

  getNextupdatein(): google_protobuf_duration_pb.Duration | undefined;
  setNextupdatein(value?: google_protobuf_duration_pb.Duration): Response;
  hasNextupdatein(): boolean;
  clearNextupdatein(): Response;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Response.AsObject;
  static toObject(includeInstance: boolean, msg: Response): Response.AsObject;
  static serializeBinaryToWriter(message: Response, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Response;
  static deserializeBinaryFromReader(message: Response, reader: jspb.BinaryReader): Response;
}

export namespace Response {
  export type AsObject = {
    context: string,
    state: esponse.ResponseState,
    nextupdatein?: google_protobuf_duration_pb.Duration.AsObject,
  }

  export enum ResponseState { 
    WORKING = 0,
    COMPLETE = 1,
  }
}

