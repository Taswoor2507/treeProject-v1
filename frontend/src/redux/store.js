import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./authSlice/AuthSlice"
import TreeReducer from "./treeSlice/TreeSlice"
import CommentReducer from "./commentSlice/CommentSlice"
import UserReducer from "./userSlice/UserSlice"
const store = configureStore({
    reducer:{
   authReducer:AuthReducer,
   treeReducer:TreeReducer , 
   commentReducer:CommentReducer,
   userReducer:UserReducer,

    }
})

export default store;