import { memo } from 'react'

import { LoginForm } from '@/features/loginForm/ui/LoginForm'

export const AuthPage = memo(() => {
	return (
		<div>
			AuthPage
			<LoginForm />
		</div>
	)
})
