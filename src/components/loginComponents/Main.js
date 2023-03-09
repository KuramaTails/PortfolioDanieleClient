import {
  Box,
  Button,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as styles from "./styles";

function Main({setIsAuthenticated}) {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorUsername, setErrorUsername] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
    switch (true) {
      case username === "":
        if (password === "") {
          setErrorPassword(true);
        } else {
          if (errorPassword === true) {
            setErrorPassword(false);
          }
        }
        return setErrorUsername(true);
      case errorUsername === true && username !== "":
        setErrorUsername(false);
        if (password !== "") {
          return setErrorPassword(true);
        }
        break;
      case password === "":
        return setErrorPassword(true);
      case errorPassword === true && password !== "":
        setErrorPassword(false);
        break;
      default:
        break;
    }

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:5000/",
      },
      body: JSON.stringify({ username: username, password: password }),
    };
    fetch("http://localhost:5000/auth", requestOptions)
      .then((response) => {
        switch (true) {
          case response.status === 200:
            navigate("/manage");
            setIsAuthenticated(true);
            break;
          case response.status === 201:
            setErrorUsername(true);
            setErrorPassword(true);
            break;
          case response.status === 202:
            setErrorPassword(true);
            break;
          default:
            setErrorUsername(true);
            setErrorPassword(true);
            break;
        }
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    e.target.id === "username"
      ? setUsername(e.target.value)
      : setPassword(e.target.value);
  };
  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.secondWrapper}>
        <Box component="form" onSubmit={submitHandler} sx={styles.formWrapper}>
          <Box sx={styles.titleForm}>Login</Box>
          <Box sx={styles.sectionForm}>
            <Box sx={{ width: 0.7, height: 0.25 }}>
              <TextField
                required
                fullWidth
                type={"username"}
                id="username"
                label="Username"
                variant="outlined"
                onChange={handleChange}
                error={errorUsername}
                sx={styles.textFieldForm}
              />
            </Box>
            <Box sx={{ width: 0.7, height: 0.25 }}>
              <TextField
                required
                fullWidth
                type={"password"}
                id="password"
                label="Password"
                variant="outlined"
                onChange={handleChange}
                error={errorPassword}
                sx={styles.textFieldForm}
              />
            </Box>
          </Box>
          <Box sx={styles.buttonWrapper}>
            <Button type="submit" sx={styles.button}>
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Main;
