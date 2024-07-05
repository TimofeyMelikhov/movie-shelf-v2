import { useNavigate } from 'react-router-dom'

import { useAuth } from '@/shared/hooks/useAuth'

import styles from './style.module.scss'

export const UserProfile = () => {
	const { nickName, photoURL } = useAuth()

	const logoForNickName = nickName?.charAt(0)

	const navigate = useNavigate()

	const goToProfile = () => {
		navigate('/profile')
	}

	return (
		<div className={styles.profile} onClick={goToProfile}>
			{photoURL ? (
				<img src={photoURL} alt='фото профиля' />
			) : (
				<div className={styles.nicknameLogo}> {logoForNickName} </div>
			)}

			<span>{nickName}</span>
		</div>
	)
}
