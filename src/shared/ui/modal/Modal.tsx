import { ReactNode } from 'react'
import { IoIosClose } from 'react-icons/io'

import styles from './modal.module.scss'

interface IModalProps {
	active: boolean
	setActive: React.Dispatch<React.SetStateAction<boolean>>
	children: ReactNode
}

export const Modal = ({ active, setActive, children }: IModalProps) => {
	return (
		<div className={`${styles.modal} ${active ? styles.active : ''}`}>
			<div className={styles.modal__content}>
				<div className={styles.modal__close} onClick={() => setActive(false)}>
					<IoIosClose />
				</div>
				{children}
			</div>
		</div>
	)
}
