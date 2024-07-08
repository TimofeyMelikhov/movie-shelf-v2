import { Link } from 'react-router-dom'

import { getAuth, signOut } from 'firebase/auth'

import styles from './style.module.scss'

export const LogOut = () => {
	const logOut = async () => {
		const auth = getAuth()
		await signOut(auth)
	}

	return (
		<button className={styles.logoutButton}>
			<Link onClick={logOut} to='/auth'>
				Выйти
			</Link>
		</button>
	)
}
