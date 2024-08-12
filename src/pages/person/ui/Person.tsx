import { memo } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { useGetPersonQuery } from '@/entities/actor/api/person.api'

import { Preloader } from '@/shared/ui/preloader/Preloader'
import { ageTransformation, formatDate } from '@/shared/utils/formatter'

import styles from './style.module.scss'

export const Person = memo(() => {
	const { id } = useParams<'id'>()

	const { data, isFetching, isLoading } = useGetPersonQuery(id)

	const profession = data?.profession.map((item, index) => (
		<span key={index}>
			{item.value}
			{index < data.profession.length - 1 && ', '}
		</span>
	))

	const growth = data?.growth ? data?.growth / 100 : '—'
	const birthPlace = data?.birthPlace.map((item, index) => (
		<span key={index}>
			{item.value}
			{index < data.birthPlace.length - 1 && ', '}
		</span>
	))
	const spouses = data?.spouses.map(item => (
		<div key={item.id}>
			{item.name}({item.divorcedReason}){' '}
			{!!item.children ? `${item.children} детей` : null}
		</div>
	))
	const countAllMovies = data?.movies.filter(
		item => item.enProfession !== 'uncredited'
	).length
	const bestMovies = data?.movies
		.slice()
		.filter(item => item.enProfession === 'actor')
		.sort((a, b) => {
			if (a.rating === null) return 1
			if (b.rating === null) return -1
			return b.rating - a.rating
		})
		.slice(0, 5)

	console.log(data)

	return (
		<div className={styles.container}>
			{isFetching || isLoading ? (
				<div className={styles.preloaderWrapper}>
					<Preloader size='large' />
				</div>
			) : (
				<div className={styles.personInfo}>
					<div className={styles.personInfo__photo}>
						<img src={data?.photo} alt='photo of actor' />
					</div>

					<div className={styles.personInfo__mainInfo}>
						<h1>{data?.name}</h1>
						<div className={styles.enName}>{data?.enName}</div>
						<h3>О персоне</h3>
						<div className={styles.infoItem}>
							<div className={styles.infoItem_title}>Карьера</div>
							<div>{profession}</div>
						</div>
						<div className={styles.infoItem}>
							<div className={styles.infoItem_title}>Рост</div>
							<div className={styles.infoItem_descr}>{growth} м</div>
						</div>
						<div className={styles.infoItem}>
							<div className={styles.infoItem_title}>Дата рождения</div>
							<div className={styles.infoItem_descr}>
								{formatDate(data?.birthday ? data?.birthday : '')}
								{' • '}
								{data?.age} {ageTransformation(data?.age)}
							</div>
						</div>
						<div className={styles.infoItem}>
							<div className={styles.infoItem_title}>Место рождения</div>
							<div className={styles.infoItem_descr}>{birthPlace}</div>
						</div>
						<div className={styles.infoItem}>
							<div className={styles.infoItem_title}>
								{data?.sex === 'Мужской' ? 'Супруга' : 'Супруг'}
							</div>
							<div>{spouses}</div>
						</div>
						<div className={styles.infoItem}>
							<div className={styles.infoItem_title}>Всего фильмов</div>
							<div className={styles.infoItem_descr}>{countAllMovies}</div>
						</div>
					</div>

					<div className={styles.personInfo__bestMovies}>
						<div className={styles.cast}>
							<div className={styles.cast__mainActors}>
								<div className={styles.cast__header}>Лучшие фильмы </div>
								<ul className={styles.cast__persons}>
									{bestMovies
										?.map(film => (
											<li key={film.id}>
												<Link
													to={`/film/${film.id}`}
													className={styles.itemLink}
												>
													{film.name ? film.name : film.alternativeName}
												</Link>
											</li>
										))
										.slice(0, 10)}
								</ul>
							</div>
							<div className={styles.cast__voiceActor}></div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
})
