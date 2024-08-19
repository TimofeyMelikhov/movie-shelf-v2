import { memo } from 'react'

import { UserProfile } from '@/entities/user/ui/UserProfile/UserProfile'
import { LogOut } from '@/entities/user/ui/logOut/LogOut'

import { Logo } from '@/features/logo/Logo'
import { Search } from '@/features/search/ui/main/Search'

import { useAuth } from '@/shared/hooks/useAuth'

import styles from './styles.module.scss'

export const Header = memo(() => {
	const { isAuth } = useAuth()

	return (
		<header className={styles.header}>
			{isAuth ? (
				<>
					<Logo />
					<Search />
					<div className={styles.userActions}>
						<UserProfile />
						<LogOut />
					</div>
				</>
			) : (
				<Logo />
			)}
		</header>
	)
})
