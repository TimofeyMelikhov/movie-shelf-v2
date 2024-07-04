import { configureStore } from '@reduxjs/toolkit'

import { rootReducer } from '@/app/appReducer'

import { moviesApi } from '@/entities/movies/api/movies.api'

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(moviesApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
