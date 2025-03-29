import mongoose from "mongoose";
import { Box, PackingMaterial, IBox, IPackingMaterial } from "../models";
import connectDb from "../db/connection";

const boxes = [
    { sku: "BX10001", name: "Standard Box Small", length: 10, width: 8, height: 6, strength: "single-wall", type: "standard", quantity_available: 120, cost: 2.5 },
    { sku: "BX10002", name: "Standard Box Medium", length: 15, width: 12, height: 10, strength: "double-wall", type: "standard", quantity_available: 100, cost: 4.0 },
    { sku: "BX10003", name: "Standard Box Large", length: 20, width: 16, height: 12, strength: "triple-wall", type: "standard", quantity_available: 75, cost: 6.5 },
    { sku: "BX10004", name: "Mailing Tube Small", length: 12, width: 2, height: 2, strength: "single-wall", type: "mailing tube", quantity_available: 200, cost: 1.5 },
    { sku: "BX10005", name: "Mailing Tube Large", length: 36, width: 4, height: 4, strength: "double-wall", type: "mailing tube", quantity_available: 150, cost: 3.0 },
    { sku: "BX10006", name: "Flat Mailer Small", length: 10, width: 7, height: 0.5, strength: "single-wall", type: "flat mailer", quantity_available: 300, cost: 1.0 },
    { sku: "BX10007", name: "Flat Mailer Medium", length: 14, width: 10, height: 0.75, strength: "double-wall", type: "flat mailer", quantity_available: 250, cost: 2.0 },
    { sku: "BX10008", name: "Flat Mailer Large", length: 18, width: 12, height: 1, strength: "triple-wall", type: "flat mailer", quantity_available: 200, cost: 3.5 },
    { sku: "BX10009", name: "Standard Box Extra Large", length: 30, width: 24, height: 20, strength: "triple-wall", type: "standard", quantity_available: 40, cost: 10.0 },
    { sku: "BX10010", name: "Mailing Tube Medium", length: 24, width: 3, height: 3, strength: "double-wall", type: "mailing tube", quantity_available: 180, cost: 2.0 },
    { sku: "BX10011", name: "Standard Box Mini", length: 8, width: 6, height: 4, strength: "single-wall", type: "standard", quantity_available: 150, cost: 2.0 },
    { sku: "BX10012", name: "Standard Box Jumbo", length: 40, width: 30, height: 25, strength: "triple-wall", type: "standard", quantity_available: 30, cost: 15.0 },
    { sku: "BX10013", name: "Flat Mailer Extra Small", length: 8, width: 6, height: 0.25, strength: "single-wall", type: "flat mailer", quantity_available: 350, cost: 0.8 },
    { sku: "BX10014", name: "Flat Mailer Large Heavy Duty", length: 18, width: 12, height: 1.5, strength: "double-wall", type: "flat mailer", quantity_available: 80, cost: 3.8 },
    { sku: "BX10015", name: "Standard Box Small Heavy Duty", length: 10, width: 8, height: 8, strength: "double-wall", type: "standard", quantity_available: 60, cost: 3.5 },
    { sku: "BX10016", name: "Mailing Tube Extra Large", length: 48, width: 6, height: 6, strength: "triple-wall", type: "mailing tube", quantity_available: 50, cost: 4.5 },
    { sku: "BX10017", name: "Mailing Tube Small Heavy Duty", length: 18, width: 3, height: 3, strength: "double-wall", type: "mailing tube", quantity_available: 140, cost: 2.5 },
    { sku: "BX10018", name: "Flat Mailer Extra Large", length: 24, width: 16, height: 1.25, strength: "triple-wall", type: "flat mailer", quantity_available: 60, cost: 4.2 },
    { sku: "BX10019", name: "Standard Box Medium Heavy Duty", length: 15, width: 12, height: 10, strength: "triple-wall", type: "standard", quantity_available: 50, cost: 6.0 },
    { sku: "BX10020", name: "Flat Mailer Small Heavy Duty", length: 10, width: 7, height: 0.75, strength: "double-wall", type: "flat mailer", quantity_available: 220, cost: 2.3 },
    { sku: "BX10021", name: "Standard Box Small", length: 10, width: 8, height: 6, strength: "single-wall", type: "standard", quantity_available: 100, cost: 2.5 },
    { sku: "BX10022", name: "Mailing Tube Large Heavy Duty", length: 36, width: 4, height: 5, strength: "triple-wall", type: "mailing tube", quantity_available: 90, cost: 3.5 },
    { sku: "BX10023", name: "Standard Box Medium", length: 15, width: 12, height: 10, strength: "single-wall", type: "standard", quantity_available: 130, cost: 4.5 },
    { sku: "BX10024", name: "Flat Mailer Medium Heavy Duty", length: 14, width: 10, height: 1, strength: "double-wall", type: "flat mailer", quantity_available: 100, cost: 3.0 },
    { sku: "BX10025", name: "Flat Mailer Small Heavy Duty", length: 10, width: 7, height: 0.5, strength: "double-wall", type: "flat mailer", quantity_available: 150, cost: 2.0 },
    { sku: "BX10026", name: "Mailing Tube Small", length: 10, width: 2, height: 2, strength: "single-wall", type: "mailing tube", quantity_available: 220, cost: 1.2 },
    { sku: "BX10027", name: "Mailing Tube Medium", length: 24, width: 4, height: 4, strength: "single-wall", type: "mailing tube", quantity_available: 170, cost: 2.0 },
    { sku: "BX10028", name: "Standard Box Large", length: 20, width: 16, height: 12, strength: "double-wall", type: "standard", quantity_available: 85, cost: 5.0 },
    { sku: "BX10029", name: "Flat Mailer Extra Small", length: 8, width: 6, height: 0.5, strength: "single-wall", type: "flat mailer", quantity_available: 320, cost: 0.9 },
    { sku: "BX10030", name: "Flat Mailer Large", length: 18, width: 12, height: 1, strength: "double-wall", type: "flat mailer", quantity_available: 70, cost: 3.2 },
    { sku: "BX10031", name: "Mailing Tube Small", length: 10, width: 3, height: 3, strength: "double-wall", type: "mailing tube", quantity_available: 160, cost: 2.3 },
    { sku: "BX10032", name: "Mailing Tube Large", length: 36, width: 5, height: 5, strength: "single-wall", type: "mailing tube", quantity_available: 130, cost: 2.8 },
    { sku: "BX10033", name: "Flat Mailer Extra Large", length: 24, width: 16, height: 1, strength: "triple-wall", type: "flat mailer", quantity_available: 60, cost: 4.3 },
    { sku: "BX10034", name: "Standard Box Small", length: 10, width: 8, height: 6, strength: "single-wall", type: "standard", quantity_available: 120, cost: 2.5 },
    { sku: "BX10035", name: "Standard Box Medium", length: 15, width: 12, height: 10, strength: "double-wall", type: "standard", quantity_available: 110, cost: 4.2 },
    { sku: "BX10036", name: "Flat Mailer Small", length: 10, width: 7, height: 0.5, strength: "single-wall", type: "flat mailer", quantity_available: 300, cost: 1.0 },
    { sku: "BX10037", name: "Standard Box Large", length: 20, width: 16, height: 12, strength: "double-wall", type: "standard", quantity_available: 70, cost: 5.5 },
    { sku: "BX10038", name: "Mailing Tube Small", length: 12, width: 3, height: 3, strength: "single-wall", type: "mailing tube", quantity_available: 200, cost: 1.6 },
    { sku: "BX10039", name: "Flat Mailer Extra Large", length: 24, width: 18, height: 1.5, strength: "double-wall", type: "flat mailer", quantity_available: 40, cost: 4.6 },
    { sku: "BX10040", name: "Mailing Tube Small", length: 18, width: 3, height: 3, strength: "double-wall", type: "mailing tube", quantity_available: 180, cost: 2.2 },
    { sku: "BX10041", name: "Flat Mailer Medium", length: 14, width: 10, height: 1, strength: "single-wall", type: "flat mailer", quantity_available: 250, cost: 2.2 },
    { sku: "BX10042", name: "Mailing Tube Large", length: 36, width: 5, height: 5, strength: "double-wall", type: "mailing tube", quantity_available: 100, cost: 3.2 },
    { sku: "BX10043", name: "Flat Mailer Large", length: 18, width: 12, height: 1, strength: "triple-wall", type: "flat mailer", quantity_available: 80, cost: 3.7 },
    { sku: "BX10044", name: "Mailing Tube Large", length: 36, width: 4, height: 5, strength: "double-wall", type: "mailing tube", quantity_available: 120, cost: 3.3 },
    { sku: "BX10045", name: "Standard Box Extra Large", length: 25, width: 20, height: 18, strength: "triple-wall", type: "standard", quantity_available: 60, cost: 12.0 },
    { sku: "BX10046", name: "Standard Box Small", length: 10, width: 8, height: 6, strength: "double-wall", type: "standard", quantity_available: 90, cost: 3.2 },
    { sku: "BX10047", name: "Mailing Tube Extra Large", length: 48, width: 6, height: 6, strength: "triple-wall", type: "mailing tube", quantity_available: 30, cost: 4.8 },
    { sku: "BX10048", name: "Flat Mailer Medium", length: 14, width: 10, height: 1, strength: "double-wall", type: "flat mailer", quantity_available: 210, cost: 2.5 },
    { sku: "BX10049", name: "Flat Mailer Extra Small", length: 8, width: 6, height: 0.5, strength: "single-wall", type: "flat mailer", quantity_available: 380, cost: 0.8 },
    { sku: "BX10050", name: "Mailing Tube Small", length: 12, width: 2, height: 2, strength: "single-wall", type: "mailing tube", quantity_available: 250, cost: 1.5 },
];
const packingMaterials = [
    {
        name: "Bubble Wrap",
        type: "wrapping",
        unit: "feet",
        calculation_formula: "length * width (in feet)",
        cost_per_unit: 0.2,
    },
    {
        name: "Packing Peanuts",
        type: "filling",
        unit: "oz",
        calculation_formula: "weight (in ounces)",
        cost_per_unit: 0.05,
    },
];


const seed = async () => {
    try {
        await connectDb();

        await Box.deleteMany({});
        await PackingMaterial.deleteMany({});

        await Box.insertMany(boxes);
        await PackingMaterial.insertMany(packingMaterials);
        console.log("Sample data seeded successfully");

    } catch (error) {
        console.error("Something went wrong ehile seeding the database", error);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
        console.log("Database connection closed");
        process.exit(0);
    }
}

seed();

