import { createTheme } from "@mui/material/styles";

const theme = {
  default: createTheme({
    palette: {
      primary: {
        main: "#293C56",
        text: "#EDF1F8",
      },
      secondary: {
        main: "#6C7C93",
        text: "#EDF1F8",
      },
      tertiary: {
        main: "#334B6C",
        text: "#EDF1F8",
      },
    },
    typography: {
      fontFamily: `"Montserrat", sans-serif`
    },
    components: {
      MuiTabs: {
        styleOverrides: {
          scroller: {
            height: "100%",
          },
          flexContainer: {
            height: "100%",
          },
          indicator: {
            backgroundColor: "#EDF1F8",
            height: 1,
          },
        },
      },
    },
  }),
};

export default theme;
