// package: 
// file: items.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_struct_pb from "google-protobuf/google/protobuf/struct_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as google_protobuf_duration_pb from "google-protobuf/google/protobuf/duration_pb";

export class ItemRequest extends jspb.Message {
  getType(): string;
  setType(value: string): void;

  getMethod(): RequestMethodMap[keyof RequestMethodMap];
  setMethod(value: RequestMethodMap[keyof RequestMethodMap]): void;

  getQuery(): string;
  setQuery(value: string): void;

  getLinkdepth(): number;
  setLinkdepth(value: number): void;

  getContext(): string;
  setContext(value: string): void;

  getItemsubject(): string;
  setItemsubject(value: string): void;

  getLinkeditemsubject(): string;
  setLinkeditemsubject(value: string): void;

  getResponsesubject(): string;
  setResponsesubject(value: string): void;

  getErrorsubject(): string;
  setErrorsubject(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ItemRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ItemRequest): ItemRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ItemRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ItemRequest;
  static deserializeBinaryFromReader(message: ItemRequest, reader: jspb.BinaryReader): ItemRequest;
}

export namespace ItemRequest {
  export type AsObject = {
    type: string,
    method: RequestMethodMap[keyof RequestMethodMap],
    query: string,
    linkdepth: number,
    context: string,
    itemsubject: string,
    linkeditemsubject: string,
    responsesubject: string,
    errorsubject: string,
  }
}

export class ItemAttributes extends jspb.Message {
  hasAttrstruct(): boolean;
  clearAttrstruct(): void;
  getAttrstruct(): google_protobuf_struct_pb.Struct | undefined;
  setAttrstruct(value?: google_protobuf_struct_pb.Struct): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ItemAttributes.AsObject;
  static toObject(includeInstance: boolean, msg: ItemAttributes): ItemAttributes.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ItemAttributes, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ItemAttributes;
  static deserializeBinaryFromReader(message: ItemAttributes, reader: jspb.BinaryReader): ItemAttributes;
}

export namespace ItemAttributes {
  export type AsObject = {
    attrstruct?: google_protobuf_struct_pb.Struct.AsObject,
  }
}

export class Item extends jspb.Message {
  getType(): string;
  setType(value: string): void;

  getUniqueattribute(): string;
  setUniqueattribute(value: string): void;

  hasAttributes(): boolean;
  clearAttributes(): void;
  getAttributes(): ItemAttributes | undefined;
  setAttributes(value?: ItemAttributes): void;

  hasMetadata(): boolean;
  clearMetadata(): void;
  getMetadata(): Metadata | undefined;
  setMetadata(value?: Metadata): void;

  getContext(): string;
  setContext(value: string): void;

  clearLinkeditemrequestsList(): void;
  getLinkeditemrequestsList(): Array<ItemRequest>;
  setLinkeditemrequestsList(value: Array<ItemRequest>): void;
  addLinkeditemrequests(value?: ItemRequest, index?: number): ItemRequest;

  clearLinkeditemsList(): void;
  getLinkeditemsList(): Array<Reference>;
  setLinkeditemsList(value: Array<Reference>): void;
  addLinkeditems(value?: Reference, index?: number): Reference;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Item.AsObject;
  static toObject(includeInstance: boolean, msg: Item): Item.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Item, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Item;
  static deserializeBinaryFromReader(message: Item, reader: jspb.BinaryReader): Item;
}

export namespace Item {
  export type AsObject = {
    type: string,
    uniqueattribute: string,
    attributes?: ItemAttributes.AsObject,
    metadata?: Metadata.AsObject,
    context: string,
    linkeditemrequestsList: Array<ItemRequest.AsObject>,
    linkeditemsList: Array<Reference.AsObject>,
  }
}

export class Items extends jspb.Message {
  clearItemsList(): void;
  getItemsList(): Array<Item>;
  setItemsList(value: Array<Item>): void;
  addItems(value?: Item, index?: number): Item;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Items.AsObject;
  static toObject(includeInstance: boolean, msg: Items): Items.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Items, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Items;
  static deserializeBinaryFromReader(message: Items, reader: jspb.BinaryReader): Items;
}

export namespace Items {
  export type AsObject = {
    itemsList: Array<Item.AsObject>,
  }
}

export class Reference extends jspb.Message {
  getType(): string;
  setType(value: string): void;

  getUniqueattributevalue(): string;
  setUniqueattributevalue(value: string): void;

  getContext(): string;
  setContext(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Reference.AsObject;
  static toObject(includeInstance: boolean, msg: Reference): Reference.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Reference, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Reference;
  static deserializeBinaryFromReader(message: Reference, reader: jspb.BinaryReader): Reference;
}

export namespace Reference {
  export type AsObject = {
    type: string,
    uniqueattributevalue: string,
    context: string,
  }
}

export class Metadata extends jspb.Message {
  getBackendname(): string;
  setBackendname(value: string): void;

  getRequestmethod(): RequestMethodMap[keyof RequestMethodMap];
  setRequestmethod(value: RequestMethodMap[keyof RequestMethodMap]): void;

  hasTimestamp(): boolean;
  clearTimestamp(): void;
  getTimestamp(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setTimestamp(value?: google_protobuf_timestamp_pb.Timestamp): void;

  hasBackendduration(): boolean;
  clearBackendduration(): void;
  getBackendduration(): google_protobuf_duration_pb.Duration | undefined;
  setBackendduration(value?: google_protobuf_duration_pb.Duration): void;

  hasBackenddurationperitem(): boolean;
  clearBackenddurationperitem(): void;
  getBackenddurationperitem(): google_protobuf_duration_pb.Duration | undefined;
  setBackenddurationperitem(value?: google_protobuf_duration_pb.Duration): void;

  getBackendpackage(): string;
  setBackendpackage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Metadata.AsObject;
  static toObject(includeInstance: boolean, msg: Metadata): Metadata.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Metadata, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Metadata;
  static deserializeBinaryFromReader(message: Metadata, reader: jspb.BinaryReader): Metadata;
}

export namespace Metadata {
  export type AsObject = {
    backendname: string,
    requestmethod: RequestMethodMap[keyof RequestMethodMap],
    timestamp?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    backendduration?: google_protobuf_duration_pb.Duration.AsObject,
    backenddurationperitem?: google_protobuf_duration_pb.Duration.AsObject,
    backendpackage: string,
  }
}

export interface RequestMethodMap {
  GET: 0;
  FIND: 1;
  SEARCH: 2;
}

export const RequestMethod: RequestMethodMap;

