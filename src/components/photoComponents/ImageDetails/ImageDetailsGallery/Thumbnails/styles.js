export const wrapper = {
  width: 0.2,
  height: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  background: "rgba(0,0,0,0.75)",
};

export const iconWrapper = {
  width: 1,
  height: 0.05,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "rgba(0,0,0,0.75)",
  cursor: "pointer",
  zIndex: 1,
};

export const contentSection = {
  width: 1,
  height: 0.9,
  display: "flex",
  p: 3,
  overflow: "hidden",
};

export const contentWrapper = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "center",
  gap: 3,
  width: 1,
  height: 1,
  transition: "transform 1s ease",
  "&>*": {
    cursor: "pointer",
  },
};

export const thumbnail = {
  width: 1,
  height: 1,
  backgroundSize: "cover",
  transition: "transform 0.5s ease",
};

export const icon = {
  opacity: 1,
  transition: "opacity 1s ease",
};
