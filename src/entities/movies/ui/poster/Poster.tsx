import { memo } from 'react'

// import { IVideos } from '../../model/moviesModel'
import styles from './style.module.scss'

interface IPosterProps {
	url: string | undefined
	// trailers: IVideos[] | null
}

export const Poster = memo(({ url }: IPosterProps) => {
	return (
		<div className={styles.posters}>
			<img src={url} alt='Movie Poster' className={styles.poster} />
			{/* <div className={styles.posters__trailer}>
				<div>
					{trailers?.length &&
						trailers
							?.map(t => <iframe key={t.url} src={t.url}></iframe>)
							.slice(0, 1)}
				</div>
				<div></div>
			</div> */}
		</div>
	)
})
