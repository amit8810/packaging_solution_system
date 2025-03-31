import { CUSHIONING_RULE } from '../constants/cushioning-rules';
import { Box, IBox, IPackingMaterial, PackingMaterial } from '../models';
import { Item, IPaddedItem, IPackedItems, IFragilityPriority } from '../interfaces/packaging.interface';

const packaging = async (items: Array<Item>, maxSuggestions = 3) => {
    if (!items || !Array.isArray(items) || items.length === 0) {
        throw new Error('Items array cannot be empty');
    }

    const paddedItems = items.map((item) => {
        const cushion = CUSHIONING_RULE[item.fragility] || 0;
        return {
            length: item.length + 2 * cushion,
            width: item.width + 2 * cushion,
            height: item.height + 2 * cushion,
            original: {
                length: item.length,
                width: item.width,
                height: item.height,
            },
            fragility: item.fragility,
            quantity: item.quantity || 1,
        };
    });

    const boxes = await Box.find({ quantity_available: { $gt: 0 } });
    const packingMaterials = await PackingMaterial.find({});

    if (boxes.length === 0) throw new Error('No available boxes in inventory');
    if (packingMaterials.length === 0) throw new Error('No available packing materials in inventory');

    const totalItemVolume = paddedItems.reduce(
        (total, item) => total + item.length * item.width * item.height * item.quantity,
        0,
    );
    const sortedBoxes = boxes.sort((a, b) => a.length * a.width * a.height - b.length * b.width * b.height);

    let suitableBoxes = [];

    for (const box of sortedBoxes) {
        const boxVolume = box.length * box.width * box.height;

        if (boxVolume >= totalItemVolume) {
            // Check if the box can fit all items with padding
            const packedItems: Array<IPackedItems> | null = simple3DPacking(paddedItems, box);
            if (packedItems) {
                const usedPackingMaterials = calculatePackingMaterials(paddedItems, packingMaterials, box);
                const usedPackingMaterialsCost = usedPackingMaterials.reduce((total, pm) => total + pm.cost, 0);
                const boxCost = box.cost || 0;

                suitableBoxes.push({
                    box: {
                        sku: box.sku,
                        name: box.name,
                        length: box.length,
                        width: box.width,
                        height: box.height,
                        strength: box.strength,
                        type: box.type,
                        cost: box.cost,
                    },
                    itemsArrangement: getItemsCoordinates(packedItems),
                    packing_materials: usedPackingMaterials,
                    packing_material_cost: usedPackingMaterialsCost,
                    estimate_cost: boxCost + usedPackingMaterialsCost,
                    fit_rating: getFitRating(box, packedItems),
                });

                if (suitableBoxes.length >= maxSuggestions) break;
            }
        }
    }

    if (suitableBoxes.length === 0) {
        throw new Error('No single box fits all items. Consider splitting into multiple boxes.');
    }

    return suitableBoxes;
};

const simple3DPacking = (items: Array<IPaddedItem>, box: IBox) => {
    const fragilityPriority: IFragilityPriority = {
        unbreakable: 1,
        'semi-fragile': 2,
        fragile: 3,
    } as const;

    // Sort items:
    // 1. First by fragility (non-fragile first, fragile last)
    // 2. Then by volume (largest to smallest)
    const sortedItems = [...items].sort((a, b) => {
        if (fragilityPriority[a.fragility] !== fragilityPriority[b.fragility]) {
            return fragilityPriority[a.fragility] - fragilityPriority[b.fragility]; // Prioritize less fragile items first
        }
        return b.length * b.width * b.height - a.length * a.width * a.height; // Then sort by volume
    });

    // List of free spaces in the box (Initially, it's just the whole box)
    let freeSpaces = [
        {
            x: 0,
            y: 0,
            z: 0,
            length: box.length,
            width: box.width,
            height: box.height,
        },
    ];

    let packedItems = [];

    for (const item of sortedItems) {
        for (let i = 0; i < item.quantity; i++) {
            let placed = false;
            let bestFit = null;
            let bestFitSpaceIndex = -1;

            // Try to fit the item in any free space with rotation
            for (let j = 0; j < freeSpaces.length; j++) {
                let space = freeSpaces[j];

                // Try all 6 possible orientations
                let orientations = [
                    {
                        length: item.length,
                        width: item.width,
                        height: item.height,
                    },
                    {
                        length: item.length,
                        width: item.height,
                        height: item.width,
                    },
                    {
                        length: item.width,
                        width: item.length,
                        height: item.height,
                    },
                    {
                        length: item.width,
                        width: item.height,
                        height: item.length,
                    },
                    {
                        length: item.height,
                        width: item.length,
                        height: item.width,
                    },
                    {
                        length: item.height,
                        width: item.width,
                        height: item.length,
                    },
                ];

                for (let orientation of orientations) {
                    if (
                        orientation.length <= space.length &&
                        orientation.width <= space.width &&
                        orientation.height <= space.height
                    ) {
                        // Select the best fit (smallest remaining space)
                        let remainingSpace =
                            (space.length - orientation.length) *
                            (space.width - orientation.width) *
                            (space.height - orientation.height);

                        if (!bestFit || remainingSpace < bestFit.remainingSpace) {
                            bestFit = {
                                ...orientation,
                                x: space.x,
                                y: space.y,
                                z: space.z,
                                remainingSpace,
                            };
                            bestFitSpaceIndex = j;
                        }
                    }
                }
            }

            if (bestFit) {
                // Place the item using the best orientation
                packedItems.push({
                    ...item,
                    quantity: 1, // every item is placed one by one
                    length: bestFit.length,
                    width: bestFit.width,
                    height: bestFit.height,
                    x: bestFit.x,
                    y: bestFit.y,
                    z: bestFit.z,
                });

                // Remove the used space and add new free spaces
                let space = freeSpaces[bestFitSpaceIndex];
                freeSpaces.splice(bestFitSpaceIndex, 1);

                freeSpaces.push(
                    {
                        x: space.x + bestFit.length,
                        y: space.y,
                        z: space.z,
                        length: space.length - bestFit.length,
                        width: space.width,
                        height: space.height,
                    },

                    {
                        x: space.x,
                        y: space.y + bestFit.width,
                        z: space.z,
                        length: bestFit.length,
                        width: space.width - bestFit.width,
                        height: space.height,
                    },

                    {
                        x: space.x,
                        y: space.y,
                        z: space.z + bestFit.height,
                        length: bestFit.length,
                        width: bestFit.width,
                        height: space.height - bestFit.height,
                    },
                );

                placed = true;
            }

            if (!placed) return null; // If we can't place an item, return null
        }
    }

    return packedItems;
};

