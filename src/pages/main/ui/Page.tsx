import { memo } from 'react'

import { getAuth } from 'firebase/auth'

import { Movies } from '@/entities/movies/ui/Movies'

import styles from './style.module.scss'

export const Page = memo(() => {
	const auth = getAuth()
	const user = auth.currentUser
	console.log(user)
	return (
		<div className={styles.wrapper}>
			<Movies />
		</div>
	)
})
