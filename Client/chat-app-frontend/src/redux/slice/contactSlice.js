import { createSlice } from "@reduxjs/toolkit";

export const contactSlice = createSlice({
    name: "contact",
    initialState:{
        isContactOpen: false
    },
    reducers:{
       setContact: (state, action) => {
        state.isContactOpen= action.payload;
       }
    }
});

export const {setContact } = contactSlice.actions;
export default contactSlice.reducer;