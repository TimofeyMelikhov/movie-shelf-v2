import { memo } from 'react'

import styles from './style.module.scss'

interface IPosterProps {
	url: string | undefined
}

export const Poster = memo(({ url }: IPosterProps) => {
	return (
		<div className={styles.posters}>
			<div>
				<img src={url} alt='Movie Poster' className={styles.poster} />
			</div>
		</div>
	)
})
