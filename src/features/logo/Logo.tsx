import { memo } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './style.module.scss'

export const Logo = memo(() => {
	const navigate = useNavigate()

	const goToMainPage = () => {
		navigate('/')
	}

	return (
		<div className={styles.logo} onClick={goToMainPage}>
			Кинополка
		</div>
	)
})
