import { createSlice } from "@reduxjs/toolkit"
import { setStatus, STATUSES } from "../treeSlice/treeSlice"
const userSlice= createSlice(
    {
        name:"users",
        initialState:{
            users:[],
            user:{},
            status:STATUSES.idle ,
        } , 
        reducers:{
            setUserStatus:(state,action)=>{
                state.status=action.payload
            },
            getUsers:(state,action)=>{
                state.users=action.payload
            }
        } 

    }
)
export const {setUserStatus , getUsers} =userSlice.actions;
export default userSlice.reducer;
export const userRequestThunk = function(){
  return async function(dispatch){
    dispatch(setUserStatus(STATUSES.loading))
    try{
      const response = await fetch("http://localhost:4040/api/users/all")
      if(!response.ok){
        dispatch(setUserStatus(STATUSES.error))
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      dispatch(getUsers(data))
      dispatch(setUserStatus(STATUSES.idle))
    } catch(error){
      dispatch(setUserStatus(STATUSES.error))
    }
  }
}