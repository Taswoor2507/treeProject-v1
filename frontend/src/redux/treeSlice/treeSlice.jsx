import { createSlice } from "@reduxjs/toolkit";

export const STATUSES = {
    loading: "LOADING",
    idle: "IDLE",
    error: "ERROR"
};

const TreeSlice = createSlice({
    name: "tree",
    initialState: {
        trees: [],
        tree: {},
        status: STATUSES.idle,
        error: null // Add an error state to track errors
    },
    reducers: {
       setStatus(state , action){
          state.status = action.payload
       },
       getTrees(state, action){
         state.trees = action.payload
       }
    }
});

// Export actions to use them in async thunk
export const { setStatus , getTrees} = TreeSlice.actions;

export default TreeSlice.reducer;

// Async thunk function to fetch trees
export function getTreesRequest() {
    return async function(dispatch) {
       dispatch(setStatus(STATUSES.loading)) // Dispatch loading state
        try {
            const response = await fetch("http://localhost:4040/api/trees/all");
            if (!response.ok) {
                dispatch(setStatus(STATUSES.error))
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            dispatch(getTrees(data))
            dispatch(setStatus(STATUSES.idle))
            

        } catch (error) {
            dispatch(setStatus(STATUSES.error))
        }
    };
}
