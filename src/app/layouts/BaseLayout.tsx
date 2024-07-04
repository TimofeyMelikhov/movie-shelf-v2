import { Outlet } from 'react-router-dom'

import { Footer } from '@/widgets/footer/Footer'
import { Header } from '@/widgets/header/ui/Header'

export const BaseLayout = () => {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	)
}
