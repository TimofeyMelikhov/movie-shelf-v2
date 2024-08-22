import styles from './styles.module.scss'

export const Preloader = ({ size }: { size: string }) => {
	const sizeClass =
		size === 'small'
			? styles.small
			: size === 'middle'
				? styles.middle
				: size === 'large'
					? styles.large
					: ''

	return (
		<div className={`${styles.preloader} ${sizeClass}`}>
			<div className={styles.spinner}></div>
		</div>
	)
}
