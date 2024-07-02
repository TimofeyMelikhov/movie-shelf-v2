import { memo } from 'react'

import { useAuth } from '@/shared/hooks/useAuth'

export const Page = memo(() => {
	const { email } = useAuth()

	return (
		<div>
			Main Page
			{email}
		</div>
	)
})
