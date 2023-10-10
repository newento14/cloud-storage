import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import reducer from "./reducers/authReducer";

const store = createStore(reducer);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
