import { useAppSelector } from './useAppSelector'

export const useAuth = () => {
	const { email, id, token, nickName } = useAppSelector(
		state => state.userReducer.user
	)

	return {
		isAuth: !!email,
		email,
		token,
		id,
		nickName
	}
}
