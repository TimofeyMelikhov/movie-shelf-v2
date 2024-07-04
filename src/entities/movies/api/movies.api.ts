import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IMovies, IServerResponse } from '../model/moviesModel'

export const moviesApi = createApi({
	reducerPath: 'moviesApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://api.kinopoisk.dev',
		prepareHeaders: headers => {
			headers.set('X-API-KEY', import.meta.env.VITE_KINOPOISK_API_KEY)
			headers.set('accept', 'application/json')
			return headers
		}
	}),
	endpoints: build => ({
		getMovies: build.query<IServerResponse<IMovies[]>, void>({
			query: () => ({
				url: 'v1.4/movie?page=1&limit=20&rating.kp=7.2-10&lists=top250'
			})
		})
	})
})

export const { useGetMoviesQuery } = moviesApi
