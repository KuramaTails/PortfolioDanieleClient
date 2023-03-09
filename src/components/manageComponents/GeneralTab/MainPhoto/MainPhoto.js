import { Box, Button } from "@mui/material";
import React, { useLayoutEffect, useState } from "react";
import * as styles from "./styles";

function MainPhoto({ showModal, availableImages, currentImages, category }) {
  const [frontImage, setfrontImage] = useState(null);

  useLayoutEffect(() => {
    if (currentImages) {
      let frontImageId = currentImages[String(category).toLowerCase()];
      let newFrontImage = availableImages.filter((image) => {
        if (image._id === frontImageId) return image;
      });
      setfrontImage(newFrontImage[0]);
    }
  }, [currentImages, category]);

  return (
    <Box component={"form"} sx={styles.formWrapper}>
      <Box
        sx={styles.content}
        style={{
          background: `no-repeat center center url(${
            frontImage && frontImage.image
          })`,
        }}
      >
        <Button sx={{bgcolor:"white"}} onClick={showModal}>Edit</Button>
      </Box>
    </Box>
  );
}

export default MainPhoto;
