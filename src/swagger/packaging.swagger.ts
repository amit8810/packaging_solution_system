const packagingSwagger = {
    "/api/packaging": {
        post: {
            summary: "Get packaging suggestions for items",
            tags: ["Packaging"],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                items: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            name: { type: "string", description: "Name of the item" },
                                            length: { type: "number", description: "Length of the item" },
                                            width: { type: "number", description: "Width of the item" },
                                            height: { type: "number", description: "Height of the item" },
                                            fragility: {
                                                type: "string",
                                                description: "Fragility level (e.g., fragile, semi-fragile, unbreakable)",
                                            },
                                            quantity: {
                                                type: "number",
                                                description: "Number of items (optional, defaults to 1)",
                                            },
                                        },
                                        required: ["length", "width", "height", "fragility", "name"],
                                    },
                                },
                                maxSuggestions: {
                                    type: "number",
                                    default: 3,
                                    description: "Maximum number of packaging suggestions to return",
                                },
                            },
                            required: ["items"],
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "List of suitable packaging suggestions",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        box: {
                                            type: "object",
                                            properties: {
                                                sku: { type: "string", description: "Stock Keeping Unit" },
                                                name: { type: "string", description: "Name of the box" },
                                                length: { type: "number", description: "Length of the box" },
                                                width: { type: "number", description: "Width of the box" },
                                                height: { type: "number", description: "Height of the box" },
                                                strength: {
                                                    type: "string",
                                                    description: "Strength of the box (single-wall, double-wall, triple-wall)",
                                                },
                                                type: {
                                                    type: "string",
                                                    description: "Type of the box (standard, mailing tube, flat mailer)",
                                                },
                                                cost: { type: "number", description: "Cost of the box" },
                                            },
                                        },
                                        itemsArrangement: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    name: { type: "string", description: "Name of the item" },
                                                    coordinates: {
                                                        type: "object",
                                                        properties: {
                                                            x: { type: "number" },
                                                            y: { type: "number" },
                                                            z: { type: "number" },
                                                        },
                                                    },
                                                    fragility: { type: "string", description: "Fragility level" },
                                                },
                                            },
                                            description: "Arrangement of items in the box",
                                        },
                                        packing_materials: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    name: { type: "string", description: "Name of the material" },
                                                    amount: { type: "number", description: "Amount used" },
                                                    unit: { type: "string", description: "Unit of measurement" },
                                                    cost: { type: "number", description: "Cost of the material" },
                                                },
                                            },
                                            description: "Packing materials used",
                                        },
                                        material_cost: {
                                            type: "number",
                                            description: "Total cost of packing materials",
                                        },
                                        estimate_cost: {
                                            type: "number",
                                            description: "Total estimated cost (box + materials)",
                                        },
                                        fit_rating: {
                                            type: "string",
                                            description: "Fit rating (e.g., Tight Fit, Standard Fit, Extra Room)",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                400: {
                    description: "Invalid input",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string" },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};

export default packagingSwagger;