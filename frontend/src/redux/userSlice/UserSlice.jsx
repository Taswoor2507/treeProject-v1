import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../treeSlice/TreeSlice";
import axiosInstance from "@/axiosCofig/axiosInstance";
const UserSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    user: {},
    status: STATUSES.idle,
  },
  reducers: {
    setUserStatus: (state, action) => {
      state.status = action.payload;
    },
    getUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { setUserStatus, getUsers } = UserSlice.actions;
export default UserSlice.reducer;

export const userThunk = () => {
  return async (dispatch) => {
    try {
      dispatch(setUserStatus(STATUSES.loading)); // Dispatch loading state
      const usersRequest = await axiosInstance.get("/users/all");
      const response = await usersRequest.data;
      dispatch(getUsers(response));
      dispatch(setUserStatus(STATUSES.idle));
    } catch (error) {
      dispatch(setUserStatus(STATUSES.error));
    }
  };
};
