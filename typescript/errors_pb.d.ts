import * as jspb from 'google-protobuf'



export class ItemRequestError extends jspb.Message {
  getErrortype(): temRequestError.ErrorType;
  setErrortype(value: temRequestError.ErrorType): ItemRequestError;

  getErrorstring(): string;
  setErrorstring(value: string): ItemRequestError;

  getContext(): string;
  setContext(value: string): ItemRequestError;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ItemRequestError.AsObject;
  static toObject(includeInstance: boolean, msg: ItemRequestError): ItemRequestError.AsObject;
  static serializeBinaryToWriter(message: ItemRequestError, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ItemRequestError;
  static deserializeBinaryFromReader(message: ItemRequestError, reader: jspb.BinaryReader): ItemRequestError;
}

export namespace ItemRequestError {
  export type AsObject = {
    errortype: temRequestError.ErrorType,
    errorstring: string,
    context: string,
  }

  export enum ErrorType { 
    OTHER = 0,
    NOTFOUND = 1,
    NOCONTEXT = 2,
  }
}

