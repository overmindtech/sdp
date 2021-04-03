import { ItemRequest, ItemAttributes, Item, Items, Reference, Metadata, RequestMethodMap, RequestMethod } from './items_pb';
import { ItemRequestError } from './errors_pb';
import { Response } from './responses_pb';
export { ItemRequest, ItemAttributes, Item, Items, Reference, Metadata, RequestMethodMap, RequestMethod, ItemRequestError, Response, };
export declare namespace Util {
    function getGloballyuniquename(object: Reference | Item): string;
    function getHash(object: Reference | Item): string;
    function getUniqueattributevalue(object: Item | Reference): string;
    function getReference(item: Item): Reference;
}
//# sourceMappingURL=index.d.ts.map