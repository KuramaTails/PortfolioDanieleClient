export const wrapper = {
  opacity: 1,
  position: "static",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

export const title = {
  height: 0.15,
  width: 1,
  color: "white",
  fontSize: "4rem",
  textAlign: "center",
};

export const wrapperSection = {
  display: "flex",
  justifyContent: "space-between",
  width: 0.8,
  height: 0.75,
  "&>*": {
    mx: 2,
  },
};

export const profilePhoto = {
  backgroundSize: "cover",
  backgroundPosition: "center",
  width: 0.4,
  height: 1,
};

export const descWrapper = {
  width: 0.5,
  height: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

export const descText = {
  color: "white",
  fontSize: "1.75rem",
  textAlign: "justify",
  userSelect: "none",
  "&>*": {
    color: "hsl(280,45%,85%)",
    fontWeight: "bold",
    textDecoration: "underline",
  },
};
