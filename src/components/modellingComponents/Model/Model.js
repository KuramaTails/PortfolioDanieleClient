import { Box, Button } from "@mui/material";
import { Canvas } from "@react-three/fiber";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import * as styles from "./styles";

function Model({
  model,
  translatePerc,
  setTranslatePerc,
  isFullscreen,
  setFullscreen,
  size,
  index,
  onClick,
  isOpen,
  setOpen,
  setIsScrolling,
  projectLength,
}) {
  const [modelSizes, setModelSizes] = useState();
  const [modelData, setModelData] = useState();
  const gltfLoader = useRef(new GLTFLoader()).current;

  const [moreDetail, setMoreDetail] = useState(1);

  useEffect(() => {
    gltfLoader.load(URL.createObjectURL(model.model), (gltf) => {
      const boundingBox = new THREE.Box3().setFromObject(gltf.scene);
      setModelSizes(boundingBox);
      setModelData(gltf.scene);
    });
  }, [gltfLoader, model]);

  function resizeToFull(event) {
    if (!isOpen && event.target.tagName === "CANVAS") {
      onClick();
      setOpen(true);
      if (!isFullscreen || isFullscreen !== index) {
        if (translatePerc !== 40 - (index - 1) * 22.5) {
          setTranslatePerc(40 - (index - 1) * 22.5);
        }
        setMoreDetail(0);
        setTimeout(() => {
          setFullscreen(index);
          setTranslatePerc(-(index - 1) * 22.5);
        }, 1500);
      }
    }
  }

  function returnGallery() {
    setMoreDetail(0);
    setOpen(false);
    setTimeout(() => {
      setFullscreen(null);
      setTranslatePerc(40 - (index - 1) * 22.5);
    }, 2000);
  }

  function changeModel(direction) {
    if (isFullscreen) {
      let newIndex = isFullscreen + -direction;
      if (newIndex < 1 || newIndex > projectLength) {
        setMoreDetail(0);
        setOpen(false);
        setTimeout(() => {
          setFullscreen(null);
          setTranslatePerc(40 - (index - 1) * 22.5);
        }, 2000);
        return;
      }
      setTranslatePerc(translatePerc + 62 * direction);
      setTimeout(() => {
        setTranslatePerc(-(newIndex - 1) * 22.5);
        setFullscreen(newIndex);
      }, 2000);
    } else {
      let newPerc = parseFloat(translatePerc) + direction * 30;
      if (newPerc <= -160) {
        newPerc = -160;
      } else {
        if (newPerc >= 40) {
          newPerc = 40;
        }
      }
      setTranslatePerc(newPerc);
    }
    setIsScrolling(true);
    setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  }

  useLayoutEffect(() => {
    if (isFullscreen === false) return;
    if (isFullscreen === null) {
      onClick();
      setTimeout(() => {
        setMoreDetail(1);
      }, 2000);
      return;
    }
    if (isFullscreen === index) {
      setTimeout(() => {
        setMoreDetail(1);
      }, 2000);
      return;
    }
    if (isFullscreen !== index) {
      setMoreDetail(0);
      return;
    }
  }, [isFullscreen, index]);

  return (
    <Box
      onClick={(event) => isFullscreen !== index && resizeToFull(event)}
      sx={[styles.modelWrapper, {}]}
      style={{
        width: isFullscreen === index ? "100vw" : "20vw",
        height: isFullscreen === index ? "100%" : "70%",
      }}
    >
      {isFullscreen === index && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: index === 0 ? 0 : -(index - 1) * 425,
            width: 1,
            height: 0.1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 3,
            zIndex: 1,
            transition: "opacity 2s ease",
          }}
          style={{ opacity: moreDetail }}
        >
          <Box sx={{ ml: "5%", width: "95%", textAlign: "center" }}>
            {model.modelInfo.name}
          </Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: "5%", textAlign: "right" }}
            onClick={() => returnGallery()}
          >
            Back
          </Button>
        </Box>
      )}

      <Canvas
        resize={{ debounce: 25 }}
        camera={{ position: [0, 0, 10], fov: 15 }}
        rotation={[180, 0, 0]}
        style={{
          display:
            isFullscreen === index ||
            isFullscreen === false ||
            isFullscreen === null
              ? "flex"
              : moreDetail === 1
              ? "flex"
              : "none",
          opacity: moreDetail,
          transition:
            (isFullscreen === index ||
              moreDetail === 0 ||
              isFullscreen === null) &&
            "opacity 2s ease",
        }}
      >
        <ambientLight intensity={1.25} />
        <ambientLight intensity={0.1} />
        <directionalLight intensity={0.8} />
        {modelData && <primitive object={modelData} />}
        <OrbitControls
          enablePan={isFullscreen === index}
          enableRotate={isFullscreen === index}
          enableZoom={isFullscreen === index}
          target={[
            0,
            modelSizes ? (modelSizes.max.y - modelSizes.min.y) / 2 : 0,
            0,
          ]}
        />
      </Canvas>

      {isFullscreen === index && (
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            right: index === 0 ? 0 : -(index - 1) * 425,
            width: 1,
            height: 0.1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 3,
            gap: 2,
            zIndex: 1,
            transition: "opacity 2s ease",
          }}
          style={{ opacity: moreDetail }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => changeModel(1)}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => changeModel(-1)}
          >
            Next
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default Model;
