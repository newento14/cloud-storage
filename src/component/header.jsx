import React, { useEffect, useState } from "react";
import MyInput from "../UI/input/MyInput";
import SearchIcon from "../assets/search.svg";
import MyButton from "../UI/button/MyButton";
import "../styles/header.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../reducers/authReducer";
import { SET_SEARCH_QUERY } from "../reducers/fileReducer";
import { useDebounce } from "../utils/useDebounce";

const Header = () => {
  const isAuth = useSelector((x) => x.auth.isAuth);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const debounce = useDebounce(searchQuery, 370);

  function logOut() {
    dispatch({ type: LOGOUT });
  }

  useEffect(() => {
    dispatch({ type: SET_SEARCH_QUERY, payload: { query: debounce } });
  }, [debounce]);

  function searchQueryHandler(e) {
    setSearchQuery(e.target.value);
  }

  return (
    <div className="header">
      <div className="left">
        <p>Cloud Storage</p>
      </div>

      <div className="center">
        <img src={SearchIcon} alt="hui" className="img-search" />
        <MyInput
          value={searchQuery}
          onChange={searchQueryHandler}
          image={true}
          placeholder="Search"
        />
      </div>

      <div className="right">
        {/* <img src="" className="user-picture" alt="profilePicture" /> */}
        {!isAuth ? (
          <div className="buttons">
            <MyButton>
              <Link to="/login">Log in</Link>
            </MyButton>
            <MyButton>
              <Link to="/registration">Sing up</Link>
            </MyButton>
          </div>
        ) : (
          <div className="buttons">
            <MyButton onClick={logOut}>
              <Link to="/">logOut</Link>
            </MyButton>
          </div>
        )}

        {/* <p>{userName}</p> */}
      </div>
    </div>
  );
};

export default Header;
