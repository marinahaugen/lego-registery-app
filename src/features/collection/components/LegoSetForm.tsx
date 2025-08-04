import React, { useEffect, useState } from "react";
import {
    Alert,
    Box,
    Button,
    Checkbox,
    CircularProgress,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { LegoSetEnum, LegoSetType } from "../types";
import { LegoSetService } from "../services/legoSetService";

interface LegoSetFormProps {
    onSuccess?: (legoSet: any) => void;
    onError?: (error: string) => void;
}

const initialBaseData = {
    setNumber: "",
    name: "",
    pieceCount: 0,
    ageGroup: "",
    price: 0,
    hasBuilt: true,
};

const initialPlantDetails = {
    plantType: "rose" as const,
    height: 0,
    vaseIncluded: true,
};

const initialVehicleDetails = {
    vehicleType: "car" as const,
    brand: "",
    model: "",
};

const initialBuildingDetails = {
    buildingType: "residential" as const,
    floors: 1,
    furnished: false,
};

type FormData = {
    setNumber: string;
    name: string;
    pieceCount: number;
    ageGroup: string;
    price: number;
    hasBuilt: boolean;
    type: LegoSetEnum;
    details: any;
};

export const LegoSetForm: React.FC<LegoSetFormProps> = (
    { onSuccess, onError },
) => {
    const [formData, setFormData] = useState<FormData>({
        ...initialBaseData,
        type: LegoSetEnum.PLANTS,
        details: initialPlantDetails,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    // Reset details when type changes
    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            details: getInitialDetailsForType(prev.type),
        }));
        setErrors({});
        setSubmitError(null);
    }, [formData.type]);

    const getInitialDetailsForType = (type: LegoSetEnum) => {
        switch (type) {
            case LegoSetEnum.PLANTS:
                return initialPlantDetails;
            case LegoSetEnum.VEHICLES:
                return initialVehicleDetails;
            case LegoSetEnum.BUILDINGS:
                return initialBuildingDetails;
            default:
                return initialPlantDetails;
        }
    };

    const handleBaseFieldChange = (field: string, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
        // Clear error for this field
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }));
        }
    };

    const handleDetailsFieldChange = (field: string, value: any) => {
        setFormData((prev) => ({
            ...prev,
            details: {
                ...prev.details,
                [field]: value,
            },
        }));
        // Clear error for this field
        if (errors[`details.${field}`]) {
            setErrors((prev) => ({ ...prev, [`details.${field}`]: "" }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        // Validate base fields
        if (!formData.setNumber.trim()) {
            newErrors.setNumber = "Set number is required";
        }
        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }
        if (formData.pieceCount <= 0) {
            newErrors.pieceCount = "Piece count must be positive";
        }
        if (!formData.ageGroup.trim()) {
            newErrors.ageGroup = "Age group is required";
        }
        if (formData.price <= 0) {
            newErrors.price = "Price must be positive";
        }

        // Validate type-specific details
        switch (formData.type) {
            case LegoSetEnum.PLANTS:
                if (formData.details.height <= 0) {
                    newErrors["details.height"] = "Height must be positive";
                }
                break;
            case LegoSetEnum.VEHICLES:
                // Vehicle details are mostly optional
                break;
            case LegoSetEnum.BUILDINGS:
                if (formData.details.floors <= 0) {
                    newErrors["details.floors"] =
                        "Number of floors must be positive";
                }
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const legoSetData = formData as LegoSetType;
            const result = await LegoSetService.createLegoSet(legoSetData);

            // Reset form
            setFormData({
                ...initialBaseData,
                type: LegoSetEnum.PLANTS,
                details: initialPlantDetails,
            });
            setErrors({});

            onSuccess?.(result);
        } catch (error) {
            const errorMessage = error instanceof Error
                ? error.message
                : "An unexpected error occurred";
            setSubmitError(errorMessage);
            onError?.(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderPlantDetails = () => (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                    <InputLabel>Plant Type</InputLabel>
                    <Select
                        value={formData.details.plantType}
                        onChange={(e) =>
                            handleDetailsFieldChange(
                                "plantType",
                                e.target.value,
                            )}
                        label="Plant Type"
                    >
                        <MenuItem value="rose">Rose</MenuItem>
                        <MenuItem value="sunflower">Sunflower</MenuItem>
                        <MenuItem value="orchid">Orchid</MenuItem>
                        <MenuItem value="cactus">Cactus</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                    fullWidth
                    label="Height (cm)"
                    type="number"
                    value={formData.details.height}
                    onChange={(e) =>
                        handleDetailsFieldChange(
                            "height",
                            Number(e.target.value),
                        )}
                    error={!!errors["details.height"]}
                    helperText={errors["details.height"]}
                />
            </Grid>
            <Grid size={{ xs: 12 }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={formData.details.vaseIncluded}
                            onChange={(e) =>
                                handleDetailsFieldChange(
                                    "vaseIncluded",
                                    e.target.checked,
                                )}
                        />
                    }
                    label="Vase Included"
                />
            </Grid>
        </Grid>
    );

    const renderVehicleDetails = () => (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                    <InputLabel>Vehicle Type</InputLabel>
                    <Select
                        value={formData.details.vehicleType}
                        onChange={(e) =>
                            handleDetailsFieldChange(
                                "vehicleType",
                                e.target.value,
                            )}
                        label="Vehicle Type"
                    >
                        <MenuItem value="car">Car</MenuItem>
                        <MenuItem value="boat">Boat</MenuItem>
                        <MenuItem value="plane">Plane</MenuItem>
                        <MenuItem value="train">Train</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                    fullWidth
                    label="Brand (optional)"
                    value={formData.details.brand}
                    onChange={(e) =>
                        handleDetailsFieldChange("brand", e.target.value)}
                />
            </Grid>
            <Grid size={{ xs: 12 }}>
                <TextField
                    fullWidth
                    label="Model (optional)"
                    value={formData.details.model}
                    onChange={(e) =>
                        handleDetailsFieldChange("model", e.target.value)}
                />
            </Grid>
        </Grid>
    );

    const renderBuildingDetails = () => (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                    <InputLabel>Building Type</InputLabel>
                    <Select
                        value={formData.details.buildingType}
                        onChange={(e) =>
                            handleDetailsFieldChange(
                                "buildingType",
                                e.target.value,
                            )}
                        label="Building Type"
                    >
                        <MenuItem value="residential">Residential</MenuItem>
                        <MenuItem value="historical">Historical</MenuItem>
                        <MenuItem value="fantasy">Fantasy</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                    fullWidth
                    label="Number of Floors"
                    type="number"
                    value={formData.details.floors}
                    onChange={(e) =>
                        handleDetailsFieldChange(
                            "floors",
                            Number(e.target.value),
                        )}
                    error={!!errors["details.floors"]}
                    helperText={errors["details.floors"]}
                />
            </Grid>
            <Grid size={{ xs: 12 }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={formData.details.furnished}
                            onChange={(e) =>
                                handleDetailsFieldChange(
                                    "furnished",
                                    e.target.checked,
                                )}
                        />
                    }
                    label="Furnished"
                />
            </Grid>
        </Grid>
    );

    const renderTypeSpecificDetails = () => {
        switch (formData.type) {
            case LegoSetEnum.PLANTS:
                return renderPlantDetails();
            case LegoSetEnum.VEHICLES:
                return renderVehicleDetails();
            case LegoSetEnum.BUILDINGS:
                return renderBuildingDetails();
            default:
                return null;
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
            <Typography variant="h5" component="h2" gutterBottom>
                Add LEGO Set to Collection
            </Typography>

            {submitError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {submitError}
                </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} noValidate>
                {/* Base Fields */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Set Number"
                            value={formData.setNumber}
                            onChange={(e) =>
                                handleBaseFieldChange(
                                    "setNumber",
                                    e.target.value,
                                )}
                            error={!!errors.setNumber}
                            helperText={errors.setNumber}
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <FormControl fullWidth>
                            <InputLabel>Type</InputLabel>
                            <Select
                                value={formData.type}
                                onChange={(e) =>
                                    handleBaseFieldChange(
                                        "type",
                                        e.target.value,
                                    )}
                                label="Type"
                            >
                                <MenuItem value={LegoSetEnum.PLANTS}>
                                    Plants
                                </MenuItem>
                                <MenuItem value={LegoSetEnum.VEHICLES}>
                                    Vehicles
                                </MenuItem>
                                <MenuItem value={LegoSetEnum.BUILDINGS}>
                                    Buildings
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Name"
                            value={formData.name}
                            onChange={(e) =>
                                handleBaseFieldChange("name", e.target.value)}
                            error={!!errors.name}
                            helperText={errors.name}
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Piece Count"
                            type="number"
                            value={formData.pieceCount}
                            onChange={(e) =>
                                handleBaseFieldChange(
                                    "pieceCount",
                                    Number(e.target.value),
                                )}
                            error={!!errors.pieceCount}
                            helperText={errors.pieceCount}
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Age Group"
                            value={formData.ageGroup}
                            onChange={(e) =>
                                handleBaseFieldChange(
                                    "ageGroup",
                                    e.target.value,
                                )}
                            error={!!errors.ageGroup}
                            helperText={errors.ageGroup}
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Price (NOK)"
                            type="number"
                            value={formData.price}
                            onChange={(e) =>
                                handleBaseFieldChange(
                                    "price",
                                    Number(e.target.value),
                                )}
                            error={!!errors.price}
                            helperText={errors.price}
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formData.hasBuilt}
                                    onChange={(e) =>
                                        handleBaseFieldChange(
                                            "hasBuilt",
                                            e.target.checked,
                                        )}
                                />
                            }
                            label="Has Built"
                        />
                    </Grid>
                </Grid>

                {/* Type-Specific Details */}
                <Typography variant="h6" gutterBottom>
                    {formData.type.charAt(0).toUpperCase() +
                        formData.type.slice(1)} Details
                </Typography>
                <Box sx={{ mb: 3 }}>
                    {renderTypeSpecificDetails()}
                </Box>

                {/* Submit Button */}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting}
                        startIcon={isSubmitting
                            ? <CircularProgress size={20} />
                            : null}
                    >
                        {isSubmitting ? "Adding..." : "Add LEGO Set"}
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};
