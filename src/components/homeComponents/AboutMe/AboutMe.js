import { Box, Typography } from "@mui/material";
import React from "react";
import * as styles from "./styles";

function AboutMe({ size, image }) {
  const { height } = size;
  return (
    <Box sx={[styles.wrapper, { height: height }]}>
      <Typography component="span" sx={styles.title}>
        About Me
      </Typography>
      <Box sx={styles.wrapperSection}>
        <Box
          sx={[styles.profilePhoto, { backgroundImage: `url(${image})` }]}
        ></Box>
        <Box sx={styles.descWrapper}>
          <Typography component="span" sx={styles.descText}>
            Hi, my name is Daniele Violo and I am an amateur photographer and 3D
            modeler. I have always had a strong passion for capturing unique and
            beautiful moments through my lens and bringing my creative ideas to
            life through{" "}
            <a
              href={"/modelling"}
            >
              3D modeling
            </a>{" "}
            . {<br />}I am always seeking new opportunities to enhance my skills
            and diversify{" "}
            <a
              href={"/photo"}
            >
              My Portfolio
            </a>{" "}
            . I am always looking for ways to grow and develop as a photographer
            and 3D modeler, and I believe that taking on new and exciting
            projects is key to achieving this goal. {<br />}
            Whether it's through capturing the perfect sunset or creating a
            detailed 3D model, I am dedicated to producing high-quality and
            visually stunning work. {<br />} Thank you for taking the time to
            visit my page and I hope you enjoy my creations as much as I enjoy
            making them.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default AboutMe;
