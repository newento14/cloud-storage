import React from "react";
import cl from "./CircleProgressBar.module.css";

const CircleProgressBar = () => {
  return (
    <div className={cl.progressBar}>
      <progress
        value="75"
        min="0"
        max="100"
        style={{ visibility: "hidden", height: 0, width: 0 }}
      >
        75%
      </progress>
    </div>
  );
};

export default CircleProgressBar;
