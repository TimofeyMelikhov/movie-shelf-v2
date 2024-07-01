import { memo, useState } from 'react'

export const LoginForm = memo(() => {
	const [username, setUsername] = useState<string>('')
	const [Password, setPassword] = useState<string>('')

	return (
		<form>
			<div>
				<label>
					username:
					<input
						type='text'
						value={username}
						onChange={e => setUsername(e.currentTarget.value)}
					/>
				</label>
			</div>

			<div>
				<label>
					password:
					<input
						type='text'
						value={Password}
						onChange={e => setPassword(e.currentTarget.value)}
					/>
				</label>
			</div>
		</form>
	)
})
