import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name:"auth" ,
    initialState:{
        user:{}
    },
    reducers:{
        login: (state, action) => {
            state.user = action.payload; // Set user when logged in
          },
    }
})

export const { login } = AuthSlice.actions;
export default AuthSlice.reducer;