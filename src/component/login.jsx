import React from "react";
import MyInput from "../UI/input/MyInput";
import MyButton from "../UI/button/MyButton";
import user from "../Api/user";
import "../styles/registration.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="registration-form">
      <MyInput
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        type="email"
        placeholder="Email"
      />
      <MyInput
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        type="password"
        placeholder="Password"
      />
      <MyButton
        onClick={() => {
          user.Login(form)(dispatch);
          navigate("/home");
        }}
      >
        Log in
      </MyButton>
    </div>
  );
};

export default Login;
