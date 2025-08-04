import useSWR from "swr";
import { LegoSetService } from "../services/legoSetService";
import { LegoSetRow } from "../types";

const fetcher = () => LegoSetService.getAllLegoSets();

export const useLegoSets = () => {
    const { data: legoSets, error, isLoading, mutate } = useSWR<LegoSetRow[]>(
        "lego-sets",
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
        },
    );

    const addLegoSet = async (legoSet: any) => {
        try {
            const newLegoSet = await LegoSetService.createLegoSet(legoSet);
            // Optimistically update the cache
            mutate(
                (currentSets) => [newLegoSet, ...(currentSets || [])],
                false,
            );
            return newLegoSet;
        } catch (error) {
            // Revalidate on error to ensure cache is correct
            mutate();
            throw error;
        }
    };

    const updateLegoSet = async (id: string, updates: any) => {
        try {
            const updatedLegoSet = await LegoSetService.updateLegoSet(
                id,
                updates,
            );
            // Optimistically update the cache
            mutate(
                (currentSets) =>
                    currentSets?.map((set) =>
                        set.id === id ? updatedLegoSet : set
                    ),
                false,
            );
            return updatedLegoSet;
        } catch (error) {
            // Revalidate on error to ensure cache is correct
            mutate();
            throw error;
        }
    };

    const deleteLegoSet = async (id: string) => {
        try {
            await LegoSetService.deleteLegoSet(id);
            // Optimistically update the cache
            mutate(
                (currentSets) => currentSets?.filter((set) => set.id !== id),
                false,
            );
        } catch (error) {
            // Revalidate on error to ensure cache is correct
            mutate();
            throw error;
        }
    };

    return {
        legoSets: legoSets || [],
        error,
        isLoading,
        addLegoSet,
        updateLegoSet,
        deleteLegoSet,
        mutate,
    };
};
