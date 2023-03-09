import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box } from "@mui/material";
import React from "react";
import * as styles from "./styles";

function ImageInfo({ hoverButton, setHoverButton, imageInfo, variant }) {
  return (
    <Box
      sx={styles.wrapper}
      style={{ height: variant === "carousel" ? 0.5 : 1 }}
    >
      <Box
        onMouseEnter={() => hoverButton === 1 && setHoverButton(1)}
        onMouseLeave={() => hoverButton === 1 && setHoverButton(0)}
        component="ul"
        sx={styles.secondWrapper}
        style={{ opacity: hoverButton }}
      >
        {imageInfo}
      </Box>
      <Box
        onMouseEnter={() => setHoverButton(1)}
        onMouseLeave={() => setHoverButton(0)}
        component="span"
        sx={styles.thirdWrapper}
        style={{
          background: hoverButton === 1 ? "" : "rgba(0,0,0,0.7)",
        }}
      >
        <FontAwesomeIcon
          icon={faCamera}
          size={"lg"}
          style={{
            opacity: 1,
            transition: "opacity 1s ease",
          }}
        />
      </Box>
    </Box>
  );
}

export default ImageInfo;
