import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LegoSetForm } from "./LegoSetForm";
import { LegoSetService } from "../services/legoSetService";
import { LegoSetEnum } from "../types";

// Mock the LegoSetService
vi.mock("../services/legoSetService", () => ({
    LegoSetService: {
        createLegoSet: vi.fn(),
    },
}));

// Mock Material-UI components for testing
vi.mock("@mui/material", () => ({
    Box: ({ children, component, ...props }: any) => {
        const Component = component || "div";
        return <Component {...props}>{children}</Component>;
    },
    TextField: (
        { label, value, onChange, error, helperText, required, type, ...props }:
            any,
    ) => (
        <div>
            <label htmlFor={props.id || label}>{label}</label>
            <input
                id={props.id || label}
                value={value}
                onChange={onChange}
                type={type || "text"}
                required={required}
                {...props}
            />
            {error && <span className="error">{helperText}</span>}
        </div>
    ),
    Button: (
        { children, onClick, type, disabled, startIcon, ...props }: any,
    ) => (
        <button onClick={onClick} type={type} disabled={disabled} {...props}>
            {startIcon}
            {children}
        </button>
    ),
    FormControl: ({ children, fullWidth, ...props }: any) => (
        <div {...props}>{children}</div>
    ),
    InputLabel: ({ children, htmlFor, ...props }: any) => (
        <label htmlFor={htmlFor || "type-select"} {...props}>{children}</label>
    ),
    Select: ({ children, value, onChange, label, id, ...props }: any) => (
        <select
            id={id || "type-select"}
            value={value}
            onChange={onChange}
            {...props}
        >
            {children}
        </select>
    ),
    MenuItem: ({ children, value, ...props }: any) => (
        <option value={value} {...props}>{children}</option>
    ),
    FormControlLabel: ({ control, label, ...props }: any) => (
        <label {...props}>
            {control}
            {label}
        </label>
    ),
    Checkbox: ({ checked, onChange, ...props }: any) => (
        <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            {...props}
        />
    ),
    Typography: (
        { children, variant, component, gutterBottom, ...props }: any,
    ) => {
        const Component = component || "div";
        return <Component {...props}>{children}</Component>;
    },
    Paper: ({ children, elevation, sx, ...props }: any) => (
        <div {...props}>{children}</div>
    ),
    Grid: (
        { children, container, item, spacing, xs, sm, sx, ...props }: any,
    ) => <div {...props}>{children}</div>,
    Alert: ({ children, severity, sx, ...props }: any) => (
        <div role="alert" data-severity={severity} {...props}>{children}</div>
    ),
    CircularProgress: ({ size, ...props }: any) => (
        <div {...props}>Loading...</div>
    ),
}));

