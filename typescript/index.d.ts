import * as items_pb from './items_pb';
import * as errors_pb from './errors_pb';
import * as responses_pb from './responses_pb';
export declare class ItemRequestError extends errors_pb.ItemRequestError {
}
export declare class Response extends responses_pb.Response {
}
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