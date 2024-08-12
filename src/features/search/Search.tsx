import { memo, useState } from 'react'

import { useDebounce } from '@/shared/hooks/useDebounce'
import { useInput } from '@/shared/hooks/useInput'

import styles from './style.module.scss'

export const Search = memo(() => {
	const [dropdown, setDropdown] = useState<boolean>(false)

	const input = useInput('')
	const debounced = useDebounce<string>(input.value, 550)

	return (
		<div className={styles.serarch_container}>
			<input
				className={styles.search}
				value={input.value}
				onChange={input.onChange}
				type='text'
				placeholder='Поиск'
			/>

			{dropdown && <div className={styles.dropdown}></div>}
		</div>
	)
})
