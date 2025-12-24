import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { useState, useMemo } from "react";
import { ColorModeContext } from "./ThemeContext";
import { toast } from "react-hot-toast";

export default function AppThemeProvider({ children }) {
  const [mode, setMode] = useState(
    () => localStorage.getItem("themeMode") || "light"
  );

  const toggleColorMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
    toast.success(`Switched to ${newMode} mode`);
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "light" ? "#1976d2" : "#90caf9",
          },
          ...(mode === "dark" && {
            background: {
              default: "#121212",
              paper: "#1e1e1e",
            },
          }),
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={{ toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
