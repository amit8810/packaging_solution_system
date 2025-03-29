import { Schema, model, Document } from "mongoose";

export interface IBox extends Document {
  sku: string;
  name: string;
  length: number;
  width: number;
  height: number;
  strength: "single-wall" | "double-wall" | "triple-wall";
  type: "standard" | "mailing tube" | "flat mailer";
  quantity_available: number;
  cost: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const boxSchema = new Schema<IBox>(
  {
    sku: {
      type: String,
      required: [true, "SKU is required"],
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    length: {
      type: Number,
      required: [true, "Length is required"],
      min: [0, "Length cannot be negative"],
    },
    width: {
      type: Number,
      required: [true, "Width is required"],
      min: [0, "Width cannot be negative"],
    },
    height: {
      type: Number,
      required: [true, "Height is required"],
      min: [0, "Height cannot be negative"],
    },
    strength: {
      type: String,
      required: [true, "Strength is required"],
      enum: ["single-wall", "double-wall", "triple-wall"],
      trim: true,
    },
    type: {
      type: String,
      required: [true, "Type is required"],
      enum: ["standard", "mailing tube", "flat mailer"],
      trim: true,
    },
    quantity_available: {
      type: Number,
      required: [true, "Quantity available is required"],
      min: [0, "Quantity cannot be negative"],
      default: 0,
    },
    cost: {
      type: Number,
      required: [true, "Cost is required"],
      min: [0, "Cost cannot be negative"],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

boxSchema.index({ sku: 1, storeId: 1 }, { unique: true });
boxSchema.index({ quantity_available: 1 });

export const Box = model<IBox>("Box", boxSchema);