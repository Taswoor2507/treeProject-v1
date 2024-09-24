import axiosInstance from "@/axiosCofig/axiosInstance"
import { createSlice } from "@reduxjs/toolkit"
export const STATUSES = {
    idle:"IDLE",
    loading:"LOADING",
    error:"ERROR",
}
const TreeSlice = createSlice({
name:"treeSlice" ,
initialState:{
    trees:[],
    tree:{},
    status:STATUSES.idle,
} ,
reducers:{
    setStatus:(state,action)=>{
        state.status=action.payload
    },
    getTrees:(state,action)=>{
        state.trees=action.payload
    },
    getTree:(state,action)=>{
        state.tree=action.payload
    },
}
})


export const { setStatus,getTrees,getTree } = TreeSlice.actions;
export default TreeSlice.reducer;


//treesThunk

export const treeThunk =()=>{
    return async function(dispatch){
        dispatch(setStatus(STATUSES.loading))
        try {
            const fetchRequest = await axiosInstance.get("/trees/all");
            const response = await fetchRequest.data;
            dispatch(getTrees(response))
            dispatch(setStatus(STATUSES.idle))
            
        } catch (error) {
            dispatch(setStatus(STATUSES.error))
        }

    }
}

export const deleteTreeThunk = (treeId) => {
    return async function (dispatch, getState) {
      dispatch(setStatus(STATUSES.loading));
      try {
        // Perform the delete request
        await axiosInstance.delete(`/trees/${treeId}`);
        
        // Option 1: Fetch the trees again from the server
        dispatch(treeThunk());  // Fetch updated list after deletion
         
        // Option 2: Manually update the state (comment out if using Option 1)
        // const currentTrees = getState().treeReducer.trees;
        // const updatedTrees = currentTrees.filter(tree => tree._id !== treeId);
        // dispatch(getTrees(updatedTrees));
  
        dispatch(setStatus(STATUSES.idle));
      } catch (error) {
        console.log(error);
        dispatch(setStatus(STATUSES.error));
      }
    };
  };
  
  

  