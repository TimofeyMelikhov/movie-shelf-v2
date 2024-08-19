import { memo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import classNames from 'classnames'

import { useDebounce } from '@/shared/hooks/useDebounce'
import { useInput } from '@/shared/hooks/useInput'

import { useGetSearchResultQuery } from '../../api/search.api'
import { SearchResult } from '../searchResult/SearchResult'

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
						<SearchResult
							key={item.id}
							clickHandler={clickHandler}
							searchItem={item}
						/>
					))}
				</div>
			)}
		</div>
	)
})
