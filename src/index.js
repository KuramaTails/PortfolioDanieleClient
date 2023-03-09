import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
document.body.style.overflow = 'hidden';
root.render(<App style={{ overflow: "hidden" }} />);