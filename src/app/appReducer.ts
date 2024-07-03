import { combineReducers } from '@reduxjs/toolkit'

import userReducer from '@/features/loginForm/api/userSlice'

userReducer

export const rootReducer = combineReducers({
	userReducer
})
