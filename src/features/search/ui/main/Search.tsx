import { memo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDebounce } from '@/shared/hooks/useDebounce'
import { useInput } from '@/shared/hooks/useInput'
import { Preloader } from '@/shared/ui/preloader/Preloader'

import {
	useGetMovieSearchResultQuery,
	useGetPersonSearchResultQuery
} from '../../api/search.api'
import { SearchResult } from '../searchResult/SearchResult'

import styles from './style.module.scss'

export const Search = memo(() => {
	const navigate = useNavigate()
	const [dropdown, setDropdown] = useState<boolean>(false)

	const input = useInput('')
	const debounced = useDebounce<string>(input.value, 600)

	const { data, isLoading, isFetching } = useGetMovieSearchResultQuery(
		debounced,
		{
			skip: debounced.length < 3
		}
	)
	const { data: person } = useGetPersonSearchResultQuery(debounced, {
		skip: debounced.length < 3
	})

	console.log(person)

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
					{isLoading || isFetching ? (
						<div className={styles.preloaderWrapper}>
							<Preloader size='middle' />
						</div>
					) : (
						<>
							{data?.docs.map(item => (
								<SearchResult
									key={item.id}
									clickHandler={clickHandler}
									searchItem={item}
								/>
							))}
						</>
					)}
					{!data?.docs.length && (
						<div className={styles.withoutResult}>
							По вашему результату ничего не найдено
						</div>
					)}
				</div>
			)}
		</div>
	)
})
