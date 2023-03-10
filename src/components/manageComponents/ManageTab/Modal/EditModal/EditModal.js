import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";
import { useState } from "react";
import * as styles from "./styles";

function EditModal({ state, hide, category, clickedImage, images, setImages }) {
  let { name, imageInfo } = clickedImage;
  const [editedInfo, seteditedInfo] = useState(
    name ? { name: name } : imageInfo
  );
  const submitHandler = (e) => {
    e.preventDefault();
    let body = name
      ? { ...clickedImage, name: editedInfo.name }
      : { ...clickedImage, imageInfo: editedInfo };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://portfoliodanieleserver.onrender.com/",
      },
      body: JSON.stringify(body),
    };
    fetch(`https://portfoliodanieleserver.onrender.com/editImage?cat=${category}`, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          let updatedImages = images.map((image) =>
            image._id === clickedImage._id ? body : image
          );
          setImages(updatedImages);
          return hide();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal
      open={state}
      onClose={hide}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styles.wrapperModal}>
        <Box id="modal-modal-title" sx={styles.titleModal}>
          Edit Image
        </Box>
        <Box id="modal-modal-description" sx={{ width: 1, height: 0.8 }}>
          <Box sx={styles.contentModal}>
            {imageInfo ? (
              Object.keys(imageInfo).map((info) => (
                <TextField
                  required
                  fullWidth
                  type={"string"}
                  id={info}
                  key={info}
                  label={info}
                  variant="outlined"
                  defaultValue={imageInfo[info]}
                  onChange={(event) =>
                    seteditedInfo({ ...editedInfo, [info]: event.target.value })
                  }
                  error={editedInfo[info] === "" && true}
                  sx={{ width: 1, height: 1 / Object.keys(imageInfo).length }}
                />
              ))
            ) : (
              <TextField
                required
                fullWidth
                type={"string"}
                id="imageName"
                label="Name"
                variant="outlined"
                defaultValue={name}
                onChange={(event) =>
                  seteditedInfo({ name: event.target.value })
                }
                error={editedInfo.name === "" && true}
                sx={{ width: 1, height: 0.25 }}
              />
            )}
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

export default EditModal;
