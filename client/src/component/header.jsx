import React, {useEffect, useState} from "react";
import MyInput from "../UI/input/MyInput";
import SearchIcon from "../assets/search.svg";
import "../styles/header.css";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {SET_SEARCH_QUERY} from "../reducers/fileReducer";
import {useDebounce} from "../utils/useDebounce";
import DropDownMenu from "../UI/dropDownMenu";

const Header = () => {
  const isAuth = useSelector((x) => x.auth.isAuth);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const debounce = useDebounce(searchQuery, 370);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({type: SET_SEARCH_QUERY, payload: {query: debounce}});
  }, [debounce]);

  function searchQueryHandler(e) {
    setSearchQuery(e.target.value);
  }

  return (<div className="header">
    <div className="left">
      <p style={{cursor: "pointer"}} onClick={() => navigate('home')}>Cloud Storage</p>
    </div>

    {isAuth &&
      <div className="center">
        <img src={SearchIcon} alt="hui" className="img-search"/>
        <MyInput
          value={searchQuery}
          onChange={searchQueryHandler}
          image={true}
          placeholder="Search"
        />
      </div>}

    <div className="right">
      {/* <img src="" className="user-picture" alt="profilePicture" /> */}
      {!isAuth ? (<div className="buttons">
        <button className="btn">
          <Link to="/login"><p style={{color: "white"}}>Log in</p></Link>
        </button>
        <button className="btn">
          <Link to="/registration"><p style={{color: "white"}}>Sing up</p></Link>
        </button>
      </div>) : (<div className="buttons">
        <DropDownMenu/>
      </div>)}
    </div>
  </div>);
};

export default Header;
