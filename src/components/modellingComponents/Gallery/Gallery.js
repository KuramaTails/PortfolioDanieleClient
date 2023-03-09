import React, { useState, useEffect, useCallback } from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStepForward } from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faFacebook,
  faInstagram,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import Model from "../Model/Model";
import * as styles from "./styles";

function Gallery({ size, goBack, projects }) {
  const { height, width } = size;

  const [isScrolling, setIsScrolling] = useState(false);
  const [translatePerc, setTranslatePerc] = useState(120);
  const [isFullscreen, setFullscreen] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [overlayDisplay, setOverlayDisplay] = useState({
    display: "flex",
    opacity: 0,
  });

  useEffect(() => {
    setTimeout(() => {
      setTranslatePerc(40);
      setTimeout(() => {
        setOverlayDisplay({ ...overlayDisplay, opacity: 1 });
      }, 2000);
    }, 1000);
  }, []);

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
      }, 2000);
    }
  }

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
      onWheel={handleWheel}
      sx={styles.wrapper}
      style={{ height: height, width: width }}
    >
      <Box sx={styles.secondWrapper}>
        <Box
          sx={[styles.title, { display: overlayDisplay }]}
          style={{ opacity: overlayDisplay.opacity }}
        >
          My Journey Through the Wonders of Creation
          <Button sx={styles.goBack} onClick={() => goBack()}>
            Go Back
            <FontAwesomeIcon icon={faStepForward} />
          </Button>
        </Box>
        <Box
          sx={styles.contentSection}
          style={{ transform: `translateX(${translatePerc}%)` }}
        >
          {projects &&
            projects.map((project, index) => (
              <Model
                model={project}
                translatePerc={translatePerc}
                setTranslatePerc={setTranslatePerc}
                isFullscreen={isFullscreen}
                setFullscreen={setFullscreen}
                size={size}
                key={index + 1}
                index={index + 1}
                onClick={removeOverlay}
                isOpen={isOpen}
                setOpen={setOpen}
                setIsScrolling={setIsScrolling}
                projectLength={projects.length}
              />
            ))}
        </Box>
        <Box sx={[styles.footerWrapper, { display: overlayDisplay }]}>
          <Box
            sx={styles.footerContainer}
            style={{ opacity: overlayDisplay.opacity }}
          >
            <Box>Follow me on</Box>
            <Box
              sx={{
                gap: "4vmin",
                my: 2,
                display: "flex",
                "&>*": { cursor: "pointer" },
              }}
            >
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
