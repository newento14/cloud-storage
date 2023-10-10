import React from "react";
import MyInput from "../UI/input/MyInput";
import MyButton from "../UI/button/MyButton";
import user from "../Api/user";
import "../styles/registration.css";
import { useState } from "react";

const Registration = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  async function Submit(e) {
    await user.Registration(form);
  }

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
      <MyButton onClick={Submit}>Sign Up</MyButton>
    </div>
  );
};

export default Registration;
