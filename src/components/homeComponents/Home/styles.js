export const homeWrapper = {
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
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
  backgroundAttachment: "fixed",
  opacity: 1,
  position: "static",
  top: 0,
  mixBlendMode: "luminosity",
};

export const nameContainer = {
  width: 1,
  ml: 20,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "start",
  position: "relative",
  left: "0vw",
};

export const nameWrapper = {
  display: "flex",
  whiteSpace: "nowrap",
  overflow: "hidden",
};

export const text = {
  transform: "translateY(100%)",
  color: "white",
  fontSize: "9rem",
  textShadow: "3px 3px #000",
  "@keyframes textIn": {
    "75%": {
      transform: "translateY(-10%)",
    },
    "100%": {
      transform: "translateY(0%)",
    },
  },
};

export const mouseWrapper = {
  position: "absolute",
  bottom: "2vh",
  display: "flex",
  justifyContent: "end",
  alignItems: "center",
  flexDirection: "column",
  opacity: 0,
  "@keyframes opacity": {
    "100%": {
      opacity: 1,
    },
  },
  animation: "opacity 2s 3s ease-out forwards",
};

export const mouse = {
  display: "grid",
  width: "3.5vh",
  height: "6vh",
  borderRadius: 6,
  boxShadow: "inset 0 0 0 3px #fff",

  alignItems: "start",
  justifyItems: "center",
  "&::before": {
    content: '""',
    display: "block",
    position: "relative",
    background: "#fff",
    width: "0.5vh",
    height: "0.75vh",
    borderRadius: 1,
    top: "1vh",

    "@keyframes animateScroll": {
      "100%": {
        top: "2vh",
        opacity: 0,
      },
    },
    animation: "animateScroll 2s infinite",
  },
};
