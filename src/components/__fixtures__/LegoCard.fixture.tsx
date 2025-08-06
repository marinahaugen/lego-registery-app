import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Box, Grid, Stack } from "@mui/material";
import { legoTheme } from "../../styles/legoTheme";
import LegoCard from "../ui/LegoCard";
import LegoButton from "../ui/LegoButton";

export default {
    "Collection Card": () => (
        <ThemeProvider theme={legoTheme}>
            <Box
                sx={{
                    p: 4,
                    backgroundColor: legoTheme.palette.background.default,
                }}
            >
                <LegoCard
                    title="Min Samling"
                    subtitle="LEGO Collection"
                    description="Hold oversikt over dine LEGO-sett og se hvor mange brikker du eier."
                    variant="collection"
                    stats={[
                        { label: "Sett", value: "15" },
                        { label: "Brikker", value: "2,847" },
                    ]}
                    tags={["Collection", "Overview"]}
                    actions={
                        <Stack direction="row" spacing={1}>
                            <LegoButton variant="primary" size="small">
                                View All
                            </LegoButton>
                            <LegoButton variant="secondary" size="small">
                                Add Set
                            </LegoButton>
                        </Stack>
                    }
                />
            </Box>
        </ThemeProvider>
    ),

    "Set Card": () => (
        <ThemeProvider theme={legoTheme}>
            <Box
                sx={{
                    p: 4,
                    backgroundColor: legoTheme.palette.background.default,
                }}
            >
                <LegoCard
                    title="Millennium Falcon"
                    subtitle="Set #75192"
                    description="The ultimate LEGO Star Wars set with over 7,500 pieces."
                    variant="set"
                    stats={[
                        { label: "Pieces", value: "7,541" },
                        { label: "Age", value: "16+" },
                    ]}
                    progress={75}
                    progressLabel="Build Progress"
                    tags={["Star Wars", "UCS", "Spaceship"]}
                    actions={
                        <Stack direction="row" spacing={1}>
                            <LegoButton variant="primary" size="small">
                                Continue
                            </LegoButton>
                            <LegoButton variant="secondary" size="small">
                                Details
                            </LegoButton>
                        </Stack>
                    }
                />
            </Box>
        </ThemeProvider>
    ),

    "Part Card": () => (
        <ThemeProvider theme={legoTheme}>
            <Box
                sx={{
                    p: 4,
                    backgroundColor: legoTheme.palette.background.default,
                }}
            >
                <LegoCard
                    title="2x4 Brick"
                    subtitle="Part #3001"
                    description="Standard 2x4 LEGO brick in red color."
                    variant="part"
                    stats={[
                        { label: "Quantity", value: "42" },
                        { label: "Color", value: "Red" },
                    ]}
                    tags={["Brick", "Red", "Standard"]}
                    actions={
                        <Stack direction="row" spacing={1}>
                            <LegoButton variant="primary" size="small">
                                Use in Build
                            </LegoButton>
                            <LegoButton variant="secondary" size="small">
                                Find Sets
                            </LegoButton>
                        </Stack>
                    }
                />
            </Box>
        </ThemeProvider>
    ),

    "All Variants": () => (
        <ThemeProvider theme={legoTheme}>
            <Box
                sx={{
                    p: 4,
                    backgroundColor: legoTheme.palette.background.default,
                }}
            >
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <LegoCard
                            title="Collection"
                            description="Collection variant with blue accent"
                            variant="collection"
                            stats={[{ label: "Count", value: "5" }]}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <LegoCard
                            title="Set"
                            description="Set variant with red accent"
                            variant="set"
                            stats={[{ label: "Pieces", value: "1,234" }]}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <LegoCard
                            title="Part"
                            description="Part variant with beige background"
                            variant="part"
                            stats={[{ label: "Quantity", value: "25" }]}
                        />
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider>
    ),

    "With Progress": () => (
        <ThemeProvider theme={legoTheme}>
            <Box
                sx={{
                    p: 4,
                    backgroundColor: legoTheme.palette.background.default,
                }}
            >
                <Stack spacing={3}>
                    <LegoCard
                        title="Build Progress"
                        description="Different progress states"
                        progress={25}
                        progressLabel="25% Complete"
                        variant="set"
                    />
                    <LegoCard
                        title="Build Progress"
                        description="Different progress states"
                        progress={50}
                        progressLabel="50% Complete"
                        variant="set"
                    />
                    <LegoCard
                        title="Build Progress"
                        description="Different progress states"
                        progress={100}
                        progressLabel="100% Complete"
                        variant="set"
                    />
                </Stack>
            </Box>
        </ThemeProvider>
    ),

    "Interactive Card": () => {
        const [clicked, setClicked] = React.useState(false);

        return (
            <ThemeProvider theme={legoTheme}>
                <Box
                    sx={{
                        p: 4,
                        backgroundColor: legoTheme.palette.background.default,
                    }}
                >
                    <LegoCard
                        title={clicked ? "Card Clicked!" : "Clickable Card"}
                        description="This card is interactive. Click it to see the state change."
                        variant="collection"
                        onClick={() => setClicked(!clicked)}
                        stats={[
                            { label: "Clicks", value: clicked ? "1" : "0" },
                        ]}
                    />
                </Box>
            </ThemeProvider>
        );
    },

    "Complex Card": () => (
        <ThemeProvider theme={legoTheme}>
            <Box
                sx={{
                    p: 4,
                    backgroundColor: legoTheme.palette.background.default,
                }}
            >
                <LegoCard
                    title="Complex LEGO Set"
                    subtitle="Modular Building"
                    description="A detailed modular building with multiple floors, intricate details, and a comprehensive parts list. This set represents the pinnacle of LEGO architecture."
                    variant="set"
                    progress={85}
                    progressLabel="Assembly Progress"
                    stats={[
                        { label: "Pieces", value: "3,847", color: "#16a34a" },
                        { label: "Floors", value: "4", color: "#1982C4" },
                        { label: "Minifigs", value: "8", color: "#D62828" },
                    ]}
                    tags={[
                        "Modular",
                        "Architecture",
                        "Expert",
                        "Limited Edition",
                    ]}
                    actions={
                        <Stack direction="row" spacing={1}>
                            <LegoButton
                                variant="primary"
                                size="small"
                                icon="🏗️"
                                iconPosition="left"
                            >
                                Continue Build
                            </LegoButton>
                            <LegoButton
                                variant="secondary"
                                size="small"
                                icon="📋"
                                iconPosition="left"
                            >
                                Instructions
                            </LegoButton>
                            <LegoButton
                                variant="warning"
                                size="small"
                                icon="⚠️"
                                iconPosition="left"
                            >
                                Missing Parts
                            </LegoButton>
                        </Stack>
                    }
                />
            </Box>
        </ThemeProvider>
    ),
};
