// package: 
// file: errors.proto

import * as jspb from "google-protobuf";

export class ItemRequestError extends jspb.Message {
  getErrortype(): ItemRequestError.ErrorTypeMap[keyof ItemRequestError.ErrorTypeMap];
  setErrortype(value: ItemRequestError.ErrorTypeMap[keyof ItemRequestError.ErrorTypeMap]): void;

  getErrorstring(): string;
  setErrorstring(value: string): void;

  getContext(): string;
  setContext(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ItemRequestError.AsObject;
  static toObject(includeInstance: boolean, msg: ItemRequestError): ItemRequestError.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ItemRequestError, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ItemRequestError;
  static deserializeBinaryFromReader(message: ItemRequestError, reader: jspb.BinaryReader): ItemRequestError;
}

export namespace ItemRequestError {
  export type AsObject = {
    errortype: ItemRequestError.ErrorTypeMap[keyof ItemRequestError.ErrorTypeMap],
    errorstring: string,
    context: string,
  }

  export interface ErrorTypeMap {
    OTHER: 0;
    NOTFOUND: 1;
    NOCONTEXT: 2;
  }

  export const ErrorType: ErrorTypeMap;
}

