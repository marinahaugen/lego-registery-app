import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { LegoSetList } from "./LegoSetList";
import { useLegoSets } from "../hooks/useLegoSets";
import { LegoSetEnum } from "../types";

// Mock the useLegoSets hook
vi.mock("../hooks/useLegoSets", () => ({
    useLegoSets: vi.fn(),
}));

// Mock Material-UI components
vi.mock("@mui/material", () => ({
    Box: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    Card: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    CardContent: ({ children, ...props }: any) => (
        <div {...props}>{children}</div>
    ),
    Typography: (
        { children, variant, component, gutterBottom, ...props }: any,
    ) => {
        const Component = component || "div";
        return <Component {...props}>{children}</Component>;
    },
    Grid: (
        { children, container, item, spacing, xs, sm, md, ...props }: any,
    ) => <div {...props}>{children}</div>,
    Chip: ({ label, color, size, variant, ...props }: any) => (
        <span {...props}>{label}</span>
    ),
    CircularProgress: ({ ...props }: any) => <div {...props}>Loading...</div>,
    Alert: ({ children, severity, sx, ...props }: any) => (
        <div role="alert" {...props}>{children}</div>
    ),
    Paper: ({ children, sx, ...props }: any) => (
        <div {...props}>{children}</div>
    ),
}));

const mockUseLegoSets = vi.mocked(useLegoSets);

describe("LegoSetList", () => {
    it("shows loading state", () => {
        mockUseLegoSets.mockReturnValue({
            legoSets: [],
            error: null,
            isLoading: true,
            addLegoSet: vi.fn(),
            updateLegoSet: vi.fn(),
            deleteLegoSet: vi.fn(),
            mutate: vi.fn(),
        });

        render(<LegoSetList />);
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("shows error state", () => {
        const error = new Error("Failed to fetch");
        mockUseLegoSets.mockReturnValue({
            legoSets: [],
            error,
            isLoading: false,
            addLegoSet: vi.fn(),
            updateLegoSet: vi.fn(),
            deleteLegoSet: vi.fn(),
            mutate: vi.fn(),
        });

        render(<LegoSetList />);
        expect(screen.getByText("Failed to load LEGO sets: Failed to fetch"))
            .toBeInTheDocument();
    });

    it("shows empty state when no sets", () => {
        mockUseLegoSets.mockReturnValue({
            legoSets: [],
            error: null,
            isLoading: false,
            addLegoSet: vi.fn(),
            updateLegoSet: vi.fn(),
            deleteLegoSet: vi.fn(),
            mutate: vi.fn(),
        });

        render(<LegoSetList />);
        expect(screen.getByText("No LEGO sets in your collection yet."))
            .toBeInTheDocument();
        expect(screen.getByText("Add your first set using the form above!"))
            .toBeInTheDocument();
    });

    it("renders LEGO sets correctly", () => {
        const mockSets = [
            {
                id: "1",
                set_number: "10280",
                name: "Flower Bouquet",
                piece_count: 756,
                age_group: "18+",
                price: 49.99,
                has_built: true,
                type: LegoSetEnum.PLANTS,
                details: {
                    plantType: "rose",
                    height: 30,
                    vaseIncluded: true,
                },
                created_at: "2024-01-01T00:00:00Z",
                updated_at: "2024-01-01T00:00:00Z",
            },
            {
                id: "2",
                set_number: "10290",
                name: "Pickup Truck",
                piece_count: 1677,
                age_group: "18+",
                price: 119.99,
                has_built: false,
                type: LegoSetEnum.VEHICLES,
                details: {
                    vehicleType: "car",
                    brand: "Ford",
                    model: "F-150",
                },
                created_at: "2024-01-02T00:00:00Z",
                updated_at: "2024-01-02T00:00:00Z",
            },
        ];

        mockUseLegoSets.mockReturnValue({
            legoSets: mockSets,
            error: null,
            isLoading: false,
            addLegoSet: vi.fn(),
            updateLegoSet: vi.fn(),
            deleteLegoSet: vi.fn(),
            mutate: vi.fn(),
        });

        render(<LegoSetList />);

        expect(screen.getByText("Your LEGO Collection (2 sets)"))
            .toBeInTheDocument();
        expect(screen.getByText("Flower Bouquet")).toBeInTheDocument();
        expect(screen.getByText("Pickup Truck")).toBeInTheDocument();
        expect(screen.getByText("Set #10280")).toBeInTheDocument();
        expect(screen.getByText("Set #10290")).toBeInTheDocument();
        expect(screen.getByText("756 pieces")).toBeInTheDocument();
        expect(screen.getByText("1677 pieces")).toBeInTheDocument();
        expect(screen.getByText("49.99 NOK")).toBeInTheDocument();
        expect(screen.getByText("119.99 NOK")).toBeInTheDocument();
        expect(screen.getAllByText("Age: 18+")).toHaveLength(2);
    });

    it("displays correct type information for plants", () => {
        const mockSets = [
            {
                id: "1",
                set_number: "10280",
                name: "Flower Bouquet",
                piece_count: 756,
                age_group: "18+",
                price: 49.99,
                has_built: true,
                type: LegoSetEnum.PLANTS,
                details: {
                    plantType: "sunflower",
                    height: 25,
                    vaseIncluded: false,
                },
                created_at: "2024-01-01T00:00:00Z",
                updated_at: "2024-01-01T00:00:00Z",
            },
        ];

        mockUseLegoSets.mockReturnValue({
            legoSets: mockSets,
            error: null,
            isLoading: false,
            addLegoSet: vi.fn(),
            updateLegoSet: vi.fn(),
            deleteLegoSet: vi.fn(),
            mutate: vi.fn(),
        });

        render(<LegoSetList />);
        expect(screen.getByText("sunflower (25cm)")).toBeInTheDocument();
    });

    it("displays correct type information for vehicles", () => {
        const mockSets = [
            {
                id: "1",
                set_number: "10290",
                name: "Pickup Truck",
                piece_count: 1677,
                age_group: "18+",
                price: 119.99,
                has_built: false,
                type: LegoSetEnum.VEHICLES,
                details: {
                    vehicleType: "car",
                    brand: "Ford",
                    model: "F-150",
                },
                created_at: "2024-01-01T00:00:00Z",
                updated_at: "2024-01-01T00:00:00Z",
            },
        ];

        mockUseLegoSets.mockReturnValue({
            legoSets: mockSets,
            error: null,
            isLoading: false,
            addLegoSet: vi.fn(),
            updateLegoSet: vi.fn(),
            deleteLegoSet: vi.fn(),
            mutate: vi.fn(),
        });

        render(<LegoSetList />);
        expect(screen.getByText("car - Ford")).toBeInTheDocument();
    });

    it("displays correct type information for buildings", () => {
        const mockSets = [
            {
                id: "1",
                set_number: "10278",
                name: "Police Station",
                piece_count: 743,
                age_group: "18+",
                price: 199.99,
                has_built: true,
                type: LegoSetEnum.BUILDINGS,
                details: {
                    buildingType: "residential",
                    floors: 3,
                    furnished: true,
                },
                created_at: "2024-01-01T00:00:00Z",
                updated_at: "2024-01-01T00:00:00Z",
            },
        ];

        mockUseLegoSets.mockReturnValue({
            legoSets: mockSets,
            error: null,
            isLoading: false,
            addLegoSet: vi.fn(),
            updateLegoSet: vi.fn(),
            deleteLegoSet: vi.fn(),
            mutate: vi.fn(),
        });

        render(<LegoSetList />);
        expect(screen.getByText("residential (3 floors)")).toBeInTheDocument();
    });
});
