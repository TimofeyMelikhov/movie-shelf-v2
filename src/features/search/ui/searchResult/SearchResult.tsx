import { memo } from 'react'

import classNames from 'classnames'

import { IMovies } from '@/shared/model/moviesModel'

import styles from './style.module.scss'

interface ISearchItemProps {
	searchItem: IMovies
	clickHandler: (id: number) => void
}

export const SearchResult = memo(
	({ searchItem, clickHandler }: ISearchItemProps) => {
		const ratingClass = classNames(styles.rating, {
			[styles.rating_good]: searchItem.rating.kp >= 7,
			[styles.rating_bad]: searchItem.rating.kp < 5.1
		})

		return (
			<div
				onClick={() => clickHandler(searchItem.id)}
				className={styles.searchResult}
			>
				<div>
					<img src={searchItem.poster.previewUrl} alt='film poster' />
				</div>
				<div>
					<h4>{searchItem.name}</h4>
					<div className={styles.descr}>
						<span className={ratingClass}>
							{searchItem.rating.kp.toFixed(1)}
						</span>{' '}
						{searchItem.alternativeName},{' '}
						{searchItem.isSeries ? 'сериал, ' : null}{' '}
						{searchItem.releaseYears.length
							? searchItem.releaseYears.map(
									item => `${item.start} - ${item.end}`
								)
							: searchItem.year}
					</div>
				</div>
			</div>
		)
	}
)
