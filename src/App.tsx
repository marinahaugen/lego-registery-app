import React, { useState } from "react";
import "./App.css";
import {
  Alert,
  Box,
  Container,
  createTheme,
  CssBaseline,
  Snackbar,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { SWRConfig } from "swr";
import { LegoSetForm } from "./features/collection/components/LegoSetForm";
import { LegoSetList } from "./features/collection/components/LegoSetList";
import { LegoSetRow } from "./features/collection/types";

// Create a theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

function App() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSuccess = (legoSet: LegoSetRow) => {
    setSuccessMessage(
      `Successfully added ${legoSet.name} (${legoSet.set_number}) to your collection!`,
    );
  };

  const handleError = (error: string) => {
    setErrorMessage(error);
  };

  const handleCloseSuccess = () => {
    setSuccessMessage(null);
  };

  const handleCloseError = () => {
    setErrorMessage(null);
  };

  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h2" component="h1" gutterBottom>
              LEGO Collection Registry
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
              Track and manage your LEGO sets with ease
            </Typography>
          </Box>

          <LegoSetForm
            onSuccess={handleSuccess}
            onError={handleError}
          />

          <LegoSetList />

          {/* Success Snackbar */}
          <Snackbar
            open={!!successMessage}
            autoHideDuration={6000}
            onClose={handleCloseSuccess}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleCloseSuccess}
              severity="success"
              sx={{ width: "100%" }}
            >
              {successMessage}
            </Alert>
          </Snackbar>

          {/* Error Snackbar */}
          <Snackbar
            open={!!errorMessage}
            autoHideDuration={6000}
            onClose={handleCloseError}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleCloseError}
              severity="error"
              sx={{ width: "100%" }}
            >
              {errorMessage}
            </Alert>
          </Snackbar>
        </Container>
      </ThemeProvider>
    </SWRConfig>
  );
}

export default App;
