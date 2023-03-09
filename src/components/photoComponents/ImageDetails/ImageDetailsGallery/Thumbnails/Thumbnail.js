import { Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpLong, faDownLong } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import * as styles from "./styles";

function Thumbnail({ project, currentImage, setCurrentImage }) {
  const [translatePerc, setTranslatePerc] = useState(0);
  const scrollPerc = useRef(null);

  const updateTranslatePerc = useCallback(
    (direction) => {
      let newPerc = translatePerc + direction * 30;
      switch (true) {
        case translatePerc === 0 && direction > 0:
          newPerc = -(project.images.length - 4) * 35;
          break;
        case newPerc > 0:
          newPerc = 0;
          break;
        case translatePerc === -(project.images.length - 4) * 35 &&
          direction < 0:
          newPerc = 0;
          break;
        case newPerc < -(project.images.length - 4) * 30:
          newPerc = -(project.images.length - 4) * 35;
          break;
        default:
          break;
      }
      setTranslatePerc(newPerc);
    },
    [translatePerc]
  );

  useLayoutEffect(() => {
    if (
      (currentImage > 2 &&
        Math.abs(Math.abs(translatePerc / 30) - currentImage) >= 3) ||
      (currentImage === 0 && translatePerc !== 0)
    ) {
      updateTranslatePerc(-1);
    }
  }, [currentImage]);

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.iconWrapper} onClick={() => updateTranslatePerc(1)}>
        <FontAwesomeIcon icon={faUpLong} size={"lg"} style={styles.icon} />
      </Box>
      <Box sx={styles.contentSection}>
        <Box
          ref={scrollPerc}
          onWheel={(event) =>
            (scrollPerc.current.scrollTop += event.deltaY > 0 ? 200 : -200)
          }
          sx={styles.contentWrapper}
          style={{ transform: `translateY(${translatePerc}%)` }}
        >
          {project &&
            project.completeProjects.map((image, index) => (
              <Box
                onClick={() => setCurrentImage(index)}
                sx={{
                  flex: "1 0 25%",
                  width: 1,
                  background: "white",
                }}
              >
                <Box
                  sx={styles.thumbnail}
                  style={{
                    background: `url(${image.image}) center center no-repeat`,
                    backgroundSize: "cover",
                    transform: currentImage === index && "scale(0.975)",
                  }}
                ></Box>
              </Box>
            ))}
        </Box>
      </Box>
      <Box sx={styles.iconWrapper} onClick={() => updateTranslatePerc(-1)}>
        <FontAwesomeIcon icon={faDownLong} size={"lg"} style={styles.icon} />
      </Box>
    </Box>
  );
}

export default Thumbnail;
