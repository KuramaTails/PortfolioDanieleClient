import Box from "@mui/material/Box";
import { useState, useCallback, useMemo, useLayoutEffect, lazy } from "react";
import { useNavigate } from "react-router-dom";
import pako from "pako";
const Fade = lazy(() => import("./Fade/Fade"));
const Gallery = lazy(() => import("./Gallery/Gallery"));

function Main({ bgImage }) {
  const navigate = useNavigate();

  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);
  const [translateImage, setTranslate] = useState(0);
  const [projects, setProjects] = useState(null);
  const [frontImage, setFrontImage] = useState(bgImage || null);
  const [isLoading, setisLoading] = useState(true);

  useLayoutEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:5000/",
      },
    };
    const fetchFrontImage = async () => {
      const response = await fetch(
        `http://localhost:5000/requestBgImage?type=photo`,
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
        `http://localhost:5000/requestPhotoImages`,
        requestOptions
      );
      const data = await response.json();
      if (!data) return;
      console.log(data);
      let { projects, completeProjects } = data;
      projects.projects.map((project, index) => {
        project.completeProjects = completeProjects[index];
        project.completeProjects.map((image, index) => {
          let binary = atob(image.image.split(",")[1]);
          let binaryData = new Uint8Array(image.image.split(",")[1].length);
          for (let i = 0; i < binary.length; i++) {
            binaryData[i] = binary.charCodeAt(i);
          }
          let decompressed = pako.inflate(binaryData);
          let blob = new Blob([decompressed], { type: "image/webp" });
          let decompressedImage = URL.createObjectURL(blob);
          return (project.completeProjects[index].image = decompressedImage);
        });
        return project;
      });
      setProjects(projects.projects);
      setisLoading(false);
    };
    fetchProjects().catch(console.error);
  }, []);

  useLayoutEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setTranslate("-100%");
      }, 1000);
    }
  }, [isLoading]);

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

  function goBack() {
    setTranslate("0%");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }

  if (isLoading) {
    return <div> is Loading </div>;
  } else {
    return (
      <Box
        sx={{
          flexGrow: 1,
          background: "linear-gradient(168deg,#205560, #60959F)",
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
