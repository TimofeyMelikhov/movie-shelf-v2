import { memo } from 'react'

import classNames from 'classnames'

import {
	IRating,
	IReviews,
	IServerResponse,
	IVotes
} from '../../model/moviesModel'

import styles from './style.module.scss'

interface ICastAndRatingProps {
	rating: IRating | undefined
	review: IServerResponse<IReviews[]> | undefined
	votes: IVotes | undefined
}

export const CastAndRating = memo(
	({ rating, review, votes }: ICastAndRatingProps) => {
		const movieRating = rating?.kp ? parseFloat(rating.kp.toFixed(1)) : 0
		const ratingClass = classNames(styles.rating, {
			[styles.rating_good]: movieRating >= 7,
			[styles.rating_bad]: movieRating < 5.1
		})

		return (
			<div>
				<div className={ratingClass}>{movieRating}</div>
				<div className={styles.votes}>{votes?.kp} оценки</div>
				<div className={styles.votes}>{review?.total} рецензия</div>
			</div>
		)
	}
)
