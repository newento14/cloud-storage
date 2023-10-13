import React, { useMemo, useState } from "react";
import "../styles/table.css";
import ArrowUp from "../assets/arrowUp.png";
import ArrowDown from "../assets/arrowDown.png";
import TableElement from "./tableElement";
import { useSelector } from "react-redux";

const Table = () => {
  const files = useSelector((x) => x.files.files);
  const searchQuery = useSelector((x) => x.files.searchQuery);

  const [sortParams, setSortParams] = useState({
    name: 0,
    size: 0,
    date: 0,
  });

  function nameClickHandler() {
    const value = sortParams.name === 0 ? 1 : sortParams.name === 2 ? 1 : 2;
    setSortParams({ name: value, size: 0, date: 0 });
  }

  function sizeClickHandler() {
    const value = sortParams.size === 0 ? 1 : sortParams.size === 2 ? 1 : 2;
    setSortParams({ name: 0, size: value, date: 0 });
  }

  function dateClickHandler() {
    const value = sortParams.date === 0 ? 1 : sortParams.date === 2 ? 1 : 2;
    setSortParams({ name: 0, size: 0, date: value });
  }

  const sortedArray = useMemo(() => {
    const res = [...files];
    res.sort((a, b) => {
      if (sortParams.name === 1) {
        return a.name.localeCompare(b.name);
      }
      if (sortParams.name === 2) {
        return b.name.localeCompare(a.name);
      }
      if (sortParams.size === 1) {
        return a.size - b.size;
      }
      if (sortParams.size === 2) {
        return b.size - a.size;
      }
      if (sortParams.date === 1) {
        return a.date.localeCompare(b.date);
      }
      if (sortParams.date === 2) {
        return b.date.localeCompare(a.date);
      }
      return 0;
    });
    return res;
  }, [sortParams, files]);

  const sortedAndSearcegArray = useMemo(() => {
    return sortedArray.filter((x) =>
      x.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, sortedArray]);

  return (
    <div>
      <div className="table-header">
        <div className="table-name" onClick={nameClickHandler}>
          Name
          {sortParams.name !== 0 && (
            <img
              src={sortParams.name === 1 ? ArrowUp : ArrowDown}
              className="icon"
              alt="sortArrow"
            />
          )}
        </div>
        <div className="table-size" onClick={sizeClickHandler}>
          Size
          {sortParams.size !== 0 && (
            <img
              src={sortParams.size === 1 ? ArrowUp : ArrowDown}
              className="icon"
              alt="sortArrow"
            />
          )}
        </div>
        <div className="table-access">Access</div>
        <div className="table-date" onClick={dateClickHandler}>
          Date
          {sortParams.date !== 0 && (
            <img
              src={sortParams.date === 1 ? ArrowUp : ArrowDown}
              className="icon"
              alt="sortArrow"
            />
          )}
        </div>
      </div>
      {sortedAndSearcegArray.map((x) => (
        <TableElement key={x.id} file={x} />
      ))}
    </div>
  );
};

export default Table;
