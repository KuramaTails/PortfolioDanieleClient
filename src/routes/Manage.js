import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import Main from "../components/manageComponents/Main";
import theme from "../themes/index";

function Home({isAuthenticated}) {
  if (isAuthenticated) {
    return (
      <ThemeProvider theme={theme.default}>
        <CssBaseline />
        <Main />
      </ThemeProvider>
    );
  } else {
    return (<div>You are not logged in. <a href="/login">Click here to log in.</a></div>)
  }
  
}

export default Home;
