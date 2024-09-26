import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./authSlice/AuthSlice"
import TreeReducer from "./treeSlice/TreeSlice"
import CommentReducer from "./commentSlice/CommentSlice"
const store = configureStore({
    reducer:{
   authReducer:AuthReducer,
   treeReducer:TreeReducer , 
   commentReducer:CommentReducer
    }
})

export default store;