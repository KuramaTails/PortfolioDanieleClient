import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";
import { useState } from "react";
import * as styles from "./styles";

function AddModal({ state, hide, type }) {
  const [projectName, setProjectName] = useState(null);
  const [errorProjectName, setRrrorProjectName] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    if (projectName === "") {
      return setRrrorProjectName(true);
    }

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:5000/",
      },
      body: JSON.stringify({ projectName: projectName }),
    };
    fetch(`http://localhost:5000/addProject?type=${type}`, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          hide();
        }
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setProjectName(e.target.value);
  };
  return (
    <Modal
      open={state}
      onClose={hide}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styles.tabsWrapper}>
        <Box id="modal-modal-title" sx={styles.title}>
          Add new Project
        </Box>
        <Box id="modal-modal-description" sx={{ width: 1, height: 0.8 }}>
          <TextField
            required
            fullWidth
            type={"string"}
            id="name"
            label="Project name's"
            variant="outlined"
            onChange={handleChange}
            error={errorProjectName}
            sx={{ width: 1, height: 0.25 }}
          />
        </Box>
        <Box id="modal-modal-footer" sx={styles.modalFooter}>
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

export default AddModal;
