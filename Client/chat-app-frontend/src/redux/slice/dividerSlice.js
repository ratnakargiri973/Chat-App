import { createSlice } from "@reduxjs/toolkit";

export const dividerSlice = createSlice({
    name: "divider",
    initialState:{
        isDividerOpen: false
    },
    reducers:{
       setDivider: (state, action) => {
        state.isDividerOpen= action.payload;
       }
    }
});

export const {setDivider } = dividerSlice.actions;
export default dividerSlice.reducer;