import { combineReducers } from '@reduxjs/toolkit'

import userReducer from '@/pages/auth/api/userSlice'

export const rootReducer = combineReducers({
	userReducer
})
