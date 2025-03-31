import { Schema, model, Document } from 'mongoose';

export interface IPackingMaterial extends Document {
    name: string;
    type: 'wrapping' | 'filling';
    unit: 'feet' | 'oz' | 'count';
    calculation_formula: string;
    cost_per_unit: number;
    createdAt?: Date;
    updatedAt?: Date;
}

const packingMaterialSchema = new Schema<IPackingMaterial>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        type: {
            type: String,
            required: [true, 'Type is required'],
            enum: ['wrapping', 'filling'],
            trim: true,
        },
        unit: {
            type: String,
            required: [true, 'Unit is required'],
            enum: ['feet', 'oz', 'count'],
            trim: true,
        },
        calculation_formula: {
            type: String,
            required: [true, 'Calculation formula is required'],
            trim: true,
        },
        cost_per_unit: {
            type: Number,
            default: 0,
            min: [0, 'Cost cannot be negative'],
        },
    },
    {
        timestamps: true,
    },
);

packingMaterialSchema.index({ name: 1, storeId: 1 }, { unique: true });
packingMaterialSchema.index({ type: 1 });

export const PackingMaterial = model<IPackingMaterial>('PackingMaterial', packingMaterialSchema);
