import Box from "@mui/material/Box";
import Navbar from "./Navbar/Navbar";
import Home from "./Home/Home";
import Work from "./Work/Work";
import { useState, useCallback, useMemo, useLayoutEffect } from "react";
import AboutMe from "./AboutMe/AboutMe";
import SmoothScroll from "smooth-scroll";
import pako from "pako";

function Main() {
  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);
  const [currentComponent, setComponent] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [images, setImages] = useState(0);
  const [isLoading, setisLoading] = useState(true);
  var scroll = new SmoothScroll('a[href*="#"]', {
    speed: 1000,
  });

  useLayoutEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:5000/",
      },
    };
    const fetchImages = async () => {
      const response = await fetch(
        `http://localhost:5000/requestHomeImages`,
        requestOptions
      );
      const data = await response.json();
      if (!data) return;
      let decompressedImages = data.map((image) => {
        let binary = atob(image.image.split(",")[1]);
        let binaryData = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          binaryData[i] = binary.charCodeAt(i);
        }
        let decompressed = pako.inflate(binaryData);
        let blob = new Blob([decompressed], { type: "image/webp" });
        return URL.createObjectURL(blob);
      });
      setImages(decompressedImages);
      setisLoading(false);
    };
    fetchImages().catch(console.error);
  }, []);

  const handleWheel = useCallback(
    (event) => {
      event.preventDefault();
      const direction = event.deltaY > 0 ? 1 : -1;
      if (
        isScrolling ||
        (currentComponent === 0 && direction === -1) ||
        (currentComponent === 2 && direction === 1)
      )
        return;
      setIsScrolling(true);
      setComponent(currentComponent + direction);
      scroll.animateScroll(window.innerHeight * (currentComponent + direction));
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    },
    [currentComponent, isScrolling]
  );

  const handleResize = useCallback(() => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  }, []);

  function handleClick(component) {
    setComponent(component);
    scroll.animateScroll(window.innerHeight * component);
  }

  useLayoutEffect(() => {
    window.addEventListener("wheel", handleWheel);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleWheel, handleResize]);

  const size = useMemo(
    () => ({ height, width, currentComponent }),
    [height, width, currentComponent]
  );

  if (isLoading) {
    return <div>is Loading</div>;
  } else {
    return (
      <Box
        sx={{
          flexGrow: 1,
          background: "linear-gradient(168deg,#205560, #7C568F)",
        }}
      >
        <Navbar size={size} onClick={handleClick} />
        <Home size={size} image={images[0]} />
        <Work size={size} images={[images[1], images[2]]} />
        <AboutMe size={size} image={images[3]} />
      </Box>
    );
  }
}

export default Main;
