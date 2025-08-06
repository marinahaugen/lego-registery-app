import React from "react";
import { Box, Button, ButtonProps } from "@mui/material";
import { LEGO_COLORS } from "../../styles/legoTheme";

interface LegoButtonProps extends Omit<ButtonProps, "variant"> {
    variant?: "primary" | "secondary" | "success" | "warning";
    size?: "small" | "medium" | "large";
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
}

const LegoButton: React.FC<LegoButtonProps> = ({
    children,
    variant = "primary",
    size = "medium",
    icon,
    iconPosition = "left",
    sx,
    ...props
}) => {
    const getVariantStyles = () => {
        switch (variant) {
            case "primary":
                return {
                    backgroundColor: LEGO_COLORS.red,
                    color: "#ffffff",
                    "&:hover": {
                        backgroundColor: "#b91c1c",
                    },
                };
            case "secondary":
                return {
                    backgroundColor: LEGO_COLORS.blue,
                    color: "#ffffff",
                    "&:hover": {
                        backgroundColor: "#0c4a6e",
                    },
                };
            case "success":
                return {
                    backgroundColor: "#16a34a",
                    color: "#ffffff",
                    "&:hover": {
                        backgroundColor: "#15803d",
                    },
                };
            case "warning":
                return {
                    backgroundColor: LEGO_COLORS.yellow,
                    color: LEGO_COLORS.black,
                    "&:hover": {
                        backgroundColor: "#eab308",
                    },
                };
            default:
                return {
                    backgroundColor: LEGO_COLORS.red,
                    color: "#ffffff",
                    "&:hover": {
                        backgroundColor: "#b91c1c",
                    },
                };
        }
    };

    const getSizeStyles = () => {
        switch (size) {
            case "small":
                return {
                    px: 2,
                    py: 1,
                    fontSize: "0.875rem",
                    minHeight: 36,
                };
            case "large":
                return {
                    px: 4,
                    py: 2,
                    fontSize: "1.125rem",
                    minHeight: 56,
                };
            default:
                return {
                    px: 3,
                    py: 1.5,
                    fontSize: "1rem",
                    minHeight: 44,
                };
        }
    };

    return (
        <Button
            variant="contained"
            sx={{
                ...getVariantStyles(),
                ...getSizeStyles(),
                border: `3px solid ${LEGO_COLORS.black}`,
                borderRadius: 1,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                boxShadow: "4px 4px 0px rgba(0,0,0,0.8)",
                transition: "all 0.2s ease-in-out",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                    ...getVariantStyles()["&:hover"],
                    transform: "translate(-2px, -2px)",
                    boxShadow: "6px 6px 0px rgba(0,0,0,0.8)",
                },
                "&:active": {
                    transform: "translate(1px, 1px)",
                    boxShadow: "2px 2px 0px rgba(0,0,0,0.8)",
                },
                "&:disabled": {
                    backgroundColor: "#9ca3af",
                    color: "#6b7280",
                    transform: "none",
                    boxShadow: "2px 2px 0px rgba(0,0,0,0.8)",
                },
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                        "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
                    transform: "translateX(-100%)",
                    transition: "transform 0.3s ease-in-out",
                },
                "&:hover::before": {
                    transform: "translateX(100%)",
                },
                ...sx,
            }}
            {...props}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    position: "relative",
                    zIndex: 1,
                }}
            >
                {icon && iconPosition === "left" && (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "1.2em",
                        }}
                    >
                        {icon}
                    </Box>
                )}
                <span>{children}</span>
                {icon && iconPosition === "right" && (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "1.2em",
                        }}
                    >
                        {icon}
                    </Box>
                )}
            </Box>
        </Button>
    );
};

export default LegoButton;
