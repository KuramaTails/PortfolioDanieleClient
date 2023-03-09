import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import pako from "pako";
import * as styles from "./styles";

function EditModal({ state, hide, type, clickedProject }) {
  const [images, setImages] = useState(null);
  const [projectName, setProjectName] = useState(clickedProject.name);
  const [checked, setChecked] = useState(false);
  const [frontImage, setFrontImage] = useState("");
  let projectImages = clickedProject.images;

  useEffect(() => {
    let category = type === "Photography" ? "Photo" : "Models";
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:5000/",
      },
    };
    const fetchProjects = async () => {
      const response = await fetch(
        `http://localhost:5000/requestType?type=${category}`,
        requestOptions
      );
      const data = response.status == 200 && (await response.json());
      (!data || !data.availableImages) && setImages(null);
      if (!data) return;
      let decompressedImages = data.map((image, index) => {
        let binary = atob(image.image.split(",")[1]);
        let binaryData = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          binaryData[i] = binary.charCodeAt(i);
        }
        let decompressed = pako.inflate(binaryData);
        let blob = new Blob([decompressed], { type: "image/webp" });
        let decompressedImage = URL.createObjectURL(blob);
        data[index].image = decompressedImage;
        return data[index];
      });
      setImages(decompressedImages);
      let indexFront = decompressedImages.findIndex(
        (elem) => elem._id === clickedProject.frontImage
      );
      indexFront > -1 && setFrontImage(parseInt(indexFront));

      let checkedArr = decompressedImages
        .map((image, index) => {
          if (projectImages.includes(image._id)) {
            return String(index);
          }
        })
        .filter((index) => index !== undefined);
      setChecked(checkedArr);
    };
    fetchProjects().catch(console.error);
  }, []);

  const handleNameChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleSelect = (position) => {
    if (checked.includes(position)) {
      frontImage === position && setFrontImage(null);
      setChecked(checked.filter((i) => i !== position));
    } else {
      setChecked([...checked, position].sort());
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (frontImage==="" || frontImage<-1) return;
    let newArr = checked.map((value, index) => images[value]._id);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:5000/",
      },
      body: JSON.stringify({
        project: {
          name: projectName,
          frontImage: images[frontImage]._id,
          images: newArr,
        },
      }),
    };
    fetch(`http://localhost:5000/editProject?type=${type}`, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          hide();
        }
      })
      .catch((err) => console.log(err));
  };

  if (images) {
    return (
      <Modal
        open={state}
        onClose={hide}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.wrapper}>
          <Box id="modal-modal-title" sx={styles.title}>
            Edit Project
          </Box>
          <Box id="modal-modal-description" sx={{ width: 1, height: 0.8 }}>
            <Box sx={styles.contentWrapper}>
              Project Name's
              <TextField
                required
                fullWidth
                type={"string"}
                id="name"
                variant="outlined"
                defaultValue={projectName}
                onChange={handleNameChange}
                error={projectName === "" && true}
                sx={{ width: 1, height: 0.25 }}
              />
            </Box>
            <Box sx={{ width: 1, height: 0.8 }}>
              <FormControl fullWidth sx={{ height: 0.1, width: 1 }}>
                <InputLabel id="label">Front Image</InputLabel>
                <Select
                  id="currentImage"
                  value={frontImage}
                  label="Front Image"
                  onChange={(event, newFront) =>
                    setFrontImage(newFront.props.value)
                  }
                >
                  {checked &&
                    checked.map((element) => {
                      return (
                        <MenuItem
                          key={element}
                          value={element}
                          imageurl={images[element]}
                        >
                          {element}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
              <Box component="ul" sx={styles.sectionWrapper}>
                {images &&
                  images.map((image, index) => {
                    return (
                      <Box component="li" key={index}>
                        <input
                          type="checkbox"
                          id={"cb" + index}
                          style={{ display: "none" }}
                          checked={checked.includes(String(index))}
                          onChange={() => handleSelect(String(index))}
                        />
                        <Box
                          component="label"
                          htmlFor={"cb" + index}
                          sx={styles.imageModal}
                          style={{
                            backgroundImage: `url(${image.image})`,

                            transform:
                              checked.includes(String(index)) && "scale(0.9)",
                            border:
                              checked.includes(String(index)) && "solid 2px",
                            boxShadow:
                              checked.includes(String(index)) && "0 0 5px #333",
                            "&::before": {
                              display: checked.includes(String(index))
                                ? "inline-block"
                                : "none",
                            },
                          }}
                        ></Box>
                      </Box>
                    );
                  })}
              </Box>
            </Box>
          </Box>
          <Box id="modal-modal-footer" sx={styles.footerModal}>
            <Button
              variant="contained"
              color="success"
              sx={{
                "&:hover": {
                  bgcolor: "tertiary.main",
                },
              }}
              onClick={submitHandler}
            >
              Confirm
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                "&:hover": {
                  bgcolor: "tertiary.main",
                },
              }}
              onClick={() => hide()}
            >
              <CloseIcon />
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  }
}

export default EditModal;
