import { createTheme } from "@mui/material/styles";

// LEGO Brand Colors from the branding guide
const LEGO_COLORS = {
    yellow: "#FFCA3A", // LEGO Gul - Bakgrunner, paneler, highlight
    red: "#D62828", // LEGO Rød - Primærknapper, advarsler
    blue: "#1982C4", // LEGO Blå - Sekundærknapper, lenker, header
    black: "#000000", // LEGO Svart - Tekst, outlines, ikonfarge
    beige: "#FAF3E0", // LEGO Beige - Innskrivingsfelt, kort-bakgrunner
} as const;

export const legoTheme = createTheme({
    palette: {
        primary: {
            main: LEGO_COLORS.red,
            light: "#ff6b6b",
            dark: "#b91c1c",
            contrastText: "#ffffff",
        },
        secondary: {
            main: LEGO_COLORS.blue,
            light: "#4dabf7",
            dark: "#0c4a6e",
            contrastText: "#ffffff",
        },
        background: {
            default: LEGO_COLORS.beige,
            paper: LEGO_COLORS.yellow,
        },
        text: {
            primary: LEGO_COLORS.black,
            secondary: "#374151",
        },
        warning: {
            main: LEGO_COLORS.yellow,
            light: "#fef3c7",
            dark: "#d97706",
        },
        error: {
            main: LEGO_COLORS.red,
        },
        info: {
            main: LEGO_COLORS.blue,
        },
    },
    typography: {
        fontFamily: '"Fredoka One", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontFamily: '"Fredoka One", cursive',
            fontWeight: 700,
            fontSize: "2.5rem",
            textTransform: "uppercase",
            textShadow: "2px 2px 0px rgba(0,0,0,0.3)",
        },
        h2: {
            fontFamily: '"Fredoka One", cursive',
            fontWeight: 700,
            fontSize: "2rem",
            textTransform: "uppercase",
            textShadow: "2px 2px 0px rgba(0,0,0,0.3)",
        },
        h3: {
            fontFamily: '"Fredoka One", cursive',
            fontWeight: 700,
            fontSize: "1.75rem",
            textTransform: "uppercase",
        },
        h4: {
            fontFamily: '"Fredoka One", cursive',
            fontWeight: 700,
            fontSize: "1.5rem",
            textTransform: "uppercase",
        },
        h5: {
            fontFamily: '"Fredoka One", cursive',
            fontWeight: 700,
            fontSize: "1.25rem",
            textTransform: "uppercase",
        },
        h6: {
            fontFamily: '"Fredoka One", cursive',
            fontWeight: 700,
            fontSize: "1rem",
            textTransform: "uppercase",
        },
        body1: {
            fontFamily: '"Roboto", sans-serif',
            fontWeight: 400,
            fontSize: "1rem",
        },
        body2: {
            fontFamily: '"Roboto", sans-serif',
            fontWeight: 400,
            fontSize: "0.875rem",
        },
        button: {
            fontFamily: '"Roboto", sans-serif',
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
        },
    },
    shape: {
        borderRadius: 6,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 6,
                    border: `2px solid ${LEGO_COLORS.black}`,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    boxShadow: "3px 3px 0px rgba(0,0,0,0.8)",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                        transform: "translate(-1px, -1px)",
                        boxShadow: "4px 4px 0px rgba(0,0,0,0.8)",
                    },
                    "&:active": {
                        transform: "translate(1px, 1px)",
                        boxShadow: "2px 2px 0px rgba(0,0,0,0.8)",
                    },
                },
                contained: {
                    backgroundColor: LEGO_COLORS.red,
                    color: "#ffffff",
                    "&:hover": {
                        backgroundColor: "#b91c1c",
                    },
                },
                outlined: {
                    backgroundColor: LEGO_COLORS.blue,
                    color: "#ffffff",
                    borderColor: LEGO_COLORS.black,
                    "&:hover": {
                        backgroundColor: "#0c4a6e",
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: LEGO_COLORS.yellow,
                    border: `3px solid ${LEGO_COLORS.black}`,
                    borderRadius: 8,
                    boxShadow: "4px 4px 0px rgba(0,0,0,0.8)",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                        transform: "translate(-2px, -2px)",
                        boxShadow: "6px 6px 0px rgba(0,0,0,0.8)",
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        backgroundColor: LEGO_COLORS.beige,
                        border: `2px solid ${LEGO_COLORS.black}`,
                        borderRadius: 6,
                        "&:hover": {
                            borderColor: LEGO_COLORS.blue,
                        },
                        "&.Mui-focused": {
                            borderColor: LEGO_COLORS.red,
                            borderWidth: "3px",
                        },
                    },
                    "& .MuiInputLabel-root": {
                        color: LEGO_COLORS.black,
                        fontWeight: 600,
                        textTransform: "uppercase",
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: LEGO_COLORS.yellow,
                    border: `2px solid ${LEGO_COLORS.black}`,
                    borderRadius: 8,
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: LEGO_COLORS.blue,
                    borderBottom: `3px solid ${LEGO_COLORS.black}`,
                    boxShadow: "0 4px 0px rgba(0,0,0,0.8)",
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    backgroundColor: LEGO_COLORS.beige,
                    border: `2px solid ${LEGO_COLORS.black}`,
                    borderRadius: 16,
                    fontWeight: 600,
                    textTransform: "uppercase",
                },
            },
        },
    },
});

export { LEGO_COLORS };
