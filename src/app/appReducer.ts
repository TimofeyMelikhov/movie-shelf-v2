import { combineReducers } from '@reduxjs/toolkit'

import { personApi } from '@/entities/actor/api/person.api'
import { moviesApi } from '@/entities/movies/api/movies.api'

import userReducer from '@/features/loginForm/api/userSlice'

export const rootReducer = combineReducers({
	userReducer,
	[moviesApi.reducerPath]: moviesApi.reducer,
	[personApi.reducerPath]: personApi.reducer
})
