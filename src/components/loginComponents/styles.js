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

export const formWrapper = {
  background: "rgba(0,0,0,0.3)",
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: 0.7,
  width: 0.3,
};

export const titleForm = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: 0.2,
  width: 1,
};

export const sectionForm = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: 0.6,
  width: 1,
};

export const textFieldForm = {
  width: 1,
  height: 0.25,
  "&>*": {
    "&.MuiFormLabel-root": {
      color: "white",
    },

    "&.MuiInputBase-root": {
      color: "white",
      borderColor: "white",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(255,255,255,0.5)",
      },
      "&.Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(255,255,255,1)",
        },
      },
    },
  },
};

export const buttonWrapper = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: 0.2,
  width: 1,
};

export const button = {
  background: "white",
  color: "black",
  width: 0.2,
  height: 0.4,
};
