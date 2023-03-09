export const AppBar = {
  position: "fixed",
  top: 0,
  right: 0,
  width: 0.05,
  height: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1,
};

export const circle = {
  my: 2,
  width: "2rem",
  height: "2rem",
  borderRadius: "50%",
  cursor: "pointer",
  background: "white",
  transition: "background 1s",
  "&:hover": {
    background: "#170F3D",
    border: "2px solid #8F7DE8",
  }
};

export const active = {
  background: "#8F7DE8",
  border: "2px solid white",
  cursor: "default",
  "&:hover": {},
};
