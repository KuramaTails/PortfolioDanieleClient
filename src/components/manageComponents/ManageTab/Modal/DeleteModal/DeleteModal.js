import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as styles from "./styles";

function DeleteModal({
  state,
  hide,
  category,
  clickedImage,
  images,
  setImages,
}) {
  const submitHandler = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:5000/",
      },
      body: JSON.stringify({ category: category, imageId: clickedImage._id }),
    };
    fetch(`http://localhost:5000/deleteImage`, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          let newImagesArr = images.filter(
            (image, index) => image._id !== clickedImage._id && image
          );
          setImages(newImagesArr);
          hide();
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
          Delete Image
        </Box>
        <Box
          id="modal-modal-description"
          sx={{ width: 1, height: 0.3, textAlign: "center" }}
        >
          Are you sure you want to delete this image?
        </Box>
        <Box id="modal-modal-footer" sx={styles.footerModal}>
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
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{
              "&:hover": {
                bgcolor: "tertiary.main",
              },
            }}
            onClick={submitHandler}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default DeleteModal;
