import { memo } from 'react'

import { formatNum } from '@/shared/utils/formatter'

import { IMovies, IPerson } from '../../model/moviesModel'

import styles from './style.module.scss'

interface MainInfoProps {
	data: IMovies | undefined
}

export const MainInfo = memo(({ data }: MainInfoProps) => {
	if (!data) {
		return <div>Данные отсутствуют</div>
	}

	const genres = data?.genres.map((item, index) => (
		<span key={index}>
			{item.name}
			{index < data.genres.length - 1 && ', '}
		</span>
	))

	const country = data?.countries.map((item, index) => (
		<span key={index}>
			{item.name}
			{index < data.countries.length - 1 && ', '}
		</span>
	))

	const audience = data.audience.map((item, index) => (
		<span key={index}>
			{item.country}:{formatNum(item.count)}
			{index < data.audience.length - 1 && ', '}
		</span>
	))

	const filterPersonsByProfession = (
		persons: IPerson[],
		profession: string,
		limit?: number
	) => {
		const filteredPersons = persons
			.filter(person => person.enProfession === profession)
			.slice(0, limit)

		return (
			<div>
				{filteredPersons.map((person, index) => (
					<span key={person.id}>
						{person.name ? person.name : person.enName}
						{index < filteredPersons.length - 1 && ', '}
					</span>
				))}
			</div>
		)
	}

	const director = filterPersonsByProfession(data?.persons, 'director', 3)
	const writer = filterPersonsByProfession(data?.persons, 'writer', 3)
	const producer = filterPersonsByProfession(data?.persons, 'producer', 3)
	const operator = filterPersonsByProfession(data?.persons, 'operator', 3)
	const composer = filterPersonsByProfession(data?.persons, 'composer', 3)
	const designer = filterPersonsByProfession(data?.persons, 'designer', 3)
	const editor = filterPersonsByProfession(data?.persons, 'editor', 3)

	console.log(data)

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
				<div>{country}</div>
			</div>
			<div className={styles.infoItem}>
				<div className={styles.infoItem_title}>Жанр</div>
				<div>{genres}</div>
			</div>
			<div className={styles.infoItem}>
				<div className={styles.infoItem_title}>Слоган</div>
				<div className={styles.infoItem_descr}> «{data?.slogan}» </div>
			</div>
			<div className={styles.infoItem}>
				<div className={styles.infoItem_title}>Режиссер</div>
				{director}
			</div>
			<div className={styles.infoItem}>
				<div className={styles.infoItem_title}>Сценарий</div>
				{writer}
			</div>
			{data.budget && (
				<div className={styles.infoItem}>
					<div className={styles.infoItem_title}>Бюджет</div>
					<div>
						{data?.budget?.currency}
						{formatNum(data?.budget.value)}
					</div>
				</div>
			)}
			<div className={styles.infoItem}>
				<div className={styles.infoItem_title}>Продюссер</div>
				{producer}
			</div>
			<div className={styles.infoItem}>
				<div className={styles.infoItem_title}>Оператор</div>
				{operator}
			</div>
			<div className={styles.infoItem}>
				<div className={styles.infoItem_title}>Композитор</div>
				{composer}
			</div>
			<div className={styles.infoItem}>
				<div className={styles.infoItem_title}>Художник</div>
				{designer}
			</div>
			<div className={styles.infoItem}>
				<div className={styles.infoItem_title}>Монтаж</div>
				{editor}
			</div>
			<div className={styles.infoItem}>
				<div className={styles.infoItem_title}>Сборы в США</div>
				<div>
					{data.fees.usa.currency}
					{formatNum(data.fees.usa.value)}
				</div>
			</div>
			<div className={styles.infoItem}>
				<div className={styles.infoItem_title}>Сборы в мире</div>
				<div>
					{data.fees.world.currency}
					{formatNum(data.fees.world.value)}
				</div>
			</div>
			<div className={styles.infoItem}>
				<div className={styles.infoItem_title}>Зрители</div>
				<div className={styles.infoItem_descr}>{audience}</div>
			</div>
		</>
	)
})
