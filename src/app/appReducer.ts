import { combineReducers } from '@reduxjs/toolkit'

import { personApi } from '@/entities/actor/api/person.api'
import { moviesApi } from '@/entities/movies/api/movies.api'

import userReducer from '@/features/loginForm/api/userSlice'
import { searchApi } from '@/features/search/api/search.api'

export const rootReducer = combineReducers({
	userReducer,
	[moviesApi.reducerPath]: moviesApi.reducer,
	[personApi.reducerPath]: personApi.reducer,
	[searchApi.reducerPath]: searchApi.reducer
})
