import { Item, Reference } from './items_pb';
import sha1 from 'sha1';
import toDataView from 'to-data-view';

declare module "./items_pb" {
    interface Item {
        getUniqueattributevalue(): string;
        getGloballyuniquename(): string;
        getReference(): Reference;
        getHash(): string;
    }

    interface Reference {
        getGloballyuniquename(): string;
        getHash(): string;
    }
}

Item.prototype.getUniqueattributevalue = function (this: Item): string {
    const uniqueAttribute = this.getUniqueattribute();
    const fields = this.getAttributes()?.getAttrstruct()?.getFieldsMap();
    return String(fields?.get(uniqueAttribute));
}

Item.prototype.getReference = function (this: Item): Reference {
    const ref = new Reference();

    ref.setContext(this.getContext());
    ref.setType(this.getType());
    ref.setUniqueattributevalue(this.getUniqueattributevalue());

    return ref;
}

Item.prototype.getGloballyuniquename = function(this: Item): string {
    return globallyUniqueName(this);
}

Item.prototype.getHash = function(this: Item): string {
    return hash(this);
}

Reference.prototype.getGloballyuniquename = function(this: Reference): string {
    return globallyUniqueName(this);
}

Reference.prototype.getHash = function(this: Reference): string {
    return hash(this);
}


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

// Export everything
export * from './errors_pb';
export * from './items_pb';
export * from './responses_pb';
