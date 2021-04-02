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
export {};
//# sourceMappingURL=util.d.ts.map