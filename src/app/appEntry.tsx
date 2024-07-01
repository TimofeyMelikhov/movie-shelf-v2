import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { NotFoundPage } from '@/pages/NotFoundPage'
import { AuthPage } from '@/pages/auth/ui/AuthPage'
import { Page } from '@/pages/main/ui/Page'

import { PrivateRoute } from '@/shared/PrivateRoute/ui/PrivateRoute'

import { store } from './appStore'
import { BaseLayout } from './layouts/BaseLayout'
import './styles/index.scss'

const isAuthenticated = false

const router = createBrowserRouter([
	{
		path: '/',
		element: <BaseLayout />,
		children: [
			{
				path: '/',
				element: (
					<PrivateRoute isAuthenticated={isAuthenticated}>
						<Page />
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
		<RouterProvider router={router} />
	</Provider>
)
