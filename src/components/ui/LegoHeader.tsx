import React from "react";
import {
    AppBar,
    Avatar,
    Badge,
    Box,
    Button,
    IconButton,
    Toolbar,
    Typography,
} from "@mui/material";
import { LEGO_COLORS } from "../../styles/legoTheme";

interface LegoHeaderProps {
    user?: {
        name: string;
        email: string;
        avatar?: string;
    };
    onLogin?: () => void;
    onLogout?: () => void;
    onProfile?: () => void;
    collectionCount?: number;
    buildableSetsCount?: number;
}

const LegoHeader: React.FC<LegoHeaderProps> = ({
    user,
    onLogin,
    onLogout,
    onProfile,
    collectionCount = 0,
    buildableSetsCount = 0,
}) => {
    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: LEGO_COLORS.blue,
                borderBottom: `4px solid ${LEGO_COLORS.black}`,
                boxShadow: "0 4px 0px rgba(0,0,0,0.8)",
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                {/* Logo and Brand */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    {/* LEGO Head Icon */}
                    <Box
                        sx={{
                            width: 48,
                            height: 48,
                            backgroundColor: LEGO_COLORS.yellow,
                            border: `3px solid ${LEGO_COLORS.black}`,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "2px 2px 0px rgba(0,0,0,0.8)",
                            position: "relative",
                            "&::before": {
                                content: '""',
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: 24,
                                height: 24,
                                backgroundColor: LEGO_COLORS.black,
                                borderRadius: "50%",
                                boxShadow:
                                    "inset 2px 2px 4px rgba(255,255,255,0.3)",
                            },
                        }}
                    />

                    {/* BRICKSTORE Text */}
                    <Box>
                        <Typography
                            variant="h4"
                            sx={{
                                color: "#ffffff",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                textShadow: "2px 2px 0px rgba(0,0,0,0.8)",
                                letterSpacing: "0.1em",
                                lineHeight: 1,
                            }}
                        >
                            BRICKSTORE
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{
                                color: LEGO_COLORS.yellow,
                                fontWeight: 600,
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                                display: "block",
                                mt: -0.5,
                            }}
                        >
                            En verden bygget av klosser
                        </Typography>
                    </Box>
                </Box>

                {/* Navigation and Stats */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    {/* Collection Stats */}
                    {user && (
                        <>
                            <Box
                                sx={{
                                    backgroundColor: LEGO_COLORS.yellow,
                                    border: `2px solid ${LEGO_COLORS.black}`,
                                    borderRadius: 1,
                                    px: 2,
                                    py: 1,
                                    textAlign: "center",
                                    boxShadow: "2px 2px 0px rgba(0,0,0,0.8)",
                                }}
                            >
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: LEGO_COLORS.black,
                                        fontWeight: 700,
                                        textTransform: "uppercase",
                                        display: "block",
                                        fontSize: "0.7rem",
                                    }}
                                >
                                    Samling
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: LEGO_COLORS.black,
                                        fontWeight: 700,
                                        lineHeight: 1,
                                    }}
                                >
                                    {collectionCount}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    backgroundColor: LEGO_COLORS.red,
                                    border: `2px solid ${LEGO_COLORS.black}`,
                                    borderRadius: 1,
                                    px: 2,
                                    py: 1,
                                    textAlign: "center",
                                    boxShadow: "2px 2px 0px rgba(0,0,0,0.8)",
                                }}
                            >
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: "#ffffff",
                                        fontWeight: 700,
                                        textTransform: "uppercase",
                                        display: "block",
                                        fontSize: "0.7rem",
                                    }}
                                >
                                    Kan bygge
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: "#ffffff",
                                        fontWeight: 700,
                                        lineHeight: 1,
                                    }}
                                >
                                    {buildableSetsCount}
                                </Typography>
                            </Box>
                        </>
                    )}

                    {/* User Section */}
                    {user
                        ? (
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                }}
                            >
                                <IconButton
                                    onClick={onProfile}
                                    sx={{
                                        backgroundColor: LEGO_COLORS.beige,
                                        border:
                                            `2px solid ${LEGO_COLORS.black}`,
                                        boxShadow:
                                            "2px 2px 0px rgba(0,0,0,0.8)",
                                        "&:hover": {
                                            backgroundColor: "#f3e8ff",
                                            transform: "translate(-1px, -1px)",
                                            boxShadow:
                                                "3px 3px 0px rgba(0,0,0,0.8)",
                                        },
                                    }}
                                >
                                    <Avatar
                                        sx={{
                                            width: 32,
                                            height: 32,
                                            backgroundColor: LEGO_COLORS.blue,
                                            color: "#ffffff",
                                            fontWeight: 700,
                                            fontSize: "0.875rem",
                                        }}
                                    >
                                        {user.name.charAt(0).toUpperCase()}
                                    </Avatar>
                                </IconButton>
                                <Button
                                    onClick={onLogout}
                                    sx={{
                                        backgroundColor: LEGO_COLORS.red,
                                        color: "#ffffff",
                                        border:
                                            `2px solid ${LEGO_COLORS.black}`,
                                        borderRadius: 1,
                                        px: 2,
                                        py: 1,
                                        fontWeight: 700,
                                        textTransform: "uppercase",
                                        fontSize: "0.75rem",
                                        boxShadow:
                                            "2px 2px 0px rgba(0,0,0,0.8)",
                                        "&:hover": {
                                            backgroundColor: "#b91c1c",
                                            transform: "translate(-1px, -1px)",
                                            boxShadow:
                                                "3px 3px 0px rgba(0,0,0,0.8)",
                                        },
                                    }}
                                >
                                    Logg ut
                                </Button>
                            </Box>
                        )
                        : (
                            <Button
                                onClick={onLogin}
                                sx={{
                                    backgroundColor: LEGO_COLORS.red,
                                    color: "#ffffff",
                                    border: `3px solid ${LEGO_COLORS.black}`,
                                    borderRadius: 1,
                                    px: 3,
                                    py: 1.5,
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    fontSize: "0.875rem",
                                    boxShadow: "3px 3px 0px rgba(0,0,0,0.8)",
                                    "&:hover": {
                                        backgroundColor: "#b91c1c",
                                        transform: "translate(-1px, -1px)",
                                        boxShadow:
                                            "4px 4px 0px rgba(0,0,0,0.8)",
                                    },
                                }}
                            >
                                🔒 Logg inn
                            </Button>
                        )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default LegoHeader;
