import { useAppSelector } from './useAppSelector'

export const useAuth = () => {
	const { email, id, token } = useAppSelector(state => state.userReducer)

	return {
		isAuth: !!email,
		email,
		token,
		id
	}
}
