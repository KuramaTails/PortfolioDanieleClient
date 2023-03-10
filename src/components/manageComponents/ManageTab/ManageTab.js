import { Box, Button, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import ModalComponent from "./Modal/Modal";
import pako from "pako";
import * as styles from "./styles";

function ManageTab() {
  const [currentTab, setCurrentTab] = useState(0);
  const [images, setImages] = useState(null);
  const [modalState, showModal] = useState(undefined);
  const [modalType, setModalType] = useState(null);
  const [clickedImage, setClickedImage] = useState(null);
  const [mouseOver, setMouseOver] = useState(null);

  let categories = ["General", "Photo", "Models"];

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://portfoliodanieleserver.onrender.com/",
      },
    };
    const fetchProjects = async () => {
      const response = await fetch(
        `https://portfoliodanieleserver.onrender.com/requestType?type=${categories[currentTab]}`,
        requestOptions
      );
      const data = response.status == 200 && (await response.json());
      (!data || !data.availableImages) && setImages(null);
      if (!data) return;
      let fetchedImages = data.map((image, index) => {
        let binary = atob(image.image.split(",")[1]);
        let binaryData = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          binaryData[i] = binary.charCodeAt(i);
        }
        let decompressed = pako.inflate(binaryData);
        let blob = new Blob([decompressed], { type: "image/webp" });
        let decompressedImage = URL.createObjectURL(blob);
        data[index].image = decompressedImage;
        return data[index];
      });
      setImages(fetchedImages);
      let newArr = Array.from({ length: fetchedImages.length }, () => false);
      setMouseOver(newArr);
    };
    fetchProjects().catch(console.error);
  }, [currentTab]);

  const handleMouseOver = (index) => {
    setMouseOver([
      ...mouseOver.slice(0, index),
      !mouseOver[index],
      ...mouseOver.slice(index + 1),
    ]);
  };

  return (
    <Box sx={{ width: 0.95, height: 1 }}>
      <Tabs
        textColor="secondary"
        variant="fullWidth"
        sx={styles.tabsWrapper}
        value={currentTab}
        onChange={(event, newStats) => setCurrentTab(newStats)}
        aria-label="basic tabs example"
      >
        {categories.map((category, index) => (
          <Tab
            disabled={currentTab === index}
            value={index}
            key={index}
            label={category}
            sx={styles.tab}
          ></Tab>
        ))}
      </Tabs>
      <Box sx={styles.contentWrapper}>
        {images &&
          images.map((image, index) => (
            <Box
              onMouseEnter={() => handleMouseOver(index)}
              onMouseLeave={() => handleMouseOver(index)}
              key={index}
            >
              <Box
                sx={styles.imageWrapper}
                style={{
                  backgroundImage: `url(${image.image})`,
                  filter: mouseOver[index] && "brightness(0.4) ",
                }}
              ></Box>
              {mouseOver[index] && (
                <Box sx={styles.overlayImage}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                      setClickedImage(image);
                      setModalType("edit");
                      showModal(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      setClickedImage(image);
                      setModalType("delete");
                      showModal(true);
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              )}
            </Box>
          ))}
      </Box>
      {modalState !== undefined && (
        <ModalComponent
          state={modalState}
          hide={() => showModal(undefined)}
          category={categories[currentTab]}
          modalType={modalType}
          clickedImage={clickedImage}
          images={images}
          setImages={setImages}
        />
      )}
    </Box>
  );
}

export default ManageTab;
