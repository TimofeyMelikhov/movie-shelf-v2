import { IErrorMessage } from './models'
import styles from './style.module.scss'

export const ErrorMessage = ({
	message = 'Произошла ошибка'
}: IErrorMessage) => {
	if (!message) return null
	return <p className={styles.errorMessage}>{message}</p>
}
