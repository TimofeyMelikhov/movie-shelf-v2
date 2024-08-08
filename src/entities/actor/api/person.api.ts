import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IPerson } from '../model/personModel'

export const personApi = createApi({
	reducerPath: 'personApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://api.kinopoisk.dev',
		prepareHeaders: headers => {
			headers.set('X-API-KEY', import.meta.env.VITE_KINOPOISK_API_KEY)
			headers.set('accept', 'application/json')
			return headers
		}
	}),
	endpoints: build => ({
		getPerson: build.query<IPerson, string | undefined>({
			query: (id: string) => ({
				url: `/v1.4/person/${id}`
			})
		})
	})
})

export const { useGetPersonQuery } = personApi
