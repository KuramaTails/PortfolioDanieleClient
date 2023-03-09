import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import Main from "../components/loginComponents/Main";
import theme from "../themes/index";

function Login({setIsAuthenticated}) {
    return (
        <ThemeProvider theme={theme.default}>
          <CssBaseline />
          <Main setIsAuthenticated={setIsAuthenticated}/>
        </ThemeProvider>
      );
}

export default Login

