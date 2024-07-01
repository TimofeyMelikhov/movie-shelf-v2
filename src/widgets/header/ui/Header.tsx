import { memo } from 'react'
import { Link } from 'react-router-dom'

import styles from './styles.module.scss'

const isAuth = true

export const Header = memo(() => {
	return (
		<header>
			{isAuth ? (
				<div className={styles.header}>
					<div className={styles.header__wrapperLink}>
						<Link to='/'>Кинополка</Link>
					</div>
					{/* <MovieSearch /> */}
					<div>
						<Link to='/auth'>Выйти</Link>
					</div>
				</div>
			) : (
				<div className={styles.header}>
					<Link to='/'>Кинополка</Link>
				</div>
			)}
		</header>
	)
})
