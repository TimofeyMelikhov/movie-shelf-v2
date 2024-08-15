import { memo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import classNames from 'classnames'

import { useDebounce } from '@/shared/hooks/useDebounce'
import { useInput } from '@/shared/hooks/useInput'

import { useGetSearchResultQuery } from './api/search.api'
import styles from './style.module.scss'

export const Search = memo(() => {
	const navigate = useNavigate()
	const [dropdown, setDropdown] = useState<boolean>(false)

	const input = useInput('')
	const debounced = useDebounce<string>(input.value, 600)

	const { data } = useGetSearchResultQuery(debounced, {
		skip: debounced.length < 3
	})

	const clickHandler = (id: number) => {
		navigate(`/film/${id}`)
		setDropdown(false)
		input.setvalue('')
	}

	useEffect(() => {
		setDropdown(debounced.length >= 3)
	}, [debounced])

	// const ratingClass = classNames(styles.rating, {
	// 	[styles.rating_good]: datarating >= 7,
	// 	[styles.rating_bad]: rating < 5.1
	// })

	return (
		<div className={styles.serarch_container}>
			<input
				className={styles.search}
				value={input.value}
				onChange={input.onChange}
				type='text'
				placeholder='Поиск'
			/>

			{dropdown && (
				<div className={styles.dropdown}>
					{data?.docs.map(item => (
						<div
							key={item.id}
							onClick={() => clickHandler(item.id)}
							className={styles.searchResult}
						>
							<div>
								<img src={item.poster.previewUrl} alt='' />
							</div>
							<div>
								<h4>{item.name}</h4>
								<div className={styles.descr}>
									<span>{item.rating.kp.toFixed(1)}</span>
									{item.alternativeName}, {item.isSeries ? 'сериал' : null},{' '}
									{item.year}
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
})
