import { Box } from "@mui/system";
import React from "react";

function Fade({ size, translateImage, frontImage }) {
  const { height } = size;

  return (
    <Box
      sx={{
        height: height,
        transition: `transform 2s ease`,
        position: "sticky",
        zIndex: 1,
      }}
      style={{
        transform: `translateY(${translateImage})`,
        background: `linear-gradient(0deg, hsla(190, 50%, 25%, 0.5), hsla(190, 50%, 25%, 0.5)), url(${frontImage}) no-repeat center fixed`,
      }}
    ></Box>
  );
}

export default Fade;
