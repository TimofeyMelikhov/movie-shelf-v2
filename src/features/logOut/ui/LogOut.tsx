import { Link } from 'react-router-dom'

import { dropLoginError, removeUser } from '@/features/loginForm/api/userSlice'

import { useAppDispatch } from '@/shared/hooks/useAppDispatch'
import { useAppSelector } from '@/shared/hooks/useAppSelector'

export const LogOut = () => {
	const errorlogin = useAppSelector(state => state.userReducer.errorLogin)
	const dispatch = useAppDispatch()

	const logOut = () => {
		localStorage.removeItem('userInfo')
		dispatch(removeUser())
		if (errorlogin) {
			dispatch(dropLoginError())
		}
	}

	return (
		<Link onClick={logOut} to='/auth'>
			Выйти
		</Link>
	)
}
