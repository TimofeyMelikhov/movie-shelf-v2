import { memo } from 'react'
import { useForm } from 'react-hook-form'
import { CiLogin } from 'react-icons/ci'
import { RiLockPasswordLine } from 'react-icons/ri'

import { ErrorMessage } from '../errorMessage/ErrorMessage'

import { IForm, IUserFormProps } from './model'
import styles from './styles.module.scss'

export const UserForm = memo(({ onSubmit, formType }: IUserFormProps) => {
	const { register, handleSubmit, formState } = useForm<IForm>({
		mode: 'onChange'
	})

	const loginError = formState.errors.email?.message
	const passwordError = formState.errors.password?.message

	let btnText = formType === 'login' ? 'Войти' : 'Зарегистрироваться'

	return (
		<form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.inputWrapper}>
				<div className={styles.iconWrapper}>
					<CiLogin />
				</div>
				<input
					type='email'
					placeholder='логин'
					{...register('email', {
						required: 'Введите логин'
					})}
				/>
			</div>
			{loginError && <ErrorMessage message={loginError} />}

			<div className={styles.inputWrapper}>
				<div className={styles.iconWrapper}>
					<RiLockPasswordLine />
				</div>
				<input
					type='password'
					placeholder='пароль'
					{...register('password', {
						required: 'Введите пароль'
					})}
				/>
			</div>
			{passwordError && <ErrorMessage message={passwordError} />}
			<button>{btnText}</button>
		</form>
	)
})
