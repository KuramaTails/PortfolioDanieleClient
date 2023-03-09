export const image = {
  zIndex: 3,
  boxShadow: "0px 50px 25px rgba(0, 0, 0, 0.3)",
  "&::before": {
    content: "''",
    position: "relative",
    display: "block",
    width: "100%",
    height: "100%",
    bottom: "-102%",
    background: "inherit",
    transform: "scaleY(-1)",
    boxShadow:
      "0px 50px 70px rgba(0, 0, 0, 0.3),0px 10px 10px rgba(0, 0, 0, 0.1)",
    filter: "blur(5px) opacity(25%)",
  },
};
