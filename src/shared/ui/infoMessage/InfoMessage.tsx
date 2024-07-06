import { memo, useEffect, useState } from 'react'

import { IInfoMessage } from './models'
import styles from './style.module.scss'

export const InfoMessage = memo(({ message, type }: IInfoMessage) => {
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => {
			setVisible(true)
		}, 0)

		const hideTimer = setTimeout(() => {
			setVisible(false)
		}, 3000)

		return () => {
			clearTimeout(timer)
			clearTimeout(hideTimer)
		}
	}, [])

	return (
		<div
			className={`${styles.infoMessage} ${styles[type]} ${visible ? styles.visible : styles.hidden}`}
		>
			{message}
		</div>
	)
})
