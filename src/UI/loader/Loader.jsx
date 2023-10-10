import React from "react";
import cl from "./Loader.module.css";

const Loader = ({ visible }) => {
  const classes = [cl.center];
  if (visible) {
    classes.push(cl.active);
  }

  return (
    <div className={classes.join(" ")}>
      <span className={cl.loader}></span>
    </div>
  );
};

export default Loader;
