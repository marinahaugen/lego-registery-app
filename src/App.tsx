import React, { useState } from "react";
import "./App.css";
import {
  Alert,
  Box,
  Container,
  CssBaseline,
  Grid,
  Snackbar,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { SWRConfig } from "swr";
import { legoTheme } from "./styles/legoTheme";
import LegoHeader from "./components/ui/LegoHeader";
import LegoCard from "./components/ui/LegoCard";
import LegoButton from "./components/ui/LegoButton";
import { LegoSetForm } from "./features/collection/components/LegoSetForm";
import { LegoSetList } from "./features/collection/components/LegoSetList";
import { LegoSetRow } from "./features/collection/types";

function App() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<
    {
      name: string;
      email: string;
    } | null
  >(null);

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

  const handleLogin = () => {
    // TODO: Implement authentication
    setCurrentUser({
      name: "Test User",
      email: "test@example.com",
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleProfile = () => {
    // TODO: Implement profile navigation
    console.log("Profile clicked");
  };

  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
      }}
    >
      <ThemeProvider theme={legoTheme}>
        <CssBaseline />
        <Box
          sx={{
            minHeight: "100vh",
            backgroundColor: legoTheme.palette.background.default,
          }}
        >
          <LegoHeader
            user={currentUser || undefined}
            onLogin={handleLogin}
            onLogout={handleLogout}
            onProfile={handleProfile}
            collectionCount={5}
            buildableSetsCount={12}
          />

          <Container maxWidth="lg" sx={{ py: 4 }}>
            {!currentUser
              ? (
                // Landing Page / Login
                <Box sx={{ textAlign: "center", py: 8 }}>
                  <Typography variant="h1" component="h1" gutterBottom>
                    🧱 Velkommen til BRICKSTORE
                  </Typography>
                  <Typography
                    variant="h5"
                    color="text.secondary"
                    paragraph
                    sx={{ mb: 4 }}
                  >
                    Bygg med det du har, én kloss om gangen.
                  </Typography>

                  <Grid container spacing={4} sx={{ mb: 6 }}>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <LegoCard
                        title="Min Samling"
                        description="Hold oversikt over dine LEGO-sett og se hvor mange brikker du eier."
                        variant="collection"
                        stats={[
                          { label: "Sett", value: "0" },
                          { label: "Brikker", value: "0" },
                        ]}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <LegoCard
                        title="Kan Bygge"
                        description="Oppdag hvilke nye sett du kan bygge med brikkene du allerede har."
                        variant="set"
                        stats={[
                          { label: "Komplett", value: "0" },
                          { label: "Delvis", value: "0" },
                        ]}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <LegoCard
                        title="Mine Brikker"
                        description="En visuell oversikt over alle brikkene dine, organisert og søkbar."
                        variant="part"
                        stats={[
                          { label: "Typer", value: "0" },
                          { label: "Total", value: "0" },
                        ]}
                      />
                    </Grid>
                  </Grid>

                  <LegoButton
                    variant="primary"
                    size="large"
                    onClick={handleLogin}
                    icon="🔒"
                  >
                    Bli med og bygg din digitale samling
                  </LegoButton>
                </Box>
              )
              : (
                // Main App Content
                <Box>
                  <Box sx={{ textAlign: "center", mb: 4 }}>
                    <Typography variant="h2" component="h1" gutterBottom>
                      Min Samling
                    </Typography>
                    <Typography variant="h5" color="text.secondary" paragraph>
                      Legg til nye sett og hold oversikt over din LEGO-samling
                    </Typography>
                  </Box>

                  <LegoSetForm
                    onSuccess={handleSuccess}
                    onError={handleError}
                  />

                  <LegoSetList />
                </Box>
              )}
          </Container>

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
              sx={{
                width: "100%",
                backgroundColor: legoTheme.palette.success.main,
                color: "#ffffff",
                fontWeight: 600,
                border: `2px solid ${legoTheme.palette.common.black}`,
              }}
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
              sx={{
                width: "100%",
                backgroundColor: legoTheme.palette.error.main,
                color: "#ffffff",
                fontWeight: 600,
                border: `2px solid ${legoTheme.palette.common.black}`,
              }}
            >
              {errorMessage}
            </Alert>
          </Snackbar>
        </Box>
      </ThemeProvider>
    </SWRConfig>
  );
}

export default App;
