"use strict";
// This file contains the extra methods I want to add to the generated protobuf
// code
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = exports.Reference = exports.Metadata = exports.Items = exports.ItemAttributes = exports.ItemRequest = exports.Response = exports.ItemRequestError = void 0;
var items_pb = __importStar(require("./items_pb"));
var errors_pb = __importStar(require("./errors_pb"));
var responses_pb = __importStar(require("./responses_pb"));
var sha1_1 = __importDefault(require("sha1"));
var to_data_view_1 = __importDefault(require("to-data-view"));
// Manually re-export all of the stuff from the protobuf generated modules. I'm
// pretty certain this is not a great way of doing it but if it works it's a lot
// better than what I was doing before
var ItemRequestError = /** @class */ (function (_super) {
    __extends(ItemRequestError, _super);
    function ItemRequestError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ItemRequestError;
}(errors_pb.ItemRequestError));
exports.ItemRequestError = ItemRequestError;
var Response = /** @class */ (function (_super) {
    __extends(Response, _super);
    function Response() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Response;
}(responses_pb.Response));
exports.Response = Response;
var ItemRequest = /** @class */ (function (_super) {
    __extends(ItemRequest, _super);
    function ItemRequest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ItemRequest;
}(items_pb.ItemRequest));
exports.ItemRequest = ItemRequest;
var ItemAttributes = /** @class */ (function (_super) {
    __extends(ItemAttributes, _super);
    function ItemAttributes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ItemAttributes;
}(items_pb.ItemAttributes));
exports.ItemAttributes = ItemAttributes;
var Items = /** @class */ (function (_super) {
    __extends(Items, _super);
    function Items() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Items;
}(items_pb.Items));
exports.Items = Items;
var Metadata = /** @class */ (function (_super) {
    __extends(Metadata, _super);
    function Metadata() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Metadata;
}(items_pb.Metadata));
exports.Metadata = Metadata;
;
var Reference = /** @class */ (function (_super) {
    __extends(Reference, _super);
    function Reference() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Reference.prototype.getGloballyuniquename = function () {
        return globallyUniqueName(this);
    };
    Reference.prototype.getHash = function () {
        return hash(this);
    };
    return Reference;
}(items_pb.Reference));
exports.Reference = Reference;
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Item.prototype.getUniqueattributevalue = function () {
        var _a, _b;
        var uniqueAttribute = this.getUniqueattribute();
        var fields = (_b = (_a = this.getAttributes()) === null || _a === void 0 ? void 0 : _a.getAttrstruct()) === null || _b === void 0 ? void 0 : _b.getFieldsMap();
        return String(fields === null || fields === void 0 ? void 0 : fields.get(uniqueAttribute));
    };
    Item.prototype.getGloballyuniquename = function () {
        return globallyUniqueName(this);
    };
    Item.prototype.getReference = function () {
        var ref = new Reference();
        ref.setContext(this.getContext());
        ref.setType(this.getType());
        ref.setUniqueattributevalue(this.getUniqueattributevalue());
        return ref;
    };
    Item.prototype.getHash = function () {
        return hash(this);
    };
    return Item;
}(items_pb.Item));
exports.Item = Item;
//
// Private helper functions
//
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
//# sourceMappingURL=index.js.map