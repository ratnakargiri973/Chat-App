import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slice/userSlice'
import dividerReducer from '../slice/dividerSlice'
import profileReducer from '../slice/profileSlice'


export const store = configureStore({
  reducer: {
    user: userReducer,
    divider: dividerReducer,
    profile: profileReducer,
  },
})