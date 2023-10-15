import React from "react";
import "../styles/navbar.css";
import ProgressBar from "../UI/progressBar/ProgressBar";
import { useSelector } from "react-redux";

const LeftNavbar = () => {
  const isAuth = useSelector((x) => x.auth.isAuth);
  const user = useSelector((x) => x.auth.user);

  const progressBarColorList = [
    { bgcolor: "#d62d0b", completed: 80 },
    { bgcolor: "#FF8C00", completed: 50 },
    { bgcolor: "#0b9dd6", completed: 30 },
    { bgcolor: "#5ad624", completed: 0 },
  ];

  function getPercent() {
    return parseFloat(((user.storageUsed / user.storageSize) * 100).toFixed(1));
  }

  function getColor() {
    const percent = getPercent();
    return progressBarColorList.find((x) => x.completed <= percent).bgcolor;
  }

  function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return "0 B";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["B", "KB", "MB", "GB", "TB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  return (
    <nav className="left-navbar">
      <div className="navbar-top">
        <p className="selected">All files</p>
      </div>

      {isAuth && (
        <div className="navbar-bottom">
          <ProgressBar bgcolor={getColor()} completed={getPercent()} />
          <p>
            Used {formatBytes(user.storageUsed)} \
            {formatBytes(user.storageSize)}
          </p>
        </div>
      )}
    </nav>
  );
};

export default LeftNavbar;
