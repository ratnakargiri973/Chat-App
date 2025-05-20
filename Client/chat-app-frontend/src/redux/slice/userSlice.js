import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: "",
  userName: "",
  email: "",
  phone: "",
  profilePic: "",
  token: "",
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   setUser: (state, action) => {
    state.name = action.payload.name,
    state.userName = action.payload.userName,
    state.email = action.payload.email,
    state.phone = action.payload.phone,
    state.profilePic = action.payload.profilePic
   }
  },
})


export const { setUser } = userSlice.actions

export default userSlice.reducer