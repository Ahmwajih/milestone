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
    auth (state, action)  {
      state.currentUser = action.payload.username;
      state.token = action.payload.token;
      state.email = action.payload.email;
    },
  },
});

export const login = (userInfo, navigate) => async (dispatch) => {
  try {
    const res = await axios.post(`${url}/users/auth/login/`, userInfo);
    console.log(res.data);
    if (!res.data.key) throw Error("Login Failed");
    const playload = {
      token: res.data.key,
      currentUser: res.data.user.username,
      email: res.data.user.email,
    };
    dispatch(authSlice.actions.auth(playload));

    sessionStorage.setItem("username", res.data.user.username);
    sessionStorage.setItem("token", res.data.key);
    sessionStorage.setItem("email", res.data.user.email);
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
    if (!res.data.key) throw Error("Registration Failed");
    const playload = {
      token: res.data.key,
      currentUser: res.data.user.username,
      email: res.data.user.email,
    };
    dispatch(authSlice.actions.auth(playload));

    sessionStorage.setItem("username", res.data.user.username);
    sessionStorage.setItem("token", res.data.key);
    sessionStorage.setItem("email", res.data.user.email);
    toast.success("Registration Successful");
    navigate("/");
  } catch (error) {
    toast.error("Registration Failed");
  }
};

export const logout = (navigate) => async (dispatch) => {
  try {
    const res = await axios.post(`${url}/users/auth/logout/`);
    if (res.status === 200 || res.status === 204) {
      const payload = { token: false, currentUser: false };
      dispatch(authSlice.actions.auth(payload));
      sessionStorage.clear();
      toast.success("Logout Successful");
      navigate("/");
    }
  } catch (error) {
    toast.error("Logout Failed");
  }
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


export const UserProfile = () => async (dispatch) => {
  try {
    const res = await axios(`${url}/users/auth/user/`);
    if (res.status !== 200) {
        throw new Error('Failed to fetch user profile');
    }
    const payload = {
      pk: res.data.pk,
      username: res.data.username,
      email: res.data.email,
      first_name: res.data.first_name,
      last_name: res.data.last_name,
    };
    dispatch(authSlice.actions.auth(payload));
    toast.success("User profile fetched successfully");
  } catch (error) {
    toast.error("Failed to fetch user profile");
    console.error(error);
  }
};

export default authSlice.reducer;