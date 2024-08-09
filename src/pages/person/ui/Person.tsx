import { memo } from 'react'
import { useParams } from 'react-router-dom'

import { useGetPersonQuery } from '@/entities/actor/api/person.api'

import { Preloader } from '@/shared/ui/preloader/Preloader'

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
					</div>

					<div className={styles.personInfo__bestMovies}></div>
				</div>
			)}
		</div>
	)
})
