import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { Box } from "@mui/system";
import { useRect } from "@reach/rect";
import ImageDetails from "../ImageDetails/ImageDetails";
import * as styles from "./styles";

function ImageGallery({
  project,
  translatePerc,
  setTranslatePerc,
  isFullscreen,
  setFullscreen,
  size,
  index,
  onClick,
  isOpen,
  setOpen,
}) {
  const { width } = size;
  const { frontImage, completeProjects } = project;
  const myRef = useRef(null);
  const [bgPosition, setBgPosition] = useState(null);
  const [onFocus, setOnFocus] = useState(false);
  const [moreDetail, setMoreDetail] = useState(null);
  const rect = useRect(myRef);
  let completeFrontImage = completeProjects.find(
    (image) => image._id === frontImage
  );
  useLayoutEffect(() => {
    if (!rect) return;
    let animationId;
    let offset = rect.width / 2;
    const updatePosition = () => {
      if (rect && rect.left < 1920 + offset && rect.left > -offset) {
        let percentage = getPercentage(rect, width);
        setBgPosition(percentage);
        animationId = requestAnimationFrame(updatePosition);
      }
    };
    animationId = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(animationId); // to cancel animation on unmount
  }, [rect, width]);

  useLayoutEffect(() => {
    if (isFullscreen === index) {
      setOnFocus(true);
      setTimeout(() => {
        setMoreDetail(1);
      }, 2000);
    } else {
      setMoreDetail(0);
      if (onFocus) {
        setTimeout(() => {
          setOnFocus(false);
        }, 2000);
      }
    }
  }, [isFullscreen]);

  const getPercentage = useCallback(
    (rect, width) => {
      let calculatedPerc;
      switch (true) {
        case rect.left >= width:
          calculatedPerc = 100;
          break;
        case rect.left <= -(rect.width / 2):
          calculatedPerc = 0;
          break;
        default:
          calculatedPerc = ((rect.left + rect.width / 2) * 100) / width;
          break;
      }

      return parseFloat(calculatedPerc).toFixed(1);
    },
    [width]
  );

  function resizeToFull(event) {
    if (!isOpen && event.target.tagName === "DIV") {
      onClick();
      if (!isFullscreen || isFullscreen !== index) {
        if (translatePerc !== 40 - (index - 1) * 22.5) {
          setTranslatePerc(40 - (index - 1) * 22.5);
        }
        setTimeout(() => {
          setTranslatePerc(-(index - 1) * 22.5);
          setFullscreen(index);
        }, 1500);
      } else {
        setMoreDetail(0);
        setTimeout(() => {
          setFullscreen(null);
          setTimeout(() => {
            setTranslatePerc(40 - (index - 1) * 22.5);
          }, 2000);
        }, 1000);
      }
    }
  }
  return (
    <Box
      onClick={(event) => resizeToFull(event)}
      ref={myRef}
      loading="lazy"
      sx={styles.image}
      style={completeFrontImage && {
        background: `url(${completeFrontImage.image})`,
        backgroundPosition: `${bgPosition ? bgPosition : 100}% 50%`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: isFullscreen === index ? "100%" : "70%",
        width: isFullscreen === index ? "100vw" : "20vw",
        transition: isFullscreen
          ? isFullscreen === index
            ? "width 2s ease, height 2s 2s ease"
            : "width 2s ease, height 2s ease"
          : "width 2s 2s ease, height 2s ease",
      }}
    >
      {onFocus && (
        <ImageDetails
          project={project}
          moreDetail={moreDetail}
          isOpen={isOpen}
          setOpen={setOpen}
        />
      )}
    </Box>
  );
}

export default React.memo(ImageGallery);
