import { memo } from 'react'
import { Navigate } from 'react-router-dom'

import { useAuth } from '@/shared/hooks/useAuth'

import { PrivateRouteProps } from '../models/models'

export const PrivateRoute = memo(({ children }: PrivateRouteProps) => {
	const { isAuth } = useAuth()

	return isAuth ? children : <Navigate to='/auth' />
})
