import React from "react";
import cl from "./MyInput.module.css";

const MyInput = ({ image, ...props }) => {
  let padding = 15;
  if (image == true) {
    padding = 25;
  }

  return (
    <input
      {...props}
      className={cl.MyInput}
      style={{ paddingLeft: padding }}
    ></input>
  );
};

export default MyInput;
