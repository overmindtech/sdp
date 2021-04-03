import * as items_pb from './items_pb';
import * as errors_pb from './errors_pb';
import * as responses_pb from './responses_pb';
export declare class ItemRequestError extends errors_pb.ItemRequestError {
}
export declare class Response extends responses_pb.Response {
}
export declare class ItemRequest extends items_pb.ItemRequest {
}
export declare class ItemAttributes extends items_pb.ItemAttributes {
}
export declare class Items extends items_pb.Items {
}
export declare class Metadata extends items_pb.Metadata {
}
export interface RequestMethodMap extends items_pb.RequestMethodMap {
}
export declare const RequestMethod: RequestMethodMap;
export declare class Reference extends items_pb.Reference {
    getGloballyuniquename(): string;
    getHash(): string;
}
export declare class Item extends items_pb.Item {
    getUniqueattributevalue(): string;
    getGloballyuniquename(): string;
    getReference(): Reference;
    getHash(): string;
}
//# sourceMappingURL=index.d.ts.map