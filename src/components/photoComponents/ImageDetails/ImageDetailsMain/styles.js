export const wrapper = {
  width: 1,
  height: 1,
  transition: "opacity 1s ease,transform 2s ease",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  background: "rgba(0,0,0,0.3)",
};

export const secondWrapper = {
  position: "absolute",
  bottom: 0,
  width: 1,
  height: 0.2,
  display: "flex",
  justifyContent: "end",
  alignItems: "end",
};

export const thirdWrapper = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 1,
  height: 1,
  position: "absolute",
  my: 3,
};

export const button = {
  background: "#fff",
  transition: "all 1s ease",
  color: "#205560",
  "&:hover": { background: "#205560", color: "white" },
};
