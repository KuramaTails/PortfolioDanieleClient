import { Box } from "@mui/material";
import React, { useState } from "react";
import ImageDetailsMain from "./ImageDetailsMain/ImageDetailsMain";
import ImageDetailsGallery from "./ImageDetailsGallery/ImageDetailsGallery";

function ImageDetails({ project, moreDetail, isOpen, setOpen }) {
  const [isFaded, setFade] = useState(false);
  const { frontImage, images, name, completeProjects } = project;
  let frontImageIndex = images.findIndex((image) => image === frontImage);

  let imageInfo = completeProjects.map(
    (image) => image.imageInfo && image.imageInfo
  );
  return (
    <Box
      sx={{ position: "relative", top: "-100%", left: 0, width: 1, height: 1 }}
    >
      <ImageDetailsMain
        moreDetail={moreDetail}
        isFaded={isFaded}
        setFade={setFade}
        frontInfo = {imageInfo[frontImageIndex]}
        name={name}
        isOpen={isOpen}
        setOpen={setOpen}
      />
      {isFaded && (
        <ImageDetailsGallery
          project={project}
          setFade={setFade}
          imageInfo={imageInfo}
          isOpen={isOpen}
          setOpen={setOpen}
        />
      )}
    </Box>
  );
}

export default ImageDetails;
