import { IInfoMessage } from './models'

// import styles from './style.module.scss'

export const InfoMessage = ({ message, type }: IInfoMessage) => {
	return (
		<div
			style={{
				padding: '10px',
				margin: '10px 0',
				border: '1px solid',
				borderColor: type === 'error' ? 'red' : 'green',
				color: type === 'error' ? 'red' : 'green',
				borderRadius: '5px',
				backgroundColor: type === 'error' ? '#ffe6e6' : '#e6ffe6',
				fontSize: '14px'
			}}
		>
			{message}
		</div>
	)
}
