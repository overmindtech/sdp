// This file contains the extra methods I want to add to the generated protobuf
// code

import { ItemRequest, ItemAttributes, Item, Items, Reference, Metadata, RequestMethodMap, RequestMethod } from './items_pb';
import { ItemRequestError } from './errors_pb';
import { Response } from './responses_pb';
import sha1 from 'sha1';
import toDataView from 'to-data-view';
import { Duration } from 'google-protobuf/google/protobuf/duration_pb';

// Re-Export all the stuff we just imported
export {
    ItemRequest,
    ItemAttributes,
    Item,
    Items,
    Reference,
    Metadata,
    RequestMethodMap,
    RequestMethod,
    ItemRequestError,
    Response,
}

export namespace Util {
    export function getGloballyuniquename(object: Reference | Item): string {
        const elements: string[] = [
            object.getContext(),
            object.getType(),
            getUniqueattributevalue(object),
        ];
    
        return elements.join(".");
    }

    export function getHash(object: Reference | Item): string {
        const bytes = sha1(getGloballyuniquename(object), {
            asBytes: true,
        })
    
        const base32String = base32EncodeCustom(bytes);
    
        return base32String.substring(0,11)
    }

    export function getUniqueattributevalue(object: Item | Reference): string {
        if ("getUniqueattributevalue" in object) {
            return object.getUniqueattributevalue();
        } else {
            const uniqueAttribute = object.getUniqueattribute();
            const fields = object.getAttributes()?.getAttrstruct()?.getFieldsMap();
            const value = fields?.get(uniqueAttribute)
            return value?.getStringValue() || "";
        }
    }

    export function getReference(item: Item): Reference {
        const ref = new Reference();

        ref.setContext(item.getContext());
        ref.setType(item.getType());
        ref.setUniqueattributevalue(getUniqueattributevalue(item));
    
        return ref;    
    }

    // Convert a durationpb to javascript Date object
    export function toDate(duration: Duration): Date {
        return new Date((duration.getSeconds() * 1000) + (duration.getNanos() / 1000000));
    }
}

//
// Private helper functions
//

// This is a copied and modified version of
// https://github.com/LinusU/base32-encode made to support my custom encoding
function base32EncodeCustom (data: Uint8Array | ArrayBuffer | Int8Array | Uint8ClampedArray) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEF'
    const padding = false;
    const view = toDataView(data)
  
    let bits = 0
    let value = 0
    let output = ''
  
    for (var i = 0; i < view.byteLength; i++) {
      value = (value << 8) | view.getUint8(i)
      bits += 8
  
      while (bits >= 5) {
        output += alphabet[(value >>> (bits - 5)) & 31]
        bits -= 5
      }
    }
  
    if (bits > 0) {
      output += alphabet[(value << (5 - bits)) & 31]
    }
  
    if (padding) {
      while ((output.length % 8) !== 0) {
        output += '='
      }
    }
  
    return output
}
