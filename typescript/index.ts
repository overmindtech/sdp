// This file contains the extra methods I want to add to the generated protobuf
// code

import * as items_pb from './items_pb';
import * as errors_pb from './errors_pb';
import * as responses_pb from './responses_pb';

import sha1 from 'sha1';
import toDataView from 'to-data-view';

export class ItemRequestError extends errors_pb.ItemRequestError {}
export class Response extends responses_pb.Response {}

export class Reference extends items_pb.Reference {
    getGloballyuniquename(): string {
        return globallyUniqueName(this);
    }
    getHash(): string {
        return hash(this);
    }
}

export class Item extends items_pb.Item {
    getUniqueattributevalue(): string {
        const uniqueAttribute = this.getUniqueattribute();
        const fields = this.getAttributes()?.getAttrstruct()?.getFieldsMap();
        return String(fields?.get(uniqueAttribute));
    }

    getGloballyuniquename(): string {
        return globallyUniqueName(this);
    }
    getReference(): Reference {
        const ref = new Reference();

        ref.setContext(this.getContext());
        ref.setType(this.getType());
        ref.setUniqueattributevalue(this.getUniqueattributevalue());
    
        return ref;    
    }
    getHash(): string {
        return hash(this);
    }
}


//
// Private helper functions
//

// Calculates a hash for each item. Should match the golang implementation
//
// TODO: Test that this matches the golang implementation
function hash(x: Item | Reference): string {
    const bytes = sha1(x.getGloballyuniquename(),{
        asBytes: true,
    })

    const base32String = base32EncodeCustom(bytes);

    return base32String.substring(0,11)
}

// Shared code for both items and references
function globallyUniqueName(x: Item | Reference): string {
    const elements: string[] = [
        x.getContext(),
        x.getType(),
        x.getUniqueattributevalue(),
    ];

    return elements.join(".");
}

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
