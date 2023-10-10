import React from "react";
import cl from "./MyButton.module.css";

const MyButton = ({ btnColor, textColor, icon, children, ...props }) => {
  let content;
  if (icon !== undefined) {
    content = <img src={icon} className={cl.icon} alt="icon" />;
  }

  return (
    <div className={cl.btn}>
      <button
        className={cl.myButton}
        {...props}
        style={{ backgroundColor: btnColor, color: textColor }}
      >
        {content}
        {children}
      </button>
    </div>
  );
};

export default MyButton;
