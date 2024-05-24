import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const url = "https://48217.fullstack.clarusway.com";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: sessionStorage.getItem("username") || false,
    token:
      sessionStorage.getItem("token") && atob(sessionStorage.getItem("token")),
    email: "",
  },
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload.username;
      state.token = action.payload.token;
      state.email = action.payload.email;
    },
  },
});

export const login = (userInfo, navigate) => async (dispatch) => {
  try {
    const res = await axios.post(`${url}/users/auth/login/`, userInfo);
    if (!res.data.token) throw Error("Login Failed");
    const playload = {
      token: res.data.token,
      currentUser: res.data.username,
    };
    dispatch(authSlice.actions.auth(playload));

    sessionStorage.setItem("username", res.data.username);
    sessionStorage.setItem("token", res.data.token);
    sessionStorage.setItem("email", res.data.email);
    toast.success("Login Successful");
    navigate("/");
  } catch (error) {
    toast.error("Login Failed");
    console.log(error);
  }
};

export const register = (userInfo, navigate) => async (dispatch) => {
  try {
    const res = await axios.post(`${url}/users/register/`, userInfo);
    if (!res.data.token) throw Error("Registration Failed");
    const playload = {
      token: res.data.token,
      currentUser: res.data.username,
      email: res.data.email,
    };
    dispatch(authSlice.actions.auth(playload));

    sessionStorage.setItem("username", res.data.username);
    sessionStorage.setItem("token", res.data.token);
    sessionStorage.setItem("email", res.data.email);
    toast.success("Registration Successful");
    navigate("/");
  } catch (error) {
    toast.error("Registration Failed");
  }
};

export const logout = (navigate) => {
  return async (dispatch) => {
    try {
      const token = atob.sessionStorage.getItem("token");
      const res = await axios.post(`${url}/users/auth/logout/`, {
        Headers: {
          Authorization: `Token ${token}`,
        },
      });
      if (res.status === 200) {
        dispatch(authSlice.actions.auth({ token: false, currentUser: false }));
        sessionStorage.clear();
        toast.success("Logout Successful");
        navigate("/");
      }
    } catch (error) {
      toast.error("Logout Failed");
    }
  };
};

export const changePassword = (newPassword) => {
  return async (dispatch) => {
    try {
      const token = atob.sessionStorage.getItem("token");
      const res = await axios(`${url}/users/auth/password/change/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        data: newPassword,
      });
      if (res.status === 200) {
        toast.success("Password Changed");
      }
    } catch (error) {
      toast.error("Password Change Failed");
    }
  };
};

export default authSlice.reducer;