import { configureStore } from '@reduxjs/toolkit'

import { rootReducer } from '@/app/appReducer'

import { personApi } from '@/entities/actor/api/person.api'
import { moviesApi } from '@/entities/movies/api/movies.api'

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(moviesApi.middleware, personApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
