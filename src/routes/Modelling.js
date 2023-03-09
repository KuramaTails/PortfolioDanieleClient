import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import Main from "../components/modellingComponents/Main";
import theme from "../themes/index";

function Modelling() {
  return (
    <ThemeProvider theme={theme.default}>
      <CssBaseline />
      <Main />
    </ThemeProvider>
  );
}

export default Modelling;
