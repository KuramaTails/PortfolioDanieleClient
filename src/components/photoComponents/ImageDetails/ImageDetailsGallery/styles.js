export const wrapper = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "center",
  width: 1,
  height: 1,
  transform: "translateY(-100%)",
  background: "rgba(0,0,0,0.75)",
};

export const projectTitle = {
  display: "flex",
  height: 0.1,
  width: 1,
  justifyContent: "center",
  alignItems: "center",
  fontSize: "2rem",
};

export const projectSection = {
  height: 0.8,
  width: 1,
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "start",
  overflow: "hidden",
  gap: 6,
};

export const buttonWrapper = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  bottom: 0,
  m: 2,
};

export const buttonStyle = {
    background: "rgba(255,255,255,0.75)",
    transition: "all 1s ease",
    "&:hover": { background: "blue", color: "white" },
  }
