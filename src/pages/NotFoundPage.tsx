import { Link } from 'react-router-dom'

export const NotFoundPage = () => {
	return (
		<div>
			404 Not found
			<Link to='/'>Home</Link>
		</div>
	)
}
