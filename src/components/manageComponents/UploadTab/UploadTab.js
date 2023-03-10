import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useLayoutEffect, useRef, useState } from "react";
import pako from "pako";
import exifr from "exifr";
import * as styles from "./styles";

function UploadTab() {
  const [category, setCategory] = useState("General");
  const fileInput = useRef(null);
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [imageInfo, setImageInfo] = useState(
    category === "Photos"
      ? {
          Name: "",
          Model: "",
          "Exposure Time": "",
          ISO: "",
          Lens: "",
          "Focal length": "",
        }
      : {
          Name: "",
        }
  );

  useLayoutEffect(() => {
    let newInfos =
      category === "Photos"
        ? {
            Name: "",
            Model: "",
            "Exposure Time": "",
            ISO: "",
            Lens: "",
            "Focal length": "",
          }
        : {
            Name: "",
          };
    setImageInfo(newInfos);
  }, [category]);

  const changeHandler = async (event) => {
    let file = event.target.files[0];
    if (file) {
      let compressedBuffer;
      if (category !== "Models") {
        exifr.parse(file).then(async (output) => {
          // if (output.ExifImageHeight > 1080 || output.ExifImageWidth > 1920)
          //   return alert("Image resolution is too big!");
          let tempInfo =
            category !== "General"
              ? {
                  Name: file.name,
                  Model: output.Model ? output.Model : "",
                  "Exposure Time": output.ExposureTime
                    ? "1/" + 1 / parseFloat(output.ExposureTime)
                    : "",
                  ISO: output.ISO ? output.ISO : "",
                  Lens: output.LensModel ? output.LensModel : "",
                  "Focal length": output.FocalLength ? output.FocalLength : "",
                }
              : {
                  name: file.name,
                };
          setImageInfo(tempInfo);
          const webpData = await toWebP(file);
          compressedBuffer = pako.deflate(webpData);
          const base64Data = await toBase64(compressedBuffer, "image");
          setImageData(base64Data);
          setIsFilePicked(true);
          alert("Image loaded correctly!");
        });
      } else {
        setImageInfo({ name: file.name });
        const fileBuffer = await file.arrayBuffer();
        const blob = new Blob([fileBuffer]);
        const reader = new FileReader();
        reader.onload = () => {
          const imageData = reader.result.split(",")[1];
          if (fileBuffer) {
            setImageData(imageData);
            setIsFilePicked(true);
            alert("Model loaded correctly!");
          }
        };
        reader.readAsDataURL(blob);
      }
    }
  };

  const handleSubmission = () => {
    const payload = {
      type: category,
      imageInfo: imageInfo,
      image: imageData,
    };
    fetch(
      `https://portfoliodanieleserver.onrender.com/${
        category === "Models" ? "uploadModel" : "uploadImage"
      }`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    )
      .then((res) => {
        category === "Models"
          ? alert("Model uploaded correctly!")
          : alert("Image uploaded correctly!");
        setIsFilePicked(false);
        setImageData(null);
      })
      .catch((error) => console.error(error));
  };

  return (
    <Box sx={styles.wrapper}>
      <Box
        component="form"
        encType="multipart/form-data"
        method="post"
        sx={styles.secondWrapper}
      >
        <Box sx={{ height: 0.1, width: 1, lineHeight: 4 }}>
          Upload here your photos
        </Box>
        <Box sx={{ width: 1, height: 0.8 }}>
          <Box sx={{ height: 0.2, width: 1 }}>
            <FormControl fullWidth>
              <InputLabel id="label">Current</InputLabel>
              <Select
                id="currentImage"
                value={category}
                label="Current"
                onChange={(event, newCategory) =>
                  setCategory(newCategory.props.value)
                }
                sx={{
                  height: 0.2,
                }}
              >
                <MenuItem value={"General"}>General</MenuItem>
                <MenuItem value={"Photos"}>Photos</MenuItem>
                <MenuItem value={"Models"}>Models</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ height: 0.8, width: 1 }}>
            {Object.keys(imageInfo).map((info, index) => (
              <TextField
                required
                disabled={!isFilePicked}
                fullWidth
                type={"string"}
                id={"field" + index}
                key={"field" + index}
                label={info}
                value={imageInfo[info]}
                variant="outlined"
                onChange={(event) =>
                  setImageInfo({ ...imageInfo, [info]: event.target.value })
                }
                error={isFilePicked && imageInfo[info] === ""}
                sx={{
                  width: 1,
                  height: 100 / Object.keys(imageInfo).length + "%",
                }}
              />
            ))}
          </Box>
        </Box>
        <Box sx={styles.buttonWrapper}>
          <Button onClick={() => fileInput.current.click()}>
            Upload photo
          </Button>
          <Button
            disabled={
              !isFilePicked ||
              Object.values(imageInfo).some((val) => val === "")
            }
            onClick={handleSubmission}
          >
            Submit
          </Button>
        </Box>

        <input
          ref={fileInput}
          type="file"
          name="image"
          id="image"
          accept={category === "Models" ? ".glb" : ".jpeg,.gif,.png"}
          style={{ display: "none" }}
          onChange={changeHandler}
        />
      </Box>
    </Box>
  );
}

async function toWebP(file) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const scale = Math.min(1920 / img.width, 1080 / img.height);
      const newWidth = img.width * scale;
      const newHeight = img.height * scale;
      canvas.width = newWidth;
      canvas.height = newHeight;
      ctx.drawImage(img, 0, 0, newWidth, newHeight);
      canvas.toBlob((blob) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(blob);
        reader.onloadend = () => {
          const webp = new Uint8Array(reader.result);
          resolve(webp);
        };
      }, "image/webp");
    };
  });
}

async function toBase64(data, type) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const blob = new Blob([data], {
      type: type === "image" ? "image/webp" : "model/gltf-binary",
    });

    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64Data = reader.result;
      resolve(base64Data);
    };
  });
}

export default UploadTab;
