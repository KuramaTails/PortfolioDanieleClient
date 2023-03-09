import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { lazy, useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStepForward } from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faFacebook,
  faInstagram,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import * as styles from "./styles";

const ImageGallery = lazy(() => import("../ImageGallery/ImageGallery"));
function Gallery({ size, goBack, projects }) {
  const { height, width } = size;
  const [isScrolling, setIsScrolling] = useState(false);
  const [translatePerc, setTranslatePerc] = useState(120);
  const [click, setClick] = useState(0);
  const [start, setStart] = useState(null);
  const [current, setCurrent] = useState(null);
  const [end, setEnd] = useState(null);
  const [isFullscreen, setFullscreen] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [overlayDisplay, setOverlayDisplay] = useState({
    display: "flex",
    opacity: 0,
  });

  function removeOverlay() {
    if (overlayDisplay.display === "flex") {
      setOverlayDisplay({ display: "flex", opacity: 0 });
      setTimeout(() => {
        setOverlayDisplay({ display: "none", opacity: 0 });
      }, 2000);
    } else {
      setOverlayDisplay({ display: "flex", opacity: 0 });
      setTimeout(() => {
        setOverlayDisplay({ display: "flex", opacity: 1 });
      }, 4000);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setTranslatePerc(40);
      setTimeout(() => {
        setOverlayDisplay({ display: "flex", opacity: 1 });
      }, 1000);
    }, 2000);
  }, []);

  useEffect(() => {
    if (start && (end || current)) {
      let mouseDelta = click === 1 ? current.x - start.x : end.x - start.x;
      let percentageOfWindow = mouseDelta / (width / 2);
      let sum = parseFloat(percentageOfWindow) + parseFloat(translatePerc);
      setTranslatePerc(sum);
    }
  }, [current, end]);

  const handleMouseDown = (e) => {
    setClick(1);
    setStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (click === 1) {
      setCurrent({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = (e) => {
    setClick(0);
    setEnd({ x: e.clientX, y: e.clientY });
  };

  const handleWheel = useCallback(
    (event) => {
      if (isScrolling || isOpen) return;
      const direction = event.deltaY > 0 ? 1 : -1;
      if (isFullscreen) {
        let newIndex = isFullscreen + -direction;
        setTranslatePerc(translatePerc + 62 * direction);
        setTimeout(() => {
          setTranslatePerc(-(newIndex - 1) * 22.5);
          setFullscreen(newIndex);
        }, 2000);
      } else {
        let newPerc = parseFloat(translatePerc) + direction * 30;
        if (newPerc <= -160) {
          newPerc = -160;
        } else {
          if (newPerc >= 40) {
            newPerc = 40;
          }
        }
        setTranslatePerc(newPerc);
      }
      setIsScrolling(true);
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    },
    [translatePerc, isScrolling, isFullscreen, isOpen]
  );
  return (
    <Box
      // onMouseDown={handleMouseDown}
      // onMouseMove={handleMouseMove}
      // onMouseUp={handleMouseUp}
      onWheel={handleWheel}
      sx={[styles.wrapper, { height: height, width: width }]}
    >
      <Box sx={styles.container}>
        <Box
          sx={[styles.textSection, { display: overlayDisplay }]}
          style={{ opacity: overlayDisplay.opacity }}
        >
          My Journey Through the Wonders of the World
          <Button sx={styles.backButton} onClick={() => goBack()}>
            Go Back
            <FontAwesomeIcon icon={faStepForward} />
          </Button>
        </Box>
        <Box
          sx={styles.gallerySection}
          style={{ transform: `translateX(${translatePerc}%)` }}
        >
          {projects &&
            projects.map((project, index) => (
              <ImageGallery
                key={index}
                project={project}
                translatePerc={translatePerc}
                setTranslatePerc={setTranslatePerc}
                isFullscreen={isFullscreen}
                setFullscreen={setFullscreen}
                size={size}
                index={index + 1}
                onClick={removeOverlay}
                isOpen={isOpen}
                setOpen={setOpen}
              />
            ))}
        </Box>
        <Box
          sx={[styles.textSection, { display: overlayDisplay }]}
          style={{ opacity: overlayDisplay.opacity }}
        >
          <Box
            sx={styles.contactWrapper}
            style={{ opacity: overlayDisplay.opacity }}
          >
            <Box>Follow me on</Box>
            <Box sx={styles.iconWrapper}>
              <FontAwesomeIcon icon={faTwitter} size={"lg"} />
              <FontAwesomeIcon icon={faFacebook} size={"lg"} />
              <FontAwesomeIcon icon={faInstagram} size={"lg"} />
              <FontAwesomeIcon icon={faLinkedin} size={"lg"} />
              <FontAwesomeIcon icon={faWhatsapp} size={"lg"} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Gallery;
