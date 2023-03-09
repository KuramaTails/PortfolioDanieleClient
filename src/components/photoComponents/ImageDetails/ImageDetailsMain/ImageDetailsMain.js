import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import ImageInfo from "../../../common/ImageInfo";
import * as styles from "./styles";

function ImageDetailsMain({
  moreDetail,
  isFaded,
  setFade,
  frontInfo,
  name,
  isOpen,
  setOpen,
}) {
  const [hoverButton, setHoverButton] = useState(0);
  let frontInfoElems = Object.keys(frontInfo).map((info, index) => (
    <Box component="li" key={`frontImage${index}`}>
      {info} : {frontInfo[info]}
    </Box>
  ));
  return (
    <Box
      sx={styles.wrapper}
      style={{
        opacity: moreDetail ? moreDetail : 0,
        transform: isFaded ? "translateY(-100%)" : "translateY(0%)",
      }}
    >
      <Box sx={{ fontSize: "2rem" }}>{name}</Box>
      <Box sx={styles.secondWrapper}>
        <Box sx={styles.thirdWrapper}>
          <Button
            onClick={() => setOpen(!isOpen, setFade(true))}
            sx={styles.button}
          >
            Enter
          </Button>
        </Box>
        <ImageInfo
          hoverButton={hoverButton}
          setHoverButton={setHoverButton}
          imageInfo={frontInfoElems}
          variant={"main"}
        />
      </Box>
    </Box>
  );
}

export default ImageDetailsMain;
