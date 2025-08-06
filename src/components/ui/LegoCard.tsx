import React from "react";
import {
    Box,
    Card,
    CardActions,
    CardContent,
    Chip,
    Typography,
} from "@mui/material";
import { LEGO_COLORS } from "../../styles/legoTheme";

interface LegoCardProps {
    title: string;
    subtitle?: string;
    description?: string;
    stats?: {
        label: string;
        value: string | number;
        color?: string;
    }[];
    tags?: string[];
    actions?: React.ReactNode;
    onClick?: () => void;
    variant?: "default" | "collection" | "set" | "part";
    progress?: number;
    progressLabel?: string;
}

const LegoCard: React.FC<LegoCardProps> = ({
    title,
    subtitle,
    description,
    stats,
    tags,
    actions,
    onClick,
    variant = "default",
    progress,
    progressLabel,
}) => {
    const getVariantColors = () => {
        switch (variant) {
            case "collection":
                return {
                    accent: LEGO_COLORS.blue,
                    background: LEGO_COLORS.yellow,
                };
            case "set":
                return {
                    accent: LEGO_COLORS.red,
                    background: LEGO_COLORS.yellow,
                };
            case "part":
                return {
                    accent: LEGO_COLORS.blue,
                    background: LEGO_COLORS.beige,
                };
            default:
                return {
                    accent: LEGO_COLORS.red,
                    background: LEGO_COLORS.yellow,
                };
        }
    };

    const colors = getVariantColors();

    return (
        <Card
            sx={{
                backgroundColor: colors.background,
                border: `3px solid ${LEGO_COLORS.black}`,
                borderRadius: 2,
                boxShadow: "4px 4px 0px rgba(0,0,0,0.8)",
                transition: "all 0.2s ease-in-out",
                cursor: onClick ? "pointer" : "default",
                position: "relative",
                overflow: "visible",
                "&:hover": {
                    transform: onClick ? "translate(-2px, -2px)" : "none",
                    boxShadow: onClick
                        ? "6px 6px 0px rgba(0,0,0,0.8)"
                        : "4px 4px 0px rgba(0,0,0,0.8)",
                },
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: -2,
                    left: -2,
                    right: -2,
                    bottom: -2,
                    background:
                        `linear-gradient(45deg, ${colors.accent} 0%, transparent 30%, transparent 70%, ${colors.accent} 100%)`,
                    borderRadius: 2,
                    zIndex: -1,
                    opacity: 0.3,
                },
            }}
            onClick={onClick}
        >
            {/* LEGO Studs Pattern */}
            <Box
                sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    display: "flex",
                    gap: 0.5,
                    zIndex: 1,
                }}
            >
                {[1, 2, 3, 4].map((i) => (
                    <Box
                        key={i}
                        sx={{
                            width: 8,
                            height: 8,
                            backgroundColor: LEGO_COLORS.black,
                            borderRadius: "50%",
                            boxShadow:
                                "inset 1px 1px 2px rgba(255,255,255,0.3)",
                        }}
                    />
                ))}
            </Box>

            <CardContent sx={{ p: 3, pt: 4 }}>
                {/* Title */}
                <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                        color: LEGO_COLORS.black,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        mb: subtitle ? 1 : 2,
                        textShadow: "1px 1px 0px rgba(255,255,255,0.8)",
                    }}
                >
                    {title}
                </Typography>

                {/* Subtitle */}
                {subtitle && (
                    <Typography
                        variant="body2"
                        sx={{
                            color: LEGO_COLORS.black,
                            fontWeight: 600,
                            mb: 2,
                            opacity: 0.8,
                        }}
                    >
                        {subtitle}
                    </Typography>
                )}

                {/* Description */}
                {description && (
                    <Typography
                        variant="body2"
                        sx={{
                            color: LEGO_COLORS.black,
                            mb: 2,
                            lineHeight: 1.4,
                        }}
                    >
                        {description}
                    </Typography>
                )}

                {/* Progress Bar */}
                {progress !== undefined && (
                    <Box sx={{ mb: 2 }}>
                        {progressLabel && (
                            <Typography
                                variant="caption"
                                sx={{
                                    color: LEGO_COLORS.black,
                                    fontWeight: 600,
                                    textTransform: "uppercase",
                                    display: "block",
                                    mb: 0.5,
                                }}
                            >
                                {progressLabel}
                            </Typography>
                        )}
                        <Box
                            sx={{
                                width: "100%",
                                height: 12,
                                backgroundColor: LEGO_COLORS.beige,
                                border: `2px solid ${LEGO_COLORS.black}`,
                                borderRadius: 1,
                                overflow: "hidden",
                                position: "relative",
                            }}
                        >
                            <Box
                                sx={{
                                    width: `${
                                        Math.min(100, Math.max(0, progress))
                                    }%`,
                                    height: "100%",
                                    backgroundColor: colors.accent,
                                    transition: "width 0.3s ease-in-out",
                                }}
                            />
                        </Box>
                    </Box>
                )}

                {/* Stats */}
                {stats && stats.length > 0 && (
                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                            mb: 2,
                            flexWrap: "wrap",
                        }}
                    >
                        {stats.map((stat, index) => (
                            <Box
                                key={index}
                                sx={{
                                    backgroundColor: stat.color ||
                                        colors.accent,
                                    color: "#ffffff",
                                    px: 1.5,
                                    py: 0.5,
                                    borderRadius: 1,
                                    border: `2px solid ${LEGO_COLORS.black}`,
                                    textAlign: "center",
                                    minWidth: 60,
                                }}
                            >
                                <Typography
                                    variant="caption"
                                    sx={{
                                        display: "block",
                                        fontWeight: 700,
                                        textTransform: "uppercase",
                                        fontSize: "0.7rem",
                                    }}
                                >
                                    {stat.label}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: 700,
                                        fontSize: "0.9rem",
                                    }}
                                >
                                    {stat.value}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                )}

                {/* Tags */}
                {tags && tags.length > 0 && (
                    <Box
                        sx={{
                            display: "flex",
                            gap: 0.5,
                            mb: 2,
                            flexWrap: "wrap",
                        }}
                    >
                        {tags.map((tag, index) => (
                            <Chip
                                key={index}
                                label={tag}
                                size="small"
                                sx={{
                                    backgroundColor: LEGO_COLORS.beige,
                                    border: `1px solid ${LEGO_COLORS.black}`,
                                    fontWeight: 600,
                                    textTransform: "uppercase",
                                    fontSize: "0.7rem",
                                    "& .MuiChip-label": {
                                        px: 1,
                                    },
                                }}
                            />
                        ))}
                    </Box>
                )}
            </CardContent>

            {/* Actions */}
            {actions && (
                <CardActions
                    sx={{
                        p: 2,
                        pt: 0,
                        borderTop: `2px solid ${LEGO_COLORS.black}`,
                        backgroundColor: LEGO_COLORS.beige,
                    }}
                >
                    {actions}
                </CardActions>
            )}
        </Card>
    );
};

export default LegoCard;
