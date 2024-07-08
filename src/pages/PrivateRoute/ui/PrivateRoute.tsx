import { memo } from 'react'
import { Navigate } from 'react-router-dom'

import { useAuthInitializing } from '@/app/AuthProvider'

import { useAuth } from '@/shared/hooks/useAuth'

import { PrivateRouteProps } from '../models/models'

export const PrivateRoute = memo(({ children }: PrivateRouteProps) => {
	const { isAuth } = useAuth()

	const { initializing } = useAuthInitializing()

	if (initializing) {
		return <div style={{ minHeight: 'calc(100vh - 153px)' }}></div>
	}

	return isAuth ? children : <Navigate to='/auth' />
})
