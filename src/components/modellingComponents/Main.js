import React, { useState, useLayoutEffect, useCallback, useMemo } from "react";
import { Box } from "@mui/system";
import Fade from "../photoComponents/Fade/Fade";
import Gallery from "./Gallery/Gallery";
import { useNavigate } from "react-router-dom";
import pako from "pako";

function Main({ bgImage }) {
  const navigate = useNavigate();
  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);
  const [translateImage, setTranslate] = useState(0);
  const [projects, setProjects] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [frontImage, setFrontImage] = useState(bgImage || null);

  const handleResize = useCallback(() => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  }, []);

  useLayoutEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const size = useMemo(() => ({ height, width }), [height, width]);

  useLayoutEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://portfoliodanieleserver.onrender.com/",
      },
    };
    const fetchFrontImage = async () => {
      const response = await fetch(
        `https://portfoliodanieleserver.onrender.com/requestBgImage?type=models`,
        requestOptions
      );
      const data = await response.json();
      if (!data) return;
      let image = data.image[0];
      let binary = atob(image.image.split(",")[1]);
      let binaryData = new Uint8Array(image.image.split(",")[1].length);
      for (let i = 0; i < binary.length; i++) {
        binaryData[i] = binary.charCodeAt(i);
      }
      let decompressed = pako.inflate(binaryData);
      let blob = new Blob([decompressed], { type: "image/webp" });
      let decompressedImage = URL.createObjectURL(blob);
      setFrontImage(decompressedImage);
    };
    const fetchProjects = async () => {
      !bgImage && (await fetchFrontImage().catch(console.error));
      const response = await fetch(
        `https://portfoliodanieleserver.onrender.com/requestModels`,
        requestOptions
      );
      const data = await response.json();
      if (!data) return;
      let models = data.map((model) => {
        const blob = new Blob(
          [
            new Uint8Array(
              atob(model.model)
                .split("")
                .map((c) => c.charCodeAt(0))
            ),
          ],
          { type: "model/gltf-binary" }
        );
        model.model = blob;
        return model;
      });

      setProjects(models);
      setisLoading(false);
    };
    fetchProjects().catch(console.error);
  }, []);

  function goBack() {
    setTranslate("0%");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }

  useLayoutEffect(() => {
    setTimeout(() => {
      setTranslate("-100%");
    }, 1000);
  }, []);
  if (isLoading) {
    return <div>is Loading</div>;
  } else {
    return (
      <Box
        sx={{
          flexGrow: 1,
          background: "linear-gradient(168deg,#7C568F , #49235C)",
        }}
      >
        <Fade
          size={size}
          translateImage={translateImage}
          frontImage={frontImage}
        />
        <Gallery size={size} goBack={goBack} projects={projects} />
      </Box>
    );
  }
}

export default Main;
