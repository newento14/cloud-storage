import "./styles/main.css";
import React, {useEffect} from "react";
import Header from "./component/header";
import Error from "./component/error";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Api from "./services/user";
import Home from "./pages/home";
import LeftNavbar from "./component/LeftNavbar";
import Login from "./component/login";
import Registration from "./component/registration";
import HomeNotAuth from "./pages/homeNotAuth";

function App() {
    const isAuth = useSelector((x) => x.auth.isAuth);

    const dispatch = useDispatch();
    const isLoading = useSelector(x => x.auth.isLoading)

    useEffect(() => {
        if (!isAuth && localStorage.getItem("token") != null) {
            Api.Auth()(dispatch);
        }
    }, []);

    const notAuthRoutes = (
        <Routes>
            <Route path="/home" element={<HomeNotAuth/>}/>
            <Route path="/registration" element={<Registration/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/error" element={<Error/>}/>
            <Route path="*" element={<Navigate to="/home" replace/>}/>
        </Routes>
    );

    const AuthRoutes = (
        <Routes>
            <Route path="/home" element={<Home/>}/>
        </Routes>
    );

    return (
        <BrowserRouter>
            {isLoading ?
                <div style={{width: '100vw', height: '100vh', display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <span className="loader"/>
                </div>
                :
                <div style={{paddingTop: 50}}>
                    <Header/>
                    {!isAuth ? (
                        <div className="center-div">{notAuthRoutes}</div>
                    ) : (
                        <>
                            <LeftNavbar/>
                            <div className="main">{AuthRoutes}</div>
                        </>
                    )}
                </div>
            }
        </BrowserRouter>
    );
}

export default App;
