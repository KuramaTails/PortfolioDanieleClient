export const wrapper = {
  display: "flex",
  justifyContent: "end",
  alignItems: "end",
  position: "relative",
  bottom: 0,
  right: 0,
  m: 3,
  width: 0.25,
};

export const secondWrapper = {
  display: "grid",
  justifyContent: "start",
  alignItems: "center",
  position: "absolute",
  background: "rgba(0,0,0,0.7)",
  transition: "opacity 1s ease",
  listStyle: "none",
  width: 1,
  m: 0,
  p: 2,
};

export const thirdWrapper = {
  transition: "all 1s ease",
  color: "white",
  borderRadius: "50%",
  width: "3rem",
  height: "3rem",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};
