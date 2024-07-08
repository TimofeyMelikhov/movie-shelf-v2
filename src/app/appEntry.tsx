import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { NotFoundPage } from '@/pages/NotFoundPage'
import { PrivateRoute } from '@/pages/PrivateRoute/ui/PrivateRoute'
import { AuthPage } from '@/pages/auth/ui/AuthPage'
import { Page } from '@/pages/main/ui/Page'
import { Profile } from '@/pages/profile/ui/Profile'

import { AuthProvider } from './AuthProvider'
import { store } from './appStore'
import './firebase'
import { BaseLayout } from './layouts/BaseLayout'
import './styles/index.scss'

const router = createBrowserRouter([
	{
		path: '/',
		element: <BaseLayout />,
		children: [
			{
				path: '/',
				element: (
					<PrivateRoute>
						<Page />
					</PrivateRoute>
				)
			},
			{
				path: '/profile',
				element: (
					<PrivateRoute>
						<Profile />
					</PrivateRoute>
				)
			}
		],
		errorElement: <NotFoundPage />
	},
	{
		path: '/auth',
		element: <BaseLayout />,
		children: [
			{
				path: '/auth',
				element: <AuthPage />
			}
		]
	}
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	</Provider>
)
