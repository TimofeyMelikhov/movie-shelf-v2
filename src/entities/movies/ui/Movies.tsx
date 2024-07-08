import { Preloader } from '@/shared/ui/preloader/Preloader'

import { useGetMoviesQuery } from '../api/movies.api'

import { CardMovies } from './cardMovies/CardMovies'
import styles from './style.module.scss'

export const Movies = () => {
	const { data: movies, isLoading } = useGetMoviesQuery()

	return (
		<div className={styles.cardWrapper}>
			{isLoading ? (
				<Preloader size='large' />
			) : (
				movies?.docs.map(movies => (
					<CardMovies
						key={movies.id}
						name={movies.name}
						countries={movies.countries}
						poster={movies.poster}
						genres={movies.genres}
						rating={movies.rating}
						year={movies.year}
					/>
				))
			)}
		</div>
	)
}
