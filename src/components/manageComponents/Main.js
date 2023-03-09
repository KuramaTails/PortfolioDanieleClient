import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GeneralTab from "./GeneralTab/GeneralTab";
import ManageTab from "./ManageTab/ManageTab";
import ProjectsTab from "./ProjectsTab/ProjectsTab";
import SettingsTab from "./SettingsTab/SettingsTab";
import UploadTab from "./UploadTab/UploadTab";
import * as styles from "./styles";

function Main() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(0);
  let categories = [
    "General",
    "Manage",
    "Projects",
    "Upload",
    "Settings",
    "Log Out",
  ];

  function renderTabContent() {
    switch (currentTab) {
      case 0:
        return <GeneralTab />;
      case 1:
        return <ManageTab />;
      case 2:
        return <ProjectsTab />;
      case 3:
        return <UploadTab />;
      case 4:
        return <SettingsTab />;
      case 5:
        return navigate("/");
      default:
        return null;
    }
  }

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.secondWrapper}>
        <Box sx={styles.thirdWrapper}>
          <Tabs
            textColor="secondary"
            orientation="vertical"
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
          {renderTabContent()}
        </Box>
      </Box>
    </Box>
  );
}

export default Main;
