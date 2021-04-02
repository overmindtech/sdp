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
export * from './errors_pb';
export * from './items_pb';
export * from './responses_pb';
//# sourceMappingURL=index.d.ts.map