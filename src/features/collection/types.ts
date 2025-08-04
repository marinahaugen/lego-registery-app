import { z } from "zod";

// LEGO Set Type Enum
export enum LegoSetEnum {
    PLANTS = "plants",
    VEHICLES = "vehicles",
    BUILDINGS = "buildings",
}

// Base LEGO Set Schema
export const baseLegoSetSchema = z.object({
    setNumber: z.string().min(1, "Set number is required"),
    name: z.string().min(1, "Name is required"),
    pieceCount: z.number().positive("Piece count must be positive"),
    ageGroup: z.string().min(1, "Age group is required"),
    price: z.number().positive("Price must be positive"),
    hasBuilt: z.boolean().default(true),
});

export type BaseLegoSetType = z.infer<typeof baseLegoSetSchema>;

// Plant Set Schema
export const plantSetSchema = baseLegoSetSchema.extend({
    type: z.literal(LegoSetEnum.PLANTS),
    details: z.object({
        plantType: z.enum(["rose", "sunflower", "orchid", "cactus"], {
            error: "Plant type is required",
        }),
        height: z.number().positive("Height must be positive"),
        vaseIncluded: z.boolean().default(true),
    }),
});

// Vehicle Set Schema
export const vehicleSetSchema = baseLegoSetSchema.extend({
    type: z.literal(LegoSetEnum.VEHICLES),
    details: z.object({
        vehicleType: z.enum(["car", "boat", "plane", "train"], {
            error: "Vehicle type is required",
        }),
        brand: z.string().optional(),
        model: z.string().optional(),
    }),
});

// Building Set Schema
export const buildingSetSchema = baseLegoSetSchema.extend({
    type: z.literal(LegoSetEnum.BUILDINGS),
    details: z.object({
        buildingType: z.enum(["residential", "historical", "fantasy"], {
            error: "Building type is required",
        }),
        floors: z.number().positive("Number of floors must be positive"),
        furnished: z.boolean(),
    }),
});

// Union type for all LEGO set schemas
export const legoSetSchema = z.discriminatedUnion("type", [
    plantSetSchema,
    vehicleSetSchema,
    buildingSetSchema,
]);

export type LegoSetType = z.infer<typeof legoSetSchema>;

// Database types
export interface LegoSetRow {
    id: string;
    set_number: string;
    name: string;
    piece_count: number;
    age_group: string;
    price: number;
    has_built: boolean;
    type: LegoSetEnum;
    details: Record<string, any>;
    created_at: string;
    updated_at: string;
}

// Form data types
export interface LegoSetFormData {
    setNumber: string;
    name: string;
    pieceCount: number;
    ageGroup: string;
    price: number;
    hasBuilt: boolean;
    type: LegoSetEnum;
    details: Record<string, any>;
}

// Plant set form data
export interface PlantSetFormData
    extends Omit<LegoSetFormData, "type" | "details"> {
    type: LegoSetEnum.PLANTS;
    details: {
        plantType: "rose" | "sunflower" | "orchid" | "cactus";
        height: number;
        vaseIncluded: boolean;
    };
}

// Vehicle set form data
export interface VehicleSetFormData
    extends Omit<LegoSetFormData, "type" | "details"> {
    type: LegoSetEnum.VEHICLES;
    details: {
        vehicleType: "car" | "boat" | "plane" | "train";
        brand?: string;
        model?: string;
    };
}

// Building set form data
export interface BuildingSetFormData
    extends Omit<LegoSetFormData, "type" | "details"> {
    type: LegoSetEnum.BUILDINGS;
    details: {
        buildingType: "residential" | "historical" | "fantasy";
        floors: number;
        furnished: boolean;
    };
}
