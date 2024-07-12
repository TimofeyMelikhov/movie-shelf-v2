import { memo } from 'react'

import { useAuth } from '@/shared/hooks/useAuth'

import styles from './style.module.scss'

export const Profile = memo(() => {
	const { email, emailVerified } = useAuth()

	return (
		<div className={styles.profilePage}>
			Профиль - {email}
			{!emailVerified && (
				<div>
					Чтобы редактировать данные пожалуйста подтвердите аккаунт. Письмо было
					выслано Вам при регистрации
				</div>
			)}
		</div>
	)
})
