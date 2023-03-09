import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import * as styles from "./styles";

function ModalComponent({
  state,
  hide,
  category,
  availableImages,
  currentImages,
  setCurrentImages,
}) {
  const [categoryImage, setCategoryImage] = useState(
    currentImages
      ? {
          value: currentImages[String(category).toLowerCase()],
          imageprops:
            availableImages[currentImages[String(category).toLowerCase()]],
        }
      : { value: 0, imageprops: availableImages[0] }
  );

  function submitChanges() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:5000/",
      },
      body: JSON.stringify({ currentImage: categoryImage.imageprops._id }),
    };
    fetch(`http://localhost:5000/editGeneral?cat=${category}`, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          setCurrentImages((prevState) => ({
            ...prevState,
            [String(category).toLowerCase()]: categoryImage.imageprops._id,
          }));
          return hide();
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <Modal
      open={state}
      onClose={hide}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styles.wrapper}>
        <Box id="modal-modal-title" sx={styles.titleModal}>
          Edit {category}
        </Box>
        <Box id="modal-modal-description" sx={{ width: 1, height: 0.8 }}>
          <FormControl fullWidth sx={{ height: 0.1, width: 1 }}>
            <InputLabel id="label">Current</InputLabel>
            <Select
              id="currentImage"
              value={categoryImage ? categoryImage.value : 0}
              label="Current"
              onChange={(event, newImage) => {
                let newImageObj = {
                  value: newImage.props.value,
                  imageprops: newImage.props.imageprops,
                };
                setCategoryImage(newImageObj);
              }}
            >
              {availableImages.map((image, index) => (
                <MenuItem key={index} value={index} imageprops={image}>
                  {index}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box
            sx={{
              height: 0.9,
              width: 1,
              backgroundSize: "cover",
            }}
            style={{
              background: `no-repeat center center url(${
                currentImages[String(category).toLowerCase()] <
                  availableImages.length && categoryImage
                  ? categoryImage.imageprops.image
                  : availableImages[categoryImage.value] &&
                    categoryImage.imageprops.image
              })`,
            }}
          ></Box>
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
            onClick={submitChanges}
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

export default ModalComponent;
