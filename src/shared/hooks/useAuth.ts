import { useAppSelector } from './useAppSelector'

export const useAuth = () => {
	const { email, id, token, nickName, photoURL } = useAppSelector(
		state => state.userReducer.user
	)

	return {
		isAuth: !!email,
		email,
		token,
		id,
		nickName,
		photoURL
	}
}
