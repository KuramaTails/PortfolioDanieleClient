import { Box, Tab, Tabs } from "@mui/material";
import React, { useLayoutEffect, useState } from "react";
import MainPhoto from "./MainPhoto/MainPhoto";
import ModalComponent from "./Modal/Modal";
import pako from "pako";
import * as styles from "./styles";

function GeneralTab() {
  const [currentTab, setCurrentTab] = useState(0);
  const [availableImages, setAvailableImages] = useState(null);
  const [currentImages, setCurrentImages] = useState(null);

  const [modalState, showModal] = useState(undefined);
  let categories = ["Main", "Photo", "Models", "Profile"];
  useLayoutEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:5000/",
      },
    };
    const fetchProjects = async () => {
      const response = await fetch(
        `http://localhost:5000/findGeneral?cat=${categories[currentTab]}`,
        requestOptions
      );
      const data = response.status === 200 && (await response.json());
      if (!data) return;
      let { images, currentImages } = data;
      images.forEach((image, index) => {
        let binary = atob(image.image.split(",")[1]);
        let binaryData = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          binaryData[i] = binary.charCodeAt(i);
        }
        let decompressed = pako.inflate(binaryData);
        let blob = new Blob([decompressed], { type: "image/webp" });
        let decompressedImage = URL.createObjectURL(blob);
        images[index].image = decompressedImage;
      });
      setAvailableImages(images);
      setCurrentImages(currentImages);
    };
    fetchProjects().catch(console.error);
  }, []);
  return (
    <Box sx={styles.wrapper}>
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
      <MainPhoto
        showModal={() => showModal(true)}
        availableImages={availableImages}
        currentImages={currentImages}
        category={categories[currentTab]}
      />
      {modalState !== undefined && (
        <ModalComponent
          state={modalState}
          hide={() => showModal(undefined)}
          category={categories[currentTab]}
          availableImages={availableImages}
          currentImages={currentImages}
          setCurrentImages={setCurrentImages}
        />
      )}
    </Box>
  );
}

export default GeneralTab;
