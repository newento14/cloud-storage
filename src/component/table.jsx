import React, { useEffect, useState } from "react";
import Api from "../Api/user";
import "../styles/table.css";
import TableElement from "./tableElement";

const Table = () => {
  const [files, setFiles] = useState([{}]);
  async function getFiles() {
    setFiles(await Api.GetFilesByUserid());
  }

  useEffect(() => {
    getFiles();
  }, []);
  console.log(files);
  return (
    <div>
      <div className="table-header">
        <div className="table-name">Name</div>
        <div className="table-size">Size</div>
        <div className="table-access">Access</div>
        <div className="table-date">Date</div>
      </div>
      {files.map((x) => (
        <TableElement key={x.name} file={x} />
      ))}
    </div>
  );
};

export default Table;
