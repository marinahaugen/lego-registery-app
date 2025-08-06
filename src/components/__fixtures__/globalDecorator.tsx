import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { legoTheme } from "../../styles/legoTheme";

export default function GlobalDecorator(
    { children }: { children: React.ReactNode },
) {
    return (
        <ThemeProvider theme={legoTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}
