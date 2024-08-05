import { memo } from 'react'
import { useParams } from 'react-router-dom'

import {
	useGetMovieByIdQuery,
	useGetReviewQuery
} from '@/entities/movies/api/movies.api'
import { CastAndRating } from '@/entities/movies/ui/cast&rating/CastAndRating'
import { MainInfo } from '@/entities/movies/ui/mainInfo/MainInfo'
import { Poster } from '@/entities/movies/ui/poster/Poster'

import { Preloader } from '@/shared/ui/preloader/Preloader'

import styles from './style.module.scss'

export const Film = memo(() => {
	const { id } = useParams<'id'>()

	const { data, isFetching, isLoading } = useGetMovieByIdQuery(id)

	const { data: review } = useGetReviewQuery(id)

	return (
		<div className={styles.container}>
			{isFetching || isLoading ? (
				<div className={styles.preloaderWrapper}>
					<Preloader size='large' />
				</div>
			) : (
				<div className={styles.movieInfo}>
					<div className={styles.posterTrailer}>
						<Poster url={data?.poster.url} />
					</div>

					<div className={styles.mainInfo}>
						<MainInfo data={data} />
					</div>

					<div className={styles.cast}>
						<CastAndRating
							rating={data?.rating}
							review={review}
							votes={data?.votes}
						/>
					</div>
				</div>
			)}
		</div>
	)
})
