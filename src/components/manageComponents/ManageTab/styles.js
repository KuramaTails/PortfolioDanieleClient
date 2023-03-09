export const tabsWrapper = {
  color: "white",
  background: "rgba(0,0,0,0.6)",
  width: 1,
  height: 0.075,
  minHeight: 0.075,
};

export const tab = {
  color: "white",
  translate: "color 1s",
  "&.Mui-disabled": {
    color: "rgba(255,255,255,0.6)",
  },
};

export const contentWrapper = {
  display: "grid",
  gridTemplateColumns: "repeat(5, 0.5fr)",
  gridTemplateRows: "200px 200px",
  gridGap: 20,
  width: 1,
  height: 0.925,
  p: 2,
};

export const imageWrapper = {
  width: 1,
  height: 1,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  transition: "filter 0.5s ease",
};

export const overlayImage = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 1,
  height: 0.2,
  gap: 3,
  position: "relative",
  bottom: "30%",
  "&>*": {
    color: "white",
    opacity: 0,
    "@keyframes buttonIn": {
      to: {
        opacity: 1,
      },
    },
    animation: `buttonIn 0.5s ease forwards`,
  },
};
