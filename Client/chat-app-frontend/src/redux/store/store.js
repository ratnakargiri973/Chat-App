import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slice/userSlice'
import dividerReducer from '../slice/dividerSlice'


export const store = configureStore({
  reducer: {
    user: userReducer,
    divider: dividerReducer
  },
})