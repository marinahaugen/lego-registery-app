import { supabase } from "../../../lib/supabaseClient";
import { LegoSetRow, legoSetSchema, LegoSetType } from "../types";

export class LegoSetService {
    /**
     * Create a new LEGO set
     */
    static async createLegoSet(legoSet: LegoSetType): Promise<LegoSetRow> {
        // Validate the data
        const validatedData = legoSetSchema.parse(legoSet);

        // Transform to database format
        const dbData = {
            set_number: validatedData.setNumber,
            name: validatedData.name,
            piece_count: validatedData.pieceCount,
            age_group: validatedData.ageGroup,
            price: validatedData.price,
            has_built: validatedData.hasBuilt,
            type: validatedData.type,
            details: validatedData.details,
        };

        const { data, error } = await supabase
            .from("lego_sets")
            .insert(dbData)
            .select()
            .single();

        if (error) {
            throw new Error(`Failed to create LEGO set: ${error.message}`);
        }

        return data;
    }

    /**
     * Get all LEGO sets
     */
    static async getAllLegoSets(): Promise<LegoSetRow[]> {
        const { data, error } = await supabase
            .from("lego_sets")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            throw new Error(`Failed to fetch LEGO sets: ${error.message}`);
        }

        return data || [];
    }

    /**
     * Get LEGO set by ID
     */
    static async getLegoSetById(id: string): Promise<LegoSetRow | null> {
        const { data, error } = await supabase
            .from("lego_sets")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            if (error.code === "PGRST116") {
                return null; // Not found
            }
            throw new Error(`Failed to fetch LEGO set: ${error.message}`);
        }

        return data;
    }

    /**
     * Update LEGO set
     */
    static async updateLegoSet(
        id: string,
        legoSet: Partial<LegoSetType>,
    ): Promise<LegoSetRow> {
        // Validate the data if type is provided
        if (legoSet.type) {
            legoSetSchema.parse(legoSet);
        }

        // Transform to database format
        const dbData: Partial<LegoSetRow> = {};

        if (legoSet.setNumber) dbData.set_number = legoSet.setNumber;
        if (legoSet.name) dbData.name = legoSet.name;
        if (legoSet.pieceCount) dbData.piece_count = legoSet.pieceCount;
        if (legoSet.ageGroup) dbData.age_group = legoSet.ageGroup;
        if (legoSet.price) dbData.price = legoSet.price;
        if (legoSet.hasBuilt !== undefined) dbData.has_built = legoSet.hasBuilt;
        if (legoSet.type) dbData.type = legoSet.type;
        if (legoSet.details) dbData.details = legoSet.details;

        const { data, error } = await supabase
            .from("lego_sets")
            .update(dbData)
            .eq("id", id)
            .select()
            .single();

        if (error) {
            throw new Error(`Failed to update LEGO set: ${error.message}`);
        }

        return data;
    }

    /**
     * Delete LEGO set
     */
    static async deleteLegoSet(id: string): Promise<void> {
        const { error } = await supabase
            .from("lego_sets")
            .delete()
            .eq("id", id);

        if (error) {
            throw new Error(`Failed to delete LEGO set: ${error.message}`);
        }
    }

    /**
     * Get LEGO sets by type
     */
    static async getLegoSetsByType(type: string): Promise<LegoSetRow[]> {
        const { data, error } = await supabase
            .from("lego_sets")
            .select("*")
            .eq("type", type)
            .order("created_at", { ascending: false });

        if (error) {
            throw new Error(
                `Failed to fetch LEGO sets by type: ${error.message}`,
            );
        }

        return data || [];
    }
}
