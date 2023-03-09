import React, { useEffect, useLayoutEffect, useState } from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import Carousel from "./Carousel/Carousel";
import Thumbnail from "./Thumbnails/Thumbnail";
import * as styles from "./styles";

function ImageDetailsGallery2({
  project,
  imageInfo,
  setFade,
  isOpen,
  setOpen,
}) {
  const [properties, setProperties] = useState({ opacity: 0 });
  const [currentImage, setCurrentImage] = useState(0);
  let imagesInfoElems = imageInfo.map((image, imageIndex) =>
    Object.keys(image).map((info,infoIndex) => (
      <Box component="li" key={"image"+imageIndex+"info" + infoIndex}>
        {info} : {imageInfo[imageIndex][info]}
      </Box>
    ))
  );
  useLayoutEffect(() => {
    setTimeout(() => {
      setProperties({ ...properties, opacity: 1 });
    }, 1000);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      let newImage = currentImage + 1;
      if (newImage > project.images.length - 1) newImage = 0;
      setCurrentImage(newImage);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <Box
      sx={styles.wrapper}
      style={{
        opacity: properties.opacity,
        transition:
          properties.opacity === 1 ? "opacity 1s 1s ease" : "opacity 1s ease",
      }}
    >
      <Box sx={styles.projectTitle}>{project.name}</Box>
      <Box sx={styles.projectSection}>
        <Carousel
          project={project}
          imagesInfo={imagesInfoElems}
          currentImage={currentImage}
          setCurrentImage={setCurrentImage}
        />
        <Thumbnail
          project={project}
          currentImage={currentImage}
          setCurrentImage={setCurrentImage}
        />
      </Box>
      <Box sx={styles.buttonWrapper}>
        <Button
          onClick={() => (
            setProperties({ ...properties, opacity: 0 }),
            setTimeout(() => {
              setFade(false);
              setOpen(!isOpen);
            }, 1000)
          )}
          sx={styles.buttonStyle}
        >
          Go Back
        </Button>
      </Box>
    </Box>
  );
}

export default ImageDetailsGallery2;
