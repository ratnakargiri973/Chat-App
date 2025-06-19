import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slice/userSlice'
import dividerReducer from '../slice/dividerSlice'
import profileReducer from '../slice/profileSlice'
import messageReducer from '../slice/messageSlice'
import contactReducer from '../slice/contactSlice'


export const store = configureStore({
  reducer: {
    user: userReducer,
    divider: dividerReducer,
    profile: profileReducer,
    message: messageReducer,
    contact: contactReducer
  },
})