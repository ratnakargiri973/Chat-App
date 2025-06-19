import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
    name: "message",
    initialState:{
        isMessageOpen: false
    },
    reducers:{
       setMessage: (state, action) => {
        state.isMessageOpen= action.payload;
       }
    }
});

export const {setMessage } = messageSlice.actions;
export default messageSlice.reducer;