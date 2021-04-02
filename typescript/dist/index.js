"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var items_pb_1 = require("./items_pb");
var sha1_1 = __importDefault(require("sha1"));
var to_data_view_1 = __importDefault(require("to-data-view"));
items_pb_1.Item.prototype.getUniqueattributevalue = function () {
    var _a, _b;
    var uniqueAttribute = this.getUniqueattribute();
    var fields = (_b = (_a = this.getAttributes()) === null || _a === void 0 ? void 0 : _a.getAttrstruct()) === null || _b === void 0 ? void 0 : _b.getFieldsMap();
    return String(fields === null || fields === void 0 ? void 0 : fields.get(uniqueAttribute));
};
items_pb_1.Item.prototype.getReference = function () {
    var ref = new items_pb_1.Reference();
    ref.setContext(this.getContext());
    ref.setType(this.getType());
    ref.setUniqueattributevalue(this.getUniqueattributevalue());
    return ref;
};
items_pb_1.Item.prototype.getGloballyuniquename = function () {
    return globallyUniqueName(this);
};
items_pb_1.Item.prototype.getHash = function () {
    return hash(this);
};
items_pb_1.Reference.prototype.getGloballyuniquename = function () {
    return globallyUniqueName(this);
};
items_pb_1.Reference.prototype.getHash = function () {
    return hash(this);
};
// Calculates a hash for each item. Should match the golang implementation
//
// TODO: Test that this matches the golang implementation
function hash(x) {
    var bytes = sha1_1.default(x.getGloballyuniquename(), {
        asBytes: true,
    });
    var base32String = base32EncodeCustom(bytes);
    return base32String.substring(0, 11);
}
// Shared code for both items and references
function globallyUniqueName(x) {
    var elements = [
        x.getContext(),
        x.getType(),
        x.getUniqueattributevalue(),
    ];
    return elements.join(".");
}
// This is a copied and modified version of
// https://github.com/LinusU/base32-encode made to support my custom encoding
function base32EncodeCustom(data) {
    var alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEF';
    var padding = false;
    var view = to_data_view_1.default(data);
    var bits = 0;
    var value = 0;
    var output = '';
    for (var i = 0; i < view.byteLength; i++) {
        value = (value << 8) | view.getUint8(i);
        bits += 8;
        while (bits >= 5) {
            output += alphabet[(value >>> (bits - 5)) & 31];
            bits -= 5;
        }
    }
    if (bits > 0) {
        output += alphabet[(value << (5 - bits)) & 31];
    }
    if (padding) {
        while ((output.length % 8) !== 0) {
            output += '=';
        }
    }
    return output;
}
// Export everything
__exportStar(require("./errors_pb"), exports);
__exportStar(require("./items_pb"), exports);
__exportStar(require("./responses_pb"), exports);
//# sourceMappingURL=index.js.map