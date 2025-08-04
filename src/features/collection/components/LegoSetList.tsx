import React from "react";
import {
    Alert,
    Box,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Grid,
    Paper,
    Typography,
} from "@mui/material";
import { useLegoSets } from "../hooks/useLegoSets";
import { LegoSetEnum } from "../types";

export const LegoSetList: React.FC = () => {
    const { legoSets, error, isLoading } = useLegoSets();

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" p={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ m: 2 }}>
                Failed to load LEGO sets: {error.message}
            </Alert>
        );
    }

    if (legoSets.length === 0) {
        return (
            <Paper sx={{ p: 3, textAlign: "center" }}>
                <Typography variant="h6" color="text.secondary">
                    No LEGO sets in your collection yet.
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                >
                    Add your first set using the form above!
                </Typography>
            </Paper>
        );
    }

    const getTypeColor = (type: LegoSetEnum) => {
        switch (type) {
            case LegoSetEnum.PLANTS:
                return "success";
            case LegoSetEnum.VEHICLES:
                return "primary";
            case LegoSetEnum.BUILDINGS:
                return "warning";
            default:
                return "default";
        }
    };

    const formatDetails = (type: LegoSetEnum, details: any) => {
        switch (type) {
            case LegoSetEnum.PLANTS:
                return `${details.plantType} (${details.height}cm)`;
            case LegoSetEnum.VEHICLES:
                return `${details.vehicleType}${
                    details.brand ? ` - ${details.brand}` : ""
                }`;
            case LegoSetEnum.BUILDINGS:
                return `${details.buildingType} (${details.floors} floors)`;
            default:
                return "";
        }
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Your LEGO Collection ({legoSets.length} sets)
            </Typography>
            <Grid container spacing={3}>
                {legoSets.map((legoSet) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={legoSet.id}>
                        <Card>
                            <CardContent>
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="flex-start"
                                    mb={1}
                                >
                                    <Typography
                                        variant="h6"
                                        component="h3"
                                        noWrap
                                    >
                                        {legoSet.name}
                                    </Typography>
                                    <Chip
                                        label={legoSet.type}
                                        color={getTypeColor(
                                            legoSet.type,
                                        ) as any}
                                        size="small"
                                    />
                                </Box>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    Set #{legoSet.set_number}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {formatDetails(
                                        legoSet.type,
                                        legoSet.details,
                                    )}
                                </Typography>
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Typography variant="body2">
                                        {legoSet.piece_count} pieces
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        fontWeight="bold"
                                    >
                                        {legoSet.price} NOK
                                    </Typography>
                                </Box>
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    mt={1}
                                >
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Age: {legoSet.age_group}
                                    </Typography>
                                    <Chip
                                        label={legoSet.has_built
                                            ? "Built"
                                            : "Not Built"}
                                        color={legoSet.has_built
                                            ? "success"
                                            : "default"}
                                        size="small"
                                        variant="outlined"
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
