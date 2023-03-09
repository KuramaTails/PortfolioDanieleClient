export const wrapper = {
  position: "absolute",
  top: 0,
  zIndex: 0,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
};

export const secondWrapper = {
  height: 1,
  width: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};


export const title ={
    height: 0.1,
    textAlign: "center",
    fontSize: "2rem",
    my: 3,
    justifyContent: "center",
    alignItems: "center",
    userSelect: "none",
    transition: "opacity 1s ease",
  }


  export const goBack ={
    position: "absolute",
    right: 0,
    top: 0,
    color: "white",
    zIndex: 1,
  }

  export const contentSection = {
    height: 1,
    width: 1,
    top: 0,
    left: 0,
    display: "grid",
    gridAutoFlow: "column",
    gridGap: 2,
    justifyContent: "start",
    alignItems: "center",
    gap: "2.5%",
    transition: "transform 2s ease",
    userSelect: "none",
    position: "absolute",
    zIndex: 0,
  }

  export const footerWrapper =  {
    height: 0.1,
    my: 3,
    justifyContent: "center",
    alignItems: "center",
    userSelect: "none",
  }

  export const footerContainer = {
    display: "flex",
    fontSize: "1rem",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    position: "static",
    zIndex: 2,
    transition: "opacity 1s ease",
  }