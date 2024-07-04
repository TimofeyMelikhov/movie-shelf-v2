import { memo } from 'react'
import { Link } from 'react-router-dom'

import { LogOut } from '@/features/logOut/ui/LogOut'

import { useAuth } from '@/shared/hooks/useAuth'

import styles from './styles.module.scss'

export const Header = memo(() => {
	const { isAuth, nickName } = useAuth()

	return (
		<header>
			{isAuth ? (
				<div className={styles.header}>
					<div className={styles.header__wrapperLink}>
						<Link to='/'>Кинополка</Link>
					</div>
					{/* <MovieSearch /> */}
					<div>{nickName}</div>
					<LogOut />
				</div>
			) : (
				<div className={styles.header}>
					<Link to='/'>Кинополка</Link>
				</div>
			)}
		</header>
	)
})