const getItemsCoordinates = (items: Array<IPackedItems>) => {
    let num = 1;
    const itemsCoordinates = [];
    for (const item of items) {
        itemsCoordinates.push({
            name: `Item-${num}-${item.original.length}x${item.original.width}x${item.original.height}`,
            coordinates: { x: item.x, y: item.y, z: item.z },
            fragility: item.fragility,
        });
        num += 1;
    }
    return itemsCoordinates;
};

const calculatePackingMaterials = (
    items: IPaddedItem[],
    materials: IPackingMaterial[],
    box: IBox,
): { name: string; amount: number; unit: string; cost: number }[] => {
    const materialsUsed: {
        name: string;
        amount: number;
        unit: string;
        cost: number;
    }[] = [];

    // Bubble Wrap (wrapping)
    const bubbleWrapMaterial: IPackingMaterial | undefined = materials.find(
        (m: IPackingMaterial) => m.name === 'Bubble Wrap',
    );
    if (bubbleWrapMaterial) {
        // total surface area of one item : 2 * (l*w + l*h + w*h)
        // total surface area of all items = total surface area of one item * quantity
        const bubbleWrapNeeded = items.reduce(
            (total, item) =>
                total +
                2 *
                    (item.original.length * item.original.width +
                        item.original.length * item.original.height +
                        item.original.width * item.original.height) *
                    item.quantity,
            0,
        );
        materialsUsed.push({
            name: bubbleWrapMaterial.name,
            amount: bubbleWrapNeeded,
            unit: bubbleWrapMaterial.unit,
            cost: bubbleWrapNeeded * (bubbleWrapMaterial.cost_per_unit || 0),
        });
    }

    // Packing Peanuts (filling)
    const peanutsMaterial: IPackingMaterial | undefined = materials.find(
        (m: IPackingMaterial) => m.name === 'Packing Peanuts',
    );
    if (peanutsMaterial) {
        const boxVolume = box.length * box.width * box.height;
        const itemsVolume = items.reduce(
            (total, item) => total + item.length * item.width * item.height * item.quantity,
            0,
        );

        const emptySpace = boxVolume - itemsVolume;
        // Assuming 50 cubic inches of peanuts fill 1 cubic inch of space
        const peanutsNeeded = Math.max(0, Math.ceil(emptySpace / 50));
        // Calculate the cost of peanuts based on the amount needed and cost per unit
        // Assuming peanuts are sold by volume, not weight
        materialsUsed.push({
            name: peanutsMaterial.name,
            amount: peanutsNeeded,
            unit: peanutsMaterial.unit,
            cost: peanutsNeeded * (peanutsMaterial.cost_per_unit || 0),
        });
    }

    return materialsUsed;
};

const getFitRating = (box: IBox, items: Array<IPackedItems>) => {
    const itemsVolume = items.reduce(
        (total: number, item) => total + item.length * item.width * item.height * item.quantity,
        0,
    );
    const boxVolume = box.length * box.width * box.height;
    const extraSpace = boxVolume - itemsVolume;

    const extraSpacePercentage = (extraSpace / boxVolume) * 100;
    if (extraSpacePercentage < 0) return 'Overpacked';
    if (extraSpacePercentage === 0) return 'Tight Fit';
    if (extraSpacePercentage <= 10) return 'Standard Fit';
    return 'Extra Room';
};

export = {
    packaging,
};
