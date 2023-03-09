import React from "react";
import * as styles from "./styles";
import { Box } from "@mui/system";

function Navbar({ size, onClick }) {
  const { currentComponent } = size;
  let arrButtons = ["home", "work", "abMe"];
  return (
    <Box sx={styles.AppBar}>
      {arrButtons.map((part, index) => (
        <Box
          key={index}
          onClick={() => {
            currentComponent !== index && onClick(index);
          }}
          sx={
            currentComponent === index
              ? { ...styles.circle, ...styles.active }
              : { ...styles.circle }
          }
        ></Box>
      ))}
    </Box>
  );
}

export default Navbar;
