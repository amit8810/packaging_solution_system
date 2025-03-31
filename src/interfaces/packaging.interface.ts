interface Item {
    name: string;
    length: number;
    width: number;
    height: number;
    quantity: number;
    fragility: string;
}

interface OriginalDimensions {
    length: number;
    width: number;
    height: number;
}

interface IPaddedItem {
    length: number;
    width: number;
    height: number;
    original: OriginalDimensions;
    fragility: string;
    quantity: number;
}

interface IPackedItems {
    length: number;
    width: number;
    height: number;
    x: number;
    y: number;
    z: number;
    original: OriginalDimensions;
    fragility: string;
    quantity: number;
}

interface IFragilityPriority {
    [key: string]: number;
}

export { Item, IPaddedItem, IPackedItems, IFragilityPriority };
