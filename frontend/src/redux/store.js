import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./authSlice/AuthSlice.jsx"
import TreeReducer from "./treeSlice/treeSlice.jsx"
const store = configureStore({
    reducer:{
     authReducer:AuthReducer,
     treeReducer:TreeReducer
    }
})

export default store;