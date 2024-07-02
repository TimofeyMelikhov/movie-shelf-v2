import { memo } from 'react'
import { Link } from 'react-router-dom'

import { removeUser } from '@/pages/auth/api/userSlice'

import { useAppDispatch } from '@/shared/hooks/useAppDispatch'
import { useAuth } from '@/shared/hooks/useAuth'

import styles from './styles.module.scss'

export const Header = memo(() => {
	const { isAuth } = useAuth()
	const dispatch = useAppDispatch()
	return (
		<header>
			{isAuth ? (
				<div className={styles.header}>
					<div className={styles.header__wrapperLink}>
						<Link to='/'>Кинополка</Link>
					</div>
					{/* <MovieSearch /> */}
					<div onClick={() => dispatch(removeUser())}>
						<Link to='/auth'>Выйти</Link>
					</div>
				</div>
			) : (
				<div className={styles.header}>
					<Link to='/'>Кинополка</Link>
				</div>
			)}
		</header>
	)
})
