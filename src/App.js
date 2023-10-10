import "./styles/main.css";
import React, { useEffect, useState } from "react";
import Header from "./component/header";
import Error from "./component/error";
import LeftNavbar from "./component/LeftNavbar";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Registration from "./component/registration";
import Login from "./component/login";
import Loader from "./UI/loader/Loader";
import Api from "./Api/user";
import Home from "./pages/home";

function App() {
  const isAuth = useSelector((x) => x.isAuth);

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAuth && localStorage.getItem("token") != null) {
      setIsLoading(true);
      Api.Auth()(dispatch);
    }
    setIsLoading(false);
  }, []);

  const notAuthRoutes = (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/error" element={<Error />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );

  const AuthRoutes = (
    <Routes>
      <Route path="/home" element={<Home />} />
    </Routes>
  );

  return (
    <BrowserRouter>
      <div className="padding">
        <Header />
        <LeftNavbar />
        {!isAuth ? (
          <div className="center-div">{notAuthRoutes}</div>
        ) : (
          <div>{AuthRoutes}</div>
        )}
      </div>
      )
    </BrowserRouter>
  );
}

export default App;
