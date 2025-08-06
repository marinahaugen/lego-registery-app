import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Box, Stack } from "@mui/material";
import { legoTheme } from "../../styles/legoTheme";
import LegoButton from "../ui/LegoButton";

export default {
    "Primary Button": () => (
        <ThemeProvider theme={legoTheme}>
            <Box
                sx={{
                    p: 4,
                    backgroundColor: legoTheme.palette.background.default,
                }}
            >
                <LegoButton variant="primary">
                    Primary Button
                </LegoButton>
            </Box>
        </ThemeProvider>
    ),

    "Secondary Button": () => (
        <ThemeProvider theme={legoTheme}>
            <Box
                sx={{
                    p: 4,
                    backgroundColor: legoTheme.palette.background.default,
                }}
            >
                <LegoButton variant="secondary">
                    Secondary Button
                </LegoButton>
            </Box>
        </ThemeProvider>
    ),

    "Success Button": () => (
        <ThemeProvider theme={legoTheme}>
            <Box
                sx={{
                    p: 4,
                    backgroundColor: legoTheme.palette.background.default,
                }}
            >
                <LegoButton variant="success">
                    Success Button
                </LegoButton>
            </Box>
        </ThemeProvider>
    ),

    "Warning Button": () => (
        <ThemeProvider theme={legoTheme}>
            <Box
                sx={{
                    p: 4,
                    backgroundColor: legoTheme.palette.background.default,
                }}
            >
                <LegoButton variant="warning">
                    Warning Button
                </LegoButton>
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
                <Stack direction="row" spacing={2} flexWrap="wrap" gap={2}>
                    <LegoButton variant="primary">Primary</LegoButton>
                    <LegoButton variant="secondary">Secondary</LegoButton>
                    <LegoButton variant="success">Success</LegoButton>
                    <LegoButton variant="warning">Warning</LegoButton>
                </Stack>
            </Box>
        </ThemeProvider>
    ),

    "All Sizes": () => (
        <ThemeProvider theme={legoTheme}>
            <Box
                sx={{
                    p: 4,
                    backgroundColor: legoTheme.palette.background.default,
                }}
            >
                <Stack direction="row" spacing={2} alignItems="center">
                    <LegoButton variant="primary" size="small">
                        Small
                    </LegoButton>
                    <LegoButton variant="primary" size="medium">
                        Medium
                    </LegoButton>
                    <LegoButton variant="primary" size="large">
                        Large
                    </LegoButton>
                </Stack>
            </Box>
        </ThemeProvider>
    ),

    "With Icons": () => (
        <ThemeProvider theme={legoTheme}>
            <Box
                sx={{
                    p: 4,
                    backgroundColor: legoTheme.palette.background.default,
                }}
            >
                <Stack direction="row" spacing={2} flexWrap="wrap" gap={2}>
                    <LegoButton variant="primary" icon="🔒" iconPosition="left">
                        Login
                    </LegoButton>
                    <LegoButton
                        variant="secondary"
                        icon="➕"
                        iconPosition="right"
                    >
                        Add Set
                    </LegoButton>
                    <LegoButton variant="success" icon="✅" iconPosition="left">
                        Save
                    </LegoButton>
                    <LegoButton
                        variant="warning"
                        icon="⚠️"
                        iconPosition="right"
                    >
                        Warning
                    </LegoButton>
                </Stack>
            </Box>
        </ThemeProvider>
    ),

    "Disabled State": () => (
        <ThemeProvider theme={legoTheme}>
            <Box
                sx={{
                    p: 4,
                    backgroundColor: legoTheme.palette.background.default,
                }}
            >
                <Stack direction="row" spacing={2}>
                    <LegoButton variant="primary" disabled>
                        Disabled Primary
                    </LegoButton>
                    <LegoButton variant="secondary" disabled>
                        Disabled Secondary
                    </LegoButton>
                </Stack>
            </Box>
        </ThemeProvider>
    ),

    "Interactive States": () => {
        const [clicked, setClicked] = React.useState(false);

        return (
            <ThemeProvider theme={legoTheme}>
                <Box
                    sx={{
                        p: 4,
                        backgroundColor: legoTheme.palette.background.default,
                    }}
                >
                    <Stack spacing={2}>
                        <LegoButton
                            variant="primary"
                            onClick={() => setClicked(!clicked)}
                        >
                            {clicked ? "Clicked!" : "Click Me"}
                        </LegoButton>
                        <div>Click count: {clicked ? "1" : "0"}</div>
                    </Stack>
                </Box>
            </ThemeProvider>
        );
    },
};
