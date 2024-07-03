import { useAppSelector } from './useAppSelector'

export const useAuth = () => {
	const { email, id, token } = useAppSelector(state => state.userReducer.user)

	return {
		isAuth: !!email,
		email,
		token,
		id
	}
}
