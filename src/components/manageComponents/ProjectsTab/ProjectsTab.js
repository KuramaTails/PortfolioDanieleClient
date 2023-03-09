import { Box, Button, Card, Tab, Tabs } from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import ModalComponent from "./Modal/Modal";
import * as styles from "./styles";

function ProjectsTab() {
  const [currentTab, setCurrentTab] = useState(0);
  const [projects, setProjects] = useState(null);
  const [projectsElements, setProjectsElements] = useState(null);
  const [modalState, showModal] = useState(undefined);
  const [modalType, setModalType] = useState(null);
  const [clickedProject, setClickedProject] = useState(null);

  let categories = ["Photography", "Modelling"];

  const deleteProject = (id) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:5000/",
      },
      body: JSON.stringify({ projectId: id }),
    };
    fetch(
      `http://localhost:5000/deleteProject?type=${categories[currentTab]}`,
      requestOptions
    )
      .then((response) => {
        setProjects(projects.filter((project) => project._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (modalState) return;
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:5000/",
      },
    };
    fetch(
      `http://localhost:5000/requestProjects?type=${categories[currentTab]}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        (!data || !data.availableImages) && setProjects(null);
        setProjects(data.projects);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentTab, modalState]);

  useLayoutEffect(() => {
    let arrProjects = [];
    if (projects) {
      for (const project of projects) {
        arrProjects.push(
          <Card
            key={project._id}
            variant="outlined"
            sx={{
              height: 0.1,
              width: 1,
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              gap: 3,
              p: 3,
            }}
          >
            <Box
              sx={{
                height: 1,
                mr: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {project.name}
            </Box>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setModalType("edit");
                setClickedProject(project);
                showModal(true);
              }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => deleteProject(project._id)}
            >
              Delete
            </Button>
          </Card>
        );
      }
    }
    setProjectsElements(arrProjects);
  }, [projects]);

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
        <Box sx={styles.sectionWrapper}>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              setModalType("add");
              showModal(true);
            }}
          >
            Add {categories[currentTab]} Project
          </Button>
        </Box>
        <Box sx={styles.projectWrapper}>{projectsElements}</Box>
      </Box>
      {modalState !== undefined && (
        <ModalComponent
          state={modalState}
          show={() => showModal(true)}
          hide={() => showModal(undefined)}
          modalType={modalType}
          type={categories[currentTab]}
          clickedProject={clickedProject}
        />
      )}
    </Box>
  );
}

export default ProjectsTab;
