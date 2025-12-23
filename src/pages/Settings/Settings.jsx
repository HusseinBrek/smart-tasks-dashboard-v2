import { Box, Typography, FormControlLabel, Switch } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useColorMode } from "../../theme/ThemeContext";

export default function Settings() {
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();

  const isDark = theme.palette.mode === "dark";

  return (
    <Box sx={{ p: 3, maxWidth: 600 }}>
      <Typography variant="h5" gutterBottom>
        Settings
      </Typography>

      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Theme
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <FormControlLabel
          control={<Switch checked={isDark} onChange={toggleColorMode} />}
          label={isDark ? "Dark" : "Light"}
        />
      </Box>
    </Box>
  );
}
