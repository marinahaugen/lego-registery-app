import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import { legoTheme } from "../../styles/legoTheme";
import LegoHeader from "../ui/LegoHeader";

export default {
    "Logged Out State": () => (
        <ThemeProvider theme={legoTheme}>
            <Box
                sx={{
                    backgroundColor: legoTheme.palette.background.default,
                    minHeight: "100vh",
                }}
            >
                <LegoHeader
                    onLogin={() => console.log("Login clicked")}
                />
            </Box>
        </ThemeProvider>
    ),

    "Logged In State": () => (
        <ThemeProvider theme={legoTheme}>
            <Box
                sx={{
                    backgroundColor: legoTheme.palette.background.default,
                    minHeight: "100vh",
                }}
            >
                <LegoHeader
                    user={{
                        name: "Test User",
                        email: "test@example.com",
                    }}
                    collectionCount={15}
                    buildableSetsCount={8}
                    onLogout={() => console.log("Logout clicked")}
                    onProfile={() => console.log("Profile clicked")}
                />
            </Box>
        </ThemeProvider>
    ),

    "Large Collection": () => (
        <ThemeProvider theme={legoTheme}>
            <Box
                sx={{
                    backgroundColor: legoTheme.palette.background.default,
                    minHeight: "100vh",
                }}
            >
                <LegoHeader
                    user={{
                        name: "LEGO Master",
                        email: "master@lego.com",
                    }}
                    collectionCount={247}
                    buildableSetsCount={156}
                    onLogout={() => console.log("Logout clicked")}
                    onProfile={() => console.log("Profile clicked")}
                />
            </Box>
        </ThemeProvider>
    ),

    "New User": () => (
        <ThemeProvider theme={legoTheme}>
            <Box
                sx={{
                    backgroundColor: legoTheme.palette.background.default,
                    minHeight: "100vh",
                }}
            >
                <LegoHeader
                    user={{
                        name: "New Builder",
                        email: "new@lego.com",
                    }}
                    collectionCount={0}
                    buildableSetsCount={0}
                    onLogout={() => console.log("Logout clicked")}
                    onProfile={() => console.log("Profile clicked")}
                />
            </Box>
        </ThemeProvider>
    ),

    "Interactive Header": () => {
        const [isLoggedIn, setIsLoggedIn] = React.useState(false);
        const [collectionCount, setCollectionCount] = React.useState(0);
        const [buildableCount, setBuildableCount] = React.useState(0);

        const handleLogin = () => {
            setIsLoggedIn(true);
            setCollectionCount(5);
            setBuildableCount(3);
        };

        const handleLogout = () => {
            setIsLoggedIn(false);
            setCollectionCount(0);
            setBuildableCount(0);
        };

        return (
            <ThemeProvider theme={legoTheme}>
                <Box
                    sx={{
                        backgroundColor: legoTheme.palette.background.default,
                        minHeight: "100vh",
                    }}
                >
                    <LegoHeader
                        user={isLoggedIn
                            ? {
                                name: "Interactive User",
                                email: "interactive@lego.com",
                            }
                            : undefined}
                        collectionCount={collectionCount}
                        buildableSetsCount={buildableCount}
                        onLogin={handleLogin}
                        onLogout={handleLogout}
                        onProfile={() => console.log("Profile clicked")}
                    />
                    <Box sx={{ p: 4 }}>
                        <p>
                            Current state:{" "}
                            {isLoggedIn ? "Logged In" : "Logged Out"}
                        </p>
                        <p>Collection: {collectionCount} sets</p>
                        <p>Buildable: {buildableCount} sets</p>
                    </Box>
                </Box>
            </ThemeProvider>
        );
    },
};
