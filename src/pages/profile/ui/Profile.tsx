import { memo } from 'react'

import { useAuth } from '@/shared/hooks/useAuth'

import styles from './style.module.scss'

export const Profile = memo(() => {
	const { nickName } = useAuth()

	return <div className={styles.profilePage}>Профиль - {nickName}</div>
})
