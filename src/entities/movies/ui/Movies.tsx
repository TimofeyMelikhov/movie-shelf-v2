import { memo } from 'react'

import { Preloader } from '@/shared/ui/preloader/Preloader'

import { useGetMoviesQuery } from '../api/movies.api'

import { CardMovies } from './cardMovies/CardMovies'
import styles from './style.module.scss'

export const Movies = memo(() => {
	const { data: movies, isLoading } = useGetMoviesQuery()

	return (
		<>
			{isLoading ? (
				<Preloader size='large' />
			) : (
				<div className={styles.moviesContainer}>
					{movies?.docs.map(movies => (
						<CardMovies
							key={movies.id}
							id={movies.id}
							name={movies.name}
							countries={movies.countries}
							poster={movies.poster}
							genres={movies.genres}
							rating={movies.rating}
							year={movies.year}
						/>
					))}
				</div>
			)}
		</>
	)
})
