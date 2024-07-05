import { memo } from 'react'

import styles from './style.module.scss'

export const Search = memo(() => {
	return <input className={styles.search} type='text' placeholder='Поиск' />
})
