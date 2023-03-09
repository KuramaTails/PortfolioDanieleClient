import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as styles from "./styles";

function Work({ size, images }) {
  const navigate = useNavigate();

  const { height, width, currentComponent } = size;
  const [animationState, setAnimationState] = useState("paused");
  const [leftSideWidth, setLeftSideWidth] = useState({
    width: "50%",
    opacity: 0,
    display: "block",
  });
  const [rightSideWidth, setRightSideWidth] = useState({
    width: "50%",
    opacity: 0,
    display: "block",
  });

  function workTransition(direction, event) {
    if (direction === "left") {
      setLeftSideWidth({ width: "100%", display: "block", opacity: 1 });
      setRightSideWidth({ width: "0%", display: "block", opacity: 0 });
      setTimeout(() => {
        setLeftSideWidth({ width: "100%", display: "block", opacity: 0 });
        setRightSideWidth({ width: "0%", display: "none", opacity: 0 });
        setTimeout(() => {
          navigate("/photo", { state: { bgImage: images[0] } });
        }, 1000);
      }, 3000);
    } else {
      setRightSideWidth({ width: "100%", display: "block", opacity: 1 });
      setLeftSideWidth({ width: "0%", display: "block", opacity: 0 });
      setTimeout(() => {
        setRightSideWidth({ width: "100%", display: "block", opacity: 0 });
        setLeftSideWidth({ width: "0%", display: "none", opacity: 0 });
        setTimeout(() => {
          navigate("/modelling", { state: { bgImage: images[1] } });
        }, 1000);
      }, 3000);
    }
  }
  useEffect(() => {
    setAnimationState(currentComponent === 1 ? "running" : "paused");
    if (currentComponent === 1) {
      setTimeout(() => {
        setLeftSideWidth({ width: "50%", display: "block", opacity: 1 });
        setRightSideWidth({ width: "50%", display: "block", opacity: 1 });
      }, 8000);
    }
  }, [currentComponent]);

  useEffect(() => {
    if (animationState === "running") {
      setTimeout(() => {
        setAnimationState("paused");
      }, 10000);
    }
  }, [animationState]);

  return (
    <Box sx={[styles.wrapper, { height: height, width: width }]}>
      <Box
        sx={[
          styles.miniwrapper,
          {
            top: height,
            animationPlayState: animationState,
          },
        ]}
      >
        <Box
          sx={[
            styles.secondWrapper,
            {
              display: animationState === "paused" ? "none" : "flex",
              animationPlayState: animationState,
            },
          ]}
        >
          {["W", "o", "r", "k"].map((letter, index) => (
            <Box
              key={index}
              sx={[
                styles.textOverlay,
                {
                  animationPlayState:
                    currentComponent === 1 ? "running" : "paused",
                },
                letter === "o" && styles.oLetterOverlay,
              ]}
            >
              {letter !== "o" && letter}
            </Box>
          ))}
        </Box>
      </Box>
      <Box sx={styles.thirdWrapper}>
        <Box
          sx={{ transition: "width 1s 2s ease" }}
          style={{
            width: leftSideWidth.width,
            display: leftSideWidth.display,
            background: `linear-gradient(0deg, hsla(190, 50%, 25%, 0.5), hsla(190, 50%, 25%, 0.5)), url(${images[0]}) no-repeat center fixed `,
          }}
        >
          <Box sx={[styles.section, { opacity: leftSideWidth.opacity }]}>
            <Box sx={{ fontSize: "4rem", color: "white" }}>Photography</Box>
            <Box sx={{ fontSize: "2rem", color: "white" }}>
              Explore the Beauty of the World through My Lens
            </Box>
            <Button
              sx={[
                styles.buttonSection,
                {
                  "&:hover": {
                    backgroundColor: "#205560",
                  },
                },
              ]}
              onClick={(event) => workTransition("left", event)}
            >
              View my photography portfolio
            </Button>
          </Box>
        </Box>

        <Box
          sx={{ transition: "width 1s 2s ease" }}
          style={{
            width: rightSideWidth.width,
            display: rightSideWidth.display,
            background: `linear-gradient(0deg, hsla(280, 50%, 25%, 0.5), hsla(280, 50%, 25%, 0.5)), url(${images[1]}) no-repeat center fixed `,
          }}
        >
          <Box sx={[styles.section, { opacity: rightSideWidth.opacity }]}>
            <Box sx={{ fontSize: "4rem", color: "white" }}>3D Modelling</Box>
            <Box sx={{ fontSize: "2rem", color: "white" }}>
              Bringing My Creative Ideas to Life
            </Box>
            <Button
              sx={[
                styles.buttonSection,
                {
                  "&:hover": {
                    backgroundColor: "#7C568F",
                  },
                },
              ]}
              onClick={(event) => workTransition("right", event)}
            >
              Explore my 3D modelling creations
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Work;
