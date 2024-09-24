import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./authSlice/AuthSlice"
import TreeReducer from "./treeSlice/TreeSlice"
const store = configureStore({
    reducer:{
   authReducer:AuthReducer,
   treeReducer:TreeReducer

    }
})

export default store;