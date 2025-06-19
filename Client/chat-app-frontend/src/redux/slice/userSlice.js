import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: "",
  userName: "",
  email: "",
  phone: "",
  profilePic: "",
  coverPic:"",
  bio:"",
  token: "",
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.profilePic = action.payload.profilePic;
      state.coverPic = action.payload.coverPic;
      state.bio = action.payload.bio;
    }
  },
})


export const { setUser } = userSlice.actions

export default userSlice.reducer;