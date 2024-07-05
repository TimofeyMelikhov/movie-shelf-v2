import { Link } from 'react-router-dom'

import { removeUser } from '@/features/loginForm/api/userSlice'

import { useAppDispatch } from '@/shared/hooks/useAppDispatch'

import styles from './style.module.scss'

export const LogOut = () => {
	const dispatch = useAppDispatch()

	const logOut = () => {
		localStorage.removeItem('userInfo')
		dispatch(removeUser())
	}

	return (
		<button className={styles.logoutButton}>
			<Link onClick={logOut} to='/auth'>
				Выйти
			</Link>
		</button>
	)
}
