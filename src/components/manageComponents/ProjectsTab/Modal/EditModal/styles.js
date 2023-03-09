export const wrapper = {
  width: 0.55,
  aspectRatio: "1.33",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 4,
  p: 4,
};

export const title = {
  width: 1,
  height: 0.1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const contentWrapper = {
  width: 1,
  height: 0.2,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "start",
};

export const sectionWrapper = {
  display: "grid",
  gridTemplateColumns: "repeat(5, 0.5fr)",
  gridTemplateRows: "200px 200px",
  listStyleType: "none",
  gridGap: 20,
  width: 1,
  height: 0.925,
  p: 2,
};

export const imageModal = {
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  width: 1,
  height: 1,
  display: "block",
  cursor: "pointer",
  transition: "all 0.5s ease",
  "&::before": {
    content: '"✓"',
    backgroundColor: "grey",
    borderColor: "#ddd",
    color: "white",
    borderRadius: "50%",
    position: "absolute",
    top: "-15px",
    left: "-15px",
    width: "1.5vw",
    height: "1.5vw",
    textAlign: "center",
    lineHeight: "1.5vw",
  },
};

export const footerModal = {
  width: 1,
  height: 0.1,
  gap: 2,
  display: "flex",
  justifyContent: "end",
  alignItems: "center",
};