describe("LegoSetForm", () => {
    const mockCreateLegoSet = vi.mocked(LegoSetService.createLegoSet);
    const user = userEvent.setup();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders the form with all base fields", () => {
        render(<LegoSetForm />);

        expect(screen.getByText("Add LEGO Set to Collection"))
            .toBeInTheDocument();
        expect(screen.getByLabelText("Set Number")).toBeInTheDocument();
        expect(screen.getByLabelText("Name")).toBeInTheDocument();
        expect(screen.getByLabelText("Piece Count")).toBeInTheDocument();
        expect(screen.getByLabelText("Age Group")).toBeInTheDocument();
        expect(screen.getByLabelText("Price (NOK)")).toBeInTheDocument();
        expect(screen.getByLabelText("Has Built")).toBeInTheDocument();
        expect(screen.getByText("Add LEGO Set")).toBeInTheDocument();
    });

    it("shows plant details by default", () => {
        render(<LegoSetForm />);

        expect(screen.getByText("Plants Details")).toBeInTheDocument();
        expect(screen.getByLabelText("Plant Type")).toBeInTheDocument();
        expect(screen.getByLabelText("Height (cm)")).toBeInTheDocument();
        expect(screen.getByLabelText("Vase Included")).toBeInTheDocument();
    });

    it("changes form fields when type is changed to vehicles", async () => {
        render(<LegoSetForm />);

        const typeSelect = screen.getByLabelText("Type");
        await user.selectOptions(typeSelect, LegoSetEnum.VEHICLES);

        expect(screen.getByText("Vehicles Details")).toBeInTheDocument();
        expect(screen.getByLabelText("Vehicle Type")).toBeInTheDocument();
        expect(screen.getByLabelText("Brand (optional)")).toBeInTheDocument();
        expect(screen.getByLabelText("Model (optional)")).toBeInTheDocument();
    });

    it("changes form fields when type is changed to buildings", async () => {
        render(<LegoSetForm />);

        const typeSelect = screen.getByLabelText("Type");
        await user.selectOptions(typeSelect, LegoSetEnum.BUILDINGS);

        expect(screen.getByText("Buildings Details")).toBeInTheDocument();
        expect(screen.getByLabelText("Building Type")).toBeInTheDocument();
        expect(screen.getByLabelText("Number of Floors")).toBeInTheDocument();
        expect(screen.getByLabelText("Furnished")).toBeInTheDocument();
    });

    it("validates required fields", async () => {
        render(<LegoSetForm />);

        const submitButton = screen.getByText("Add LEGO Set");
        await user.click(submitButton);

        // Check for validation errors
        await waitFor(() => {
            expect(screen.getByText("Set number is required"))
                .toBeInTheDocument();
            expect(screen.getByText("Name is required")).toBeInTheDocument();
            expect(screen.getByText("Piece count must be positive"))
                .toBeInTheDocument();
            expect(screen.getByText("Age group is required"))
                .toBeInTheDocument();
            expect(screen.getByText("Price must be positive"))
                .toBeInTheDocument();
        });
    });

    it("submits form successfully with valid data", async () => {
        const mockLegoSet = {
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
        };

        mockCreateLegoSet.mockResolvedValue(mockLegoSet);

        const onSuccess = vi.fn();
        render(<LegoSetForm onSuccess={onSuccess} />);

        // Fill in the form
        await user.type(screen.getByLabelText("Set Number"), "10280");
        await user.type(screen.getByLabelText("Name"), "Flower Bouquet");
        await user.type(screen.getByLabelText("Piece Count"), "756");
        await user.type(screen.getByLabelText("Age Group"), "18+");
        await user.type(screen.getByLabelText("Price (NOK)"), "49.99");
        await user.type(screen.getByLabelText("Height (cm)"), "30");

        const submitButton = screen.getByText("Add LEGO Set");
        await user.click(submitButton);

        await waitFor(() => {
            expect(mockCreateLegoSet).toHaveBeenCalledWith({
                setNumber: "10280",
                name: "Flower Bouquet",
                pieceCount: 756,
                ageGroup: "18+",
                price: 49.99,
                hasBuilt: true,
                type: LegoSetEnum.PLANTS,
                details: {
                    plantType: "rose",
                    height: 30,
                    vaseIncluded: true,
                },
            });
            expect(onSuccess).toHaveBeenCalledWith(mockLegoSet);
        });
    });

    it("handles submission errors", async () => {
        const errorMessage = "Failed to create LEGO set";
        mockCreateLegoSet.mockRejectedValue(new Error(errorMessage));

        const onError = vi.fn();
        render(<LegoSetForm onError={onError} />);

        // Fill in the form
        await user.type(screen.getByLabelText("Set Number"), "10280");
        await user.type(screen.getByLabelText("Name"), "Flower Bouquet");
        await user.type(screen.getByLabelText("Piece Count"), "756");
        await user.type(screen.getByLabelText("Age Group"), "18+");
        await user.type(screen.getByLabelText("Price (NOK)"), "49.99");
        await user.type(screen.getByLabelText("Height (cm)"), "30");

        const submitButton = screen.getByText("Add LEGO Set");
        await user.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
            expect(onError).toHaveBeenCalledWith(errorMessage);
        });
    });

    it("validates plant-specific fields", async () => {
        render(<LegoSetForm />);

        // Fill in base fields
        await user.type(screen.getByLabelText("Set Number"), "10280");
        await user.type(screen.getByLabelText("Name"), "Flower Bouquet");
        await user.type(screen.getByLabelText("Piece Count"), "756");
        await user.type(screen.getByLabelText("Age Group"), "18+");
        await user.type(screen.getByLabelText("Price (NOK)"), "49.99");

        // Set invalid height
        const heightInput = screen.getByLabelText("Height (cm)");
        await user.clear(heightInput);
        await user.type(heightInput, "0");

        const submitButton = screen.getByText("Add LEGO Set");
        await user.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText("Height must be positive"))
                .toBeInTheDocument();
        });
    });

    it("validates building-specific fields", async () => {
        render(<LegoSetForm />);

        // Change to building type
        const typeSelect = screen.getByLabelText("Type");
        await user.selectOptions(typeSelect, LegoSetEnum.BUILDINGS);

        // Fill in base fields
        await user.type(screen.getByLabelText("Set Number"), "10280");
        await user.type(screen.getByLabelText("Name"), "Modular Building");
        await user.type(screen.getByLabelText("Piece Count"), "756");
        await user.type(screen.getByLabelText("Age Group"), "18+");
        await user.type(screen.getByLabelText("Price (NOK)"), "49.99");

        // Set invalid floors
        const floorsInput = screen.getByLabelText("Number of Floors");
        await user.clear(floorsInput);
        await user.type(floorsInput, "0");

        const submitButton = screen.getByText("Add LEGO Set");
        await user.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText("Number of floors must be positive"))
                .toBeInTheDocument();
        });
    });

    it("resets form after successful submission", async () => {
        const mockLegoSet = {
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
        };

        mockCreateLegoSet.mockResolvedValue(mockLegoSet);

        render(<LegoSetForm />);

        // Fill in the form
        await user.type(screen.getByLabelText("Set Number"), "10280");
        await user.type(screen.getByLabelText("Name"), "Flower Bouquet");
        await user.type(screen.getByLabelText("Piece Count"), "756");
        await user.type(screen.getByLabelText("Age Group"), "18+");
        await user.type(screen.getByLabelText("Price (NOK)"), "49.99");
        await user.type(screen.getByLabelText("Height (cm)"), "30");

        const submitButton = screen.getByText("Add LEGO Set");
        await user.click(submitButton);

        await waitFor(() => {
            // Check that form is reset
            expect(screen.getByLabelText("Set Number")).toHaveValue("");
            expect(screen.getByLabelText("Name")).toHaveValue("");
            expect(screen.getByLabelText("Piece Count")).toHaveValue(0);
            expect(screen.getByLabelText("Age Group")).toHaveValue("");
            expect(screen.getByLabelText("Price (NOK)")).toHaveValue(0);
        });
    });

    it("shows loading state during submission", async () => {
        // Mock a delayed response
        mockCreateLegoSet.mockImplementation(() =>
            new Promise((resolve) => setTimeout(() => resolve({} as any), 100))
        );

        render(<LegoSetForm />);

        // Fill in the form
        await user.type(screen.getByLabelText("Set Number"), "10280");
        await user.type(screen.getByLabelText("Name"), "Flower Bouquet");
        await user.type(screen.getByLabelText("Piece Count"), "756");
        await user.type(screen.getByLabelText("Age Group"), "18+");
        await user.type(screen.getByLabelText("Price (NOK)"), "49.99");
        await user.type(screen.getByLabelText("Height (cm)"), "30");

        const submitButton = screen.getByText("Add LEGO Set");
        await user.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText("Adding...")).toBeInTheDocument();
        });
    });
});
