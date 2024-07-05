import { memo } from 'react'

import { Movies } from '@/entities/movies/ui/Movies'

import styles from './style.module.scss'

export const Page = memo(() => {
	return (
		<div className={styles.wrapper}>
			<Movies />
		</div>
	)
})
