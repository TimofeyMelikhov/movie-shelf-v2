import { memo } from 'react'

import { LoginForm } from '@/features/loginForm/ui/LoginForm'

import styles from './styles.module.scss'

export const AuthPage = memo(() => {
	return (
		<div className={styles.container}>
			<div className={styles.form}>
				<LoginForm />
			</div>
		</div>
	)
})
