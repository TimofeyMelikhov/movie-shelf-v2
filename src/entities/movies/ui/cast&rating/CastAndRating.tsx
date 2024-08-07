import { memo } from 'react'

import classNames from 'classnames'

import { formatNum } from '@/shared/utils/formatter'

import {
	IPerson,
	IReviews,
	IServerResponse,
	IVotes
} from '../../model/moviesModel'

import styles from './style.module.scss'

interface ICastAndRatingProps {
	rating: number | undefined
	review: IServerResponse<IReviews[]> | undefined
	votes: IVotes | undefined
	top: number | null
	persons: IPerson[] | undefined
}

export const CastAndRating = memo(
	({ rating, review, votes, top, persons }: ICastAndRatingProps) => {
		if (!rating) {
			return <div>Данные отсутствуют...</div>
		}

		const ratingClass = classNames(styles.rating, {
			[styles.rating_good]: rating >= 7,
			[styles.rating_bad]: rating < 5.1,
			[styles.rating_top]: top
		})

		const actors = persons?.filter(person => person.enProfession === 'actor')
		const voiceActor = persons?.filter(
			person => person.enProfession === 'voice_actor'
		)

		return (
			<>
				<div className={ratingClass}>
					<div>{rating.toFixed(1)}</div>
					{top && (
						<div className={styles.topBlock}>
							<div
								className={classNames(styles.branch, styles.branch_left)}
							></div>
							<div className={styles.topContainer}>
								<div className={styles.namePlace}>
									топ {top > 10 ? 250 : 10}
								</div>
								<div className={styles.place}>{top} место</div>
							</div>
							<div
								className={classNames(styles.branch, styles.branch_right)}
							></div>
						</div>
					)}
				</div>
				<div className={styles.votes}>
					{formatNum(votes?.kp ? votes?.kp : 0)} оценки
				</div>
				<div className={styles.votes}>{review?.total} рецензия</div>

				<div className={styles.cast}>
					<div className={styles.cast__header}>
						В главных ролях <span className={styles.cast__header_arrow}></span>
					</div>
					<ul className={styles.cast__persons}>
						{actors
							?.map(actor => (
								<li key={actor.id}>{actor.name ? actor.name : actor.enName}</li>
							))
							.slice(0, 10)}
					</ul>
					<div className={styles.cast__length}>{actors?.length} актера</div>
					{!!voiceActor?.length && (
						<>
							<div className={styles.cast__header}>
								Роли дублировали{' '}
								<span className={styles.cast__header_arrow}></span>
							</div>
							<ul className={styles.cast__persons}>
								{voiceActor
									?.map(actor => (
										<li key={actor.id}>
											{actor.name ? actor.name : actor.enName}
										</li>
									))
									.slice(0, 5)}
							</ul>
						</>
					)}
				</div>
			</>
		)
	}
)
