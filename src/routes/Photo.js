import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { useLocation } from "react-router-dom";
import Main from "../components/photoComponents/Main";
import theme from "../themes/index";

function Photo() {
  if (window.scrollY !== "0") window.scrollTo(0, 0);
  const location = useLocation();
  let { state } = location;
  let bgImage = state && state.bgImage;
  return (
    <ThemeProvider theme={theme.default}>
      <CssBaseline />
      <Main bgImage={bgImage} />
    </ThemeProvider>
  );
}

export default Photo;
