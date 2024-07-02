import { IErrorMessage } from '../model/models'

import styles from './style.module.scss'

export const ErrorMessage = ({ message }: IErrorMessage) => {
	if (!message) return null
	return <p className={styles.errorMessage}>{message}</p>
}
