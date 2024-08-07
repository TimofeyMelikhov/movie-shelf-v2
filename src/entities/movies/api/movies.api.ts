import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IMovies, IReviews, IServerResponse } from '../model/moviesModel'

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
				url: 'v1.4/movie?page=1&limit=20&lists=top250'
			})
		}),
		getMovieById: build.query<IMovies, string | undefined>({
			query: (id: string) => ({
				url: `/v1.4/movie/${id}`
			})
		}),
		getReview: build.query<IServerResponse<IReviews[]>, string | undefined>({
			query: (id: string) => ({
				url: `/v1.4/review?page=1&limit=10&movieId=${id}&v=1`
			})
		})
	})
})

export const { useGetMoviesQuery, useGetMovieByIdQuery, useGetReviewQuery } =
	moviesApi
