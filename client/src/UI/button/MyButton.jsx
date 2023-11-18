import React from "react";
import cl from "./MyButton.module.css";

const MyButton = ({ btnColor, textColor, children, ...props }) => {
  return (
    <div className={cl.btn}>
      <button
        className={cl.myButton}
        {...props}
        style={{ backgroundColor: btnColor, color: textColor }}
      >
        {children}
      </button>
    </div>
  );
};

export default MyButton;
