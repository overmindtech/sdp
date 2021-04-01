import * as jspb from 'google-protobuf'

import * as google_protobuf_struct_pb from 'google-protobuf/google/protobuf/struct_pb';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';
import * as google_protobuf_duration_pb from 'google-protobuf/google/protobuf/duration_pb';


export class ItemRequest extends jspb.Message {
  getType(): string;
  setType(value: string): ItemRequest;

  getMethod(): equestMethod;
  setMethod(value: equestMethod): ItemRequest;

  getQuery(): string;
  setQuery(value: string): ItemRequest;

  getLinkdepth(): number;
  setLinkdepth(value: number): ItemRequest;

  getContext(): string;
  setContext(value: string): ItemRequest;

  getItemsubject(): string;
  setItemsubject(value: string): ItemRequest;

  getLinkeditemsubject(): string;
  setLinkeditemsubject(value: string): ItemRequest;

  getResponsesubject(): string;
  setResponsesubject(value: string): ItemRequest;

  getErrorsubject(): string;
  setErrorsubject(value: string): ItemRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ItemRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ItemRequest): ItemRequest.AsObject;
  static serializeBinaryToWriter(message: ItemRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ItemRequest;
  static deserializeBinaryFromReader(message: ItemRequest, reader: jspb.BinaryReader): ItemRequest;
}

export namespace ItemRequest {
  export type AsObject = {
    type: string,
    method: equestMethod,
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
  getAttrstruct(): google_protobuf_struct_pb.Struct | undefined;
  setAttrstruct(value?: google_protobuf_struct_pb.Struct): ItemAttributes;
  hasAttrstruct(): boolean;
  clearAttrstruct(): ItemAttributes;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ItemAttributes.AsObject;
  static toObject(includeInstance: boolean, msg: ItemAttributes): ItemAttributes.AsObject;
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
  setType(value: string): Item;

  getUniqueattribute(): string;
  setUniqueattribute(value: string): Item;

  getAttributes(): ItemAttributes | undefined;
  setAttributes(value?: ItemAttributes): Item;
  hasAttributes(): boolean;
  clearAttributes(): Item;

  getMetadata(): Metadata | undefined;
  setMetadata(value?: Metadata): Item;
  hasMetadata(): boolean;
  clearMetadata(): Item;

  getContext(): string;
  setContext(value: string): Item;

  getLinkeditemrequestsList(): Array<ItemRequest>;
  setLinkeditemrequestsList(value: Array<ItemRequest>): Item;
  clearLinkeditemrequestsList(): Item;
  addLinkeditemrequests(value?: ItemRequest, index?: number): ItemRequest;

  getLinkeditemsList(): Array<Reference>;
  setLinkeditemsList(value: Array<Reference>): Item;
  clearLinkeditemsList(): Item;
  addLinkeditems(value?: Reference, index?: number): Reference;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Item.AsObject;
  static toObject(includeInstance: boolean, msg: Item): Item.AsObject;
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
  getItemsList(): Array<Item>;
  setItemsList(value: Array<Item>): Items;
  clearItemsList(): Items;
  addItems(value?: Item, index?: number): Item;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Items.AsObject;
  static toObject(includeInstance: boolean, msg: Items): Items.AsObject;
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
  setType(value: string): Reference;

  getUniqueattributevalue(): string;
  setUniqueattributevalue(value: string): Reference;

  getContext(): string;
  setContext(value: string): Reference;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Reference.AsObject;
  static toObject(includeInstance: boolean, msg: Reference): Reference.AsObject;
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
  setBackendname(value: string): Metadata;

  getRequestmethod(): equestMethod;
  setRequestmethod(value: equestMethod): Metadata;

  getTimestamp(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setTimestamp(value?: google_protobuf_timestamp_pb.Timestamp): Metadata;
  hasTimestamp(): boolean;
  clearTimestamp(): Metadata;

  getBackendduration(): google_protobuf_duration_pb.Duration | undefined;
  setBackendduration(value?: google_protobuf_duration_pb.Duration): Metadata;
  hasBackendduration(): boolean;
  clearBackendduration(): Metadata;

  getBackenddurationperitem(): google_protobuf_duration_pb.Duration | undefined;
  setBackenddurationperitem(value?: google_protobuf_duration_pb.Duration): Metadata;
  hasBackenddurationperitem(): boolean;
  clearBackenddurationperitem(): Metadata;

  getBackendpackage(): string;
  setBackendpackage(value: string): Metadata;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Metadata.AsObject;
  static toObject(includeInstance: boolean, msg: Metadata): Metadata.AsObject;
  static serializeBinaryToWriter(message: Metadata, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Metadata;
  static deserializeBinaryFromReader(message: Metadata, reader: jspb.BinaryReader): Metadata;
}

export namespace Metadata {
  export type AsObject = {
    backendname: string,
    requestmethod: equestMethod,
    timestamp?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    backendduration?: google_protobuf_duration_pb.Duration.AsObject,
    backenddurationperitem?: google_protobuf_duration_pb.Duration.AsObject,
    backendpackage: string,
  }
}

export enum RequestMethod { 
  GET = 0,
  FIND = 1,
  SEARCH = 2,
}
