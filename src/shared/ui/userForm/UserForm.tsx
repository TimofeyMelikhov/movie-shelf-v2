import { memo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { GoEye, GoEyeClosed } from 'react-icons/go'
import {
	MdAlternateEmail,
	MdDriveFileRenameOutline,
	MdOutlinePassword
} from 'react-icons/md'

import { useAppSelector } from '@/shared/hooks/useAppSelector'

import { Preloader } from '../preloader/Preloader'

import { IForm, IUserFormProps } from './model'
import styles from './styles.module.scss'

export const UserForm = memo(({ onSubmit, formType }: IUserFormProps) => {
	const isLoading = useAppSelector(state => state.userReducer.isLoading)

	const { register, handleSubmit, formState, reset } = useForm<IForm>({
		mode: 'onSubmit'
	})
	const [passwordVisible, setPasswordVisible] = useState(false)

	const loginError = formState.errors.email?.message
	const passwordError = formState.errors.password?.message
	const nameError = formState.errors.nickName?.message

	const btnText = formType === 'login' ? 'Войти' : 'Зарегистрироваться'

	const handleFormSubmit = async (data: IForm) => {
		await onSubmit(data)
		reset()
	}

	return (
		<form
			className={styles.loginForm}
			onSubmit={handleSubmit(handleFormSubmit)}
		>
			<div className={styles.inputWrapper}>
				<div className={styles.iconWrapper}>
					<MdAlternateEmail />
				</div>
				<input
					type='email'
					placeholder='email'
					{...register('email', {
						required: 'Введите логин'
					})}
				/>
				{loginError && (
					<div className={styles.errorMessage}> {loginError} </div>
				)}
			</div>

			<div className={styles.inputWrapper}>
				<div className={styles.iconWrapper}>
					<MdOutlinePassword />
				</div>
				<input
					type={passwordVisible ? 'text' : 'password'}
					placeholder='пароль'
					{...register('password', {
						required: 'Введите пароль',
						minLength: {
							value: 6,
							message: 'Пароль должен содержать не менее 6 символов!'
						}
					})}
				/>
				<div
					className={styles.iconWrapper_eye}
					onClick={() => setPasswordVisible(prev => !prev)}
				>
					{passwordVisible ? <GoEyeClosed /> : <GoEye />}
				</div>
				{passwordError && (
					<div className={styles.errorMessage}> {passwordError} </div>
				)}
			</div>
			{formType === 'register' && (
				<div className={styles.inputWrapper}>
					<div className={styles.iconWrapper}>
						<MdDriveFileRenameOutline />
					</div>
					<input
						type='string'
						placeholder='отображаемое имя'
						{...register('nickName', {
							required: 'Введите имя'
						})}
					/>
					{nameError && (
						<div className={styles.errorMessage}> {nameError} </div>
					)}
				</div>
			)}
			<button disabled={isLoading}>
				{!isLoading ? btnText : <Preloader size='small' />}
			</button>
		</form>
	)
})
