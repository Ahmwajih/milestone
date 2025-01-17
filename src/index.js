import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store = {store} >
    <BrowserRouter>
      <React.StrictMode>
        <App />
        <ToastContainer />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);
