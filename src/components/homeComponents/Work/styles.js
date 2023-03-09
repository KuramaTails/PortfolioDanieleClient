export const wrapper = {
  display: "flex",
  position: "static",
  top: 0,
  justifyContent: "center",
  alignItems: "center",
  opacity: 1,
};

export const miniwrapper = {
  position: "absolute",
  left: 0,
  width: 1,
  height: 1,
  background: "white",
  zIndex: 2,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  mixBlendMode: "screen",
  "@keyframes visibility": {
    to: {
      visibility: "hidden",
    },
  },
  animation: `visibility 8s forwards`,
};

export const secondWrapper = {
  height: 0.3,
  width: 1,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  whiteSpace: "nowrap",
  overflowX: "hidden",
  "@keyframes workAnimation": {
    to: {
      transform: "scale(20)",
      display: "none",
    },
  },
  animation: `workAnimation 4s 4s ease-in-out forwards`,
};

export const textOverlay = {
  fontSize: "25rem",
  transform: "translateY(-150%)",
  "@keyframes translateIn": {
    to: {
      transform: "translateY(0%)",
    },
  },
  animation: `translateIn 1s 2s ease-out forwards`,
};

export const oLetterOverlay = {
  mt: 12,
  width: "12.5rem",
  height: "12.5rem",
  background: "black",
  verticalAlign: "bottom",
  borderRadius: "50%",
};

export const thirdWrapper = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "start",
  alignContent: "center",
  height: 1,
  width: 1,
  zIndex: 1,
  "&>*": {
    "@keyframes backgroundAnimation": {
      "0%": {
        backgroundSize: "100%",
      },
      "50%": {
        backgroundSize: "125%",
      },
      "100%": {
        backgroundSize: "100%",
      },
    },
    animation: `backgroundAnimation 25s 2.5s ease infinite`,
  },
};

export const section = {
  width: 1,
  height: 0.5,
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "center",
  top: "25%",
  position: "relative",
  transition: "opacity 1s ease",
  "&>*": {
    my: 6,
  },
};

export const buttonSection = {
  background: "white",
  color: "black",
  my: 6,
  position: "relative",
  transition: "all 0.5s ease",
  "&:hover": {
    color: "white",
  },
};
