import { memo } from 'react'

import { IVideos } from '../../model/moviesModel'

import styles from './style.module.scss'

interface IPosterProps {
	url: string | undefined
	trailers: IVideos[] | undefined
}

export const Poster = memo(({ url, trailers }: IPosterProps) => {
	return (
		<div className={styles.posters}>
			<img src={url} alt='Movie Poster' className={styles.poster} />
			{trailers?.length &&
				trailers
					?.map(t => <iframe key={t.url} src={t.url}></iframe>)
					.slice(0, 1)}
		</div>
	)
})
