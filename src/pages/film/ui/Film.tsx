import { memo } from 'react'
import { useParams } from 'react-router-dom'

import classNames from 'classnames'

import {
	useGetMovieByIdQuery,
	useGetReviewQuery
} from '@/entities/movies/api/movies.api'

import { Preloader } from '@/shared/ui/preloader/Preloader'

import styles from './style.module.scss'

export const Film = memo(() => {
	const { id } = useParams<'id'>()

	const { data, isFetching, isLoading } = useGetMovieByIdQuery(id)

	const { data: review } = useGetReviewQuery(id)

	console.log(data)

	const movieRating = data?.rating.kp
		? parseFloat(data.rating.kp.toFixed(1))
		: 0
	const ratingClass = classNames(styles.rating, {
		[styles.rating_good]: movieRating >= 7,
		[styles.rating_bad]: movieRating < 5.1
	})

	return (
		<div className={styles.container}>
			{isFetching || isLoading ? (
				<div className={styles.preloaderWrapper}>
					<Preloader size='large' />
				</div>
			) : (
				<div className={styles.movieInfo}>
					<div className={styles.posterTrailer}>
						<img
							src={data?.poster.url}
							alt='Movie Poster'
							className={styles.poster}
						/>
					</div>

					<div className={styles.mainInfo}>
						<h1>
							{data?.name} ({data?.year})
						</h1>
						<div className={styles.alterTitel}>
							<span className={styles.alterTitel_title}>
								{data?.alternativeName}
							</span>
							<span className={styles.alterTitel_age}>{data?.ageRating}+</span>
						</div>
						<h3>О фильме</h3>
						<div className={styles.infoItem}>
							<div className={styles.infoItem_title}>Год производства</div>
							<div>{data?.year}</div>
						</div>
						<div className={styles.infoItem}>
							<div className={styles.infoItem_title}>Страна</div>
							<div>
								{data?.countries.map(item => <span>{item.name}, </span>)}
							</div>
						</div>
						<div className={styles.infoItem}>
							<div className={styles.infoItem_title}>Жанр</div>
							<div>{data?.genres.map(item => <span>{item.name}, </span>)}</div>
						</div>
						<div className={styles.infoItem}>
							<div className={styles.infoItem_title}>Жанр</div>
							<div className={styles.infoItem_descr}> {data?.slogan} </div>
						</div>
					</div>

					<div className={styles.cast}>
						<div className={ratingClass}>{movieRating}</div>
						<div className={styles.votes}>{data?.votes.kp} оценки</div>
						<div className={styles.votes}>{review?.total} рецензия</div>
					</div>
				</div>
			)}
		</div>
	)
})
