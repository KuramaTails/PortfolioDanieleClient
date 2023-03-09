export const formWrapper = {
  width: 1,
  height: 0.925,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
};

export const content = {
  backgroundSize: "cover",
  height: 1,
  aspectRatio: `${1920 / 1080}`,
  display: "flex",
  justifyContent: "center",
  alignItems: "end",
  gap: 4,
  p: 3,
  "&>*": {
    background: "white",
    color: "black",
  },
};
