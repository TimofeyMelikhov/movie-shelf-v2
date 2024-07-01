import { memo } from 'react'
import { Navigate } from 'react-router-dom'

import { PrivateRouteProps } from '../models/models'

export const PrivateRoute = memo(
	({ isAuthenticated, children }: PrivateRouteProps) => {
		return isAuthenticated ? children : <Navigate to='/auth' />
	}
)
