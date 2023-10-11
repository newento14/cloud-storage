import React from "react";
import MyInput from "../UI/input/MyInput";
import SearchIcon from "../icons/search.svg";
import MyButton from "../UI/button/MyButton";
import "../styles/header.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../reducers/authReducer";

const Header = () => {
  const isAuth = useSelector((x) => x.auth.isAuth);
  const dispatch = useDispatch();

  function logOut() {
    dispatch({ type: LOGOUT });
  }

  return (
    <div className="header">
      <div className="left">
        <p>Cloud Storage</p>
      </div>

      <div className="center">
        <img src={SearchIcon} alt="hui" className="img-search" />
        <MyInput image={true} placeholder="Search" />
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
            <MyButton>
              <Link to="/profile">profile</Link>
            </MyButton>
            <MyButton onClick={logOut}>
              <Link to="/">logOut</Link>
            </MyButton>
          </div>
        )}

        <MyButton>Premium</MyButton>

        {/* <p>{userName}</p> */}
      </div>
    </div>
  );
};

export default Header;
