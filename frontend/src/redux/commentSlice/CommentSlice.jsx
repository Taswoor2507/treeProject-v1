import { createSlice } from "@reduxjs/toolkit"
import { STATUSES } from "../treeSlice/TreeSlice"
import axiosInstance from "@/axiosCofig/axiosInstance"

const CommentSlice = createSlice({
 name:"commentsSlice",
 initialState:{
    comments:[],
    comment:{},
    status:STATUSES.idle,
 } , 
 reducers:{
    setStatus:(state,action)=>{
        state.status=action.payload
    },
    getComments:(state,action)=>{
        state.comments=action.payload
    },
 }
})
export default CommentSlice.reducer ;
export const {setStatus, getComments} = CommentSlice.actions;

// thunk functions
export const commentsThunk = function(){
    return async function(dispatch){
        dispatch(setStatus(STATUSES.loading));
        try {
            const fetchRequest = await axiosInstance.get("/comments/all");
            const response = fetchRequest.data;  // response might already be `data`
            console.log(response);  // Log to see the structure of the data
            dispatch(getComments(response));
            dispatch(setStatus(STATUSES.idle));
        } catch (error) {
            console.log(error)
            dispatch(setStatus(STATUSES.error));
        }
    }
}



//getTreeComments 
export const getTreeComments = function(treeId){
    return async function(dispatch){
        dispatch(setStatus(STATUSES.loading));
        try {
            const fetchRequest = await axiosInstance.get(`/comments/get-all-comments/${treeId}`);
            const response = fetchRequest.data;  // response might already be `data`
            console.log(" specific tree comments" , response);  // Log to see the structure of the data
            dispatch(getComments(response));
            dispatch(setStatus(STATUSES.idle));
        } catch (error) {
            console.log(error)
            dispatch(setStatus(STATUSES.error));
        }
    }
}