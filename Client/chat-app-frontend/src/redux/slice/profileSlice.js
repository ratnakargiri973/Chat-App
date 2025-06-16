import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
    name: "profile",
    initialState:{
        isProfileOpen: false
    },
    reducers:{
       setProfile: (state, action) => {
        state.isProfileOpen= action.payload;
       }
    }
});

export const {setProfile } = profileSlice.actions;
export default profileSlice.reducer;