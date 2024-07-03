import { memo, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

import { setUser } from '@/features/loginForm/api/userSlice'

import { useAppDispatch } from '@/shared/hooks/useAppDispatch'
import { useAuth } from '@/shared/hooks/useAuth'

import { PrivateRouteProps } from '../models/models'

export const PrivateRoute = memo(({ children }: PrivateRouteProps) => {
	const dispatch = useAppDispatch()
	const { isAuth } = useAuth()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const loadUserInfo = async () => {
			const userInfoFromLocalStorage = localStorage.getItem('userInfo')
			if (userInfoFromLocalStorage) {
				const userInfo = JSON.parse(userInfoFromLocalStorage)
				await dispatch(
					setUser({
						email: userInfo.email,
						id: userInfo.userId,
						token: userInfo.accessToken
					})
				)
			}
			setIsLoading(false)
		}

		loadUserInfo()
	}, [dispatch])

	if (isLoading) {
		return <div>Loading...</div>
	}

	return isAuth ? children : <Navigate to='/auth' />
})
