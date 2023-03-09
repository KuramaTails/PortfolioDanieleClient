import { Box } from "@mui/material";
import React, { useLayoutEffect, useState } from "react";
import ImageInfo from "../../../../common/ImageInfo";
import * as styles from "./styles";

function Carousel({ project, imagesInfo, currentImage, setCurrentImage }) {
  const [translatePerc, setTranslatePerc] = useState(0);
  const [hoverButton, setHoverButton] = useState(0);

  useLayoutEffect(() => {
    setCurrentImage(currentImage);
    setTranslatePerc(-100 * currentImage);
  }, [currentImage]);

  return (
    <Box sx={styles.wrapper}>
      <Box
        sx={styles.secondWrapper}
        style={{
          transform: `translateX(${translatePerc}%)`,
        }}
      >
        {project &&
          project.completeProjects.map((image, index) => (
            <Box
              key={index}
              onClick={() => setCurrentImage(index)}
              sx={styles.infoWrapper}
              style={{
                background: `no-repeat url(${image.image})`,
                backgroundSize: "cover",
              }}
            >
              <ImageInfo
                hoverButton={hoverButton}
                setHoverButton={setHoverButton}
                imageInfo={imagesInfo[index]}
                variant={"carousel"}
              />
            </Box>
          ))}
      </Box>
    </Box>
  );
}

export default Carousel;
