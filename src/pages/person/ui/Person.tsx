import { memo } from 'react'
import { useParams } from 'react-router-dom'

import { useGetPersonQuery } from '@/entities/actor/api/person.api'

import { Preloader } from '@/shared/ui/preloader/Preloader'

import styles from './style.module.scss'

export const Person = memo(() => {
	const { id } = useParams<'id'>()

	const { data, isFetching, isLoading } = useGetPersonQuery(id)

	console.log(data)

	return (
		<div className={styles.container}>
			{isFetching || isLoading ? (
				<div className={styles.preloaderWrapper}>
					<Preloader size='large' />
				</div>
			) : (
				<>{data?.name}</>
			)}
		</div>
	)
})
