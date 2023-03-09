import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import Main from "../components/homeComponents/Main";
import theme from "../themes/index";

function Home() {
  if (window.scrollY !== "0") window.scrollTo(0, 0);
  return (
    <ThemeProvider theme={theme.default}>
      <CssBaseline />
      <Main />
    </ThemeProvider>
  );
}

export default Home;
