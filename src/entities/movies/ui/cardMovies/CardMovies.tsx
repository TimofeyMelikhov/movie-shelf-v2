import { useNavigate } from 'react-router-dom'

import { ICardMovies } from '../../model/curentMoviesModel'

import styles from './style.module.scss'

export const CardMovies = ({ id, name, poster, rating, year }: ICardMovies) => {
	const ratingFloor = Math.floor(rating.kp)

	const navigate = useNavigate()

	const goToFilm = () => {
		navigate(`/film/${id}`)
	}

	return (
		<div className={styles.card} onClick={goToFilm}>
			<h1>{name}</h1>
			<img src={poster.previewUrl} alt='' />
			<p>Рейтинг Кинопоиск - {ratingFloor}</p>
			<p>Год - {year}</p>
		</div>
	)
}
