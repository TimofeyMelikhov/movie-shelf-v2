import { memo } from 'react'

import { formatNum } from '@/shared/utils/formatter'

import { IMovies } from '../../model/moviesModel'

import styles from './style.module.scss'

interface MainInfoProps {
	data: IMovies | undefined
}

export const MainInfo = memo(({ data }: MainInfoProps) => {
	console.log(data?.persons)

	const director = data?.persons.filter(
		item => item.enProfession === 'director'
	)[0]
	const writer = data?.persons.filter(item => item.enProfession === 'writer')[0]

	if (!data) {
		return <div>Данные отсутствуют</div>
	}

	return (
		<>
			<h1>
				{data?.name} ({data?.year})
			</h1>
			<div className={styles.alterTitel}>
				<span className={styles.alterTitel_title}>{data?.alternativeName}</span>
				<span className={styles.alterTitel_age}> {data?.ageRating}+</span>
			</div>
			<h3>О фильме</h3>
			<div className={styles.infoItem}>
				<div className={styles.infoItem_title}>Год производства</div>
				<div>{data?.year}</div>
			</div>
			<div className={styles.infoItem}>
				<div className={styles.infoItem_title}>Страна</div>
				<div>
					{data?.countries.map(item => (
						<span key={item.name}>{item.name}, </span>
					))}
				</div>
			</div>
			<div className={styles.infoItem}>
				<div className={styles.infoItem_title}>Жанр</div>
				<div>
					{data?.genres.map(item => <span key={item.name}>{item.name}, </span>)}
				</div>
			</div>
			<div className={styles.infoItem}>
				<div className={styles.infoItem_title}>Слоган</div>
				<div className={styles.infoItem_descr}> «{data?.slogan}» </div>
			</div>
			<div className={styles.infoItem}>
				<div className={styles.infoItem_title}>Режиссер</div>
				<div className={styles.infoItem_descr}> {director?.name} </div>
			</div>
			<div className={styles.infoItem}>
				<div className={styles.infoItem_title}>Сценарий</div>
				<div className={styles.infoItem_descr}> {writer?.name} </div>
			</div>
			<div className={styles.infoItem}>
				<div className={styles.infoItem_title}>Бюджет</div>
				<div className={styles.infoItem_descr}>
					{data?.budget.currency}
					{formatNum(data?.budget.value)}
				</div>
			</div>
		</>
	)
})
