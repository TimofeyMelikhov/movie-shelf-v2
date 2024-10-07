import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IMovies, IServerResponse } from '@/shared/model/moviesModel'

export const searchApi = createApi({
	reducerPath: 'searchApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://api.kinopoisk.dev',
		prepareHeaders: headers => {
			headers.set('X-API-KEY', import.meta.env.VITE_KINOPOISK_API_KEY)
			headers.set('accept', 'application/json')
			return headers
		}
	}),
	endpoints: build => ({
		getMovieSearchResult: build.query<
			IServerResponse<IMovies[]>,
			string | undefined
		>({
			query: (query: string) => ({
				url: `/v1.4/movie/search?page=1&limit=3&query=${query}`
			})
		}),
		getPersonSearchResult: build.query<any, string | undefined>({
			query: (query: string) => ({
				url: `/v1.4/person/search?page=1&limit=3&query=${query}`
			})
		})
	})
})

export const { useGetMovieSearchResultQuery, useGetPersonSearchResultQuery } =
	searchApi
