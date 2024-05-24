import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import {blogReducer} from "./blog";

const store = configureStore({
    reducer: {
        auth: authReducer,
        blog: blogReducer
    },
});

export default  store