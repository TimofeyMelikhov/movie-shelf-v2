import { ICardMovies } from '../../model/curentMoviesModel'

import styles from './style.module.scss'

export const CardMovies = ({ name, poster, rating, year }: ICardMovies) => {
	const ratingFloor = Math.floor(rating.kp)

	return (
		<div className={styles.card}>
			<h1>{name}</h1>
			<img src={poster.previewUrl} alt='' />
			<p>Рейтинг Кинопоиск - {ratingFloor}</p>
			<p>Год - {year}</p>
		</div>
	)
}
