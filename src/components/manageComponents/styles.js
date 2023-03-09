export const wrapper = {
  height: "100vh",
  width: "100vw",
  flexGrow: 1,
  background: "linear-gradient(168deg,#205560, #7C568F)",
};

export const secondWrapper = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: 1,
  width: 1,
};

export const thirdWrapper = {
  background: "rgba(255,255,255,0.2)",
  height: 0.95,
  aspectRatio: `${1920 / 1080}`,
  display: "flex",
  flexDirection: "row",
};

export const tabsWrapper = {
  color: "white",
  background: "rgba(0,0,0,0.6)",
  height: 1,
  width: 0.075,
  minWidth: 0.075,
};

export const tab = {
  color: "white",
  translate: "color 1s",
  "&.Mui-disabled": {
    color: "rgba(255,255,255,0.6)",
  },
};
