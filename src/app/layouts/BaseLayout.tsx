import { Outlet } from 'react-router-dom'

import { Header } from '@/widgets/header/ui/Header'

export const BaseLayout = () => {
	return (
		<>
			<Header />
			<Outlet />
		</>
	)
}
