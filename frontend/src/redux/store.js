import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./authSlice/AuthSlice.jsx"
import TreeReducer from "./treeSlice/treeSlice.jsx"
import UserReducer from "./userSLice/UserSlice.jsx"
const store = configureStore({
    reducer:{
     authReducer:AuthReducer,
     treeReducer:TreeReducer ,
     userReducer:UserReducer ,
    }
})

export default store;