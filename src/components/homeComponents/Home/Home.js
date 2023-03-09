import { Box, Typography } from "@mui/material";
import React from "react";
import * as styles from "./styles";

function Home({ size, image }) {
  const { height } = size;
  let name = "DANIELE";
  let surname = "VIOLO";
  return (
    <Box
      sx={[
        styles.homeWrapper,
        {
          backgroundImage: `url(${image})`,
          height: height,
        },
      ]}
    >
      <Box sx={styles.nameContainer}>
        <Box sx={styles.nameWrapper}>
          {Object.keys(name).map((letter, index) => (
            <Typography
              key={`name-${index}`}
              sx={[
                styles.text,
                {
                  animation: `textIn 0.75s ${
                    0.5 + parseInt(letter) / 8
                  }s ease-out forwards`,
                },
              ]}
            >
              {name[letter]}
            </Typography>
          ))}
        </Box>
        <Box sx={styles.nameWrapper}>
          {Object.keys(surname).map((letter, index) => (
            <Typography
              key={`name-${index}`}
              sx={[
                styles.text,
                {
                  animation: `textIn 0.75s ${
                    0.5 + parseInt(letter) / 8
                  }s ease-out forwards`,
                },
              ]}
            >
              {surname[letter]}
            </Typography>
          ))}
        </Box>
      </Box>
      <Box sx={styles.mouseWrapper}>
        <Typography variant="svg" sx={styles.mouse}></Typography>
        <Typography sx={{ mt: 2, color: "white", fontWeight: 800 }}>
          Scroll down
        </Typography>
      </Box>
    </Box>
  );
}

export default Home;
