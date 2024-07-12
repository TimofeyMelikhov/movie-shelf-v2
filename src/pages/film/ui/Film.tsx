import { memo } from 'react'
import { useParams } from 'react-router-dom'

import { useGetMovieByIdQuery } from '@/entities/movies/api/movies.api'

import { Preloader } from '@/shared/ui/preloader/Preloader'

import styles from './style.module.scss'

export const Film = memo(() => {
	const { id } = useParams<'id'>()

	const { data, isFetching, isLoading } = useGetMovieByIdQuery(id)

	return (
		<div className={styles.container}>
			{isFetching || isLoading ? (
				<div className={styles.preloaderWrapper}>
					<Preloader size='large' />
				</div>
			) : (
				<div>
					Здесь будет информация о фильме -{' '}
					<span style={{ fontWeight: '900' }}>{data?.name}</span>
				</div>
			)}
		</div>
	)
})
