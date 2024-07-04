import { memo, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '@/shared/hooks/useAppDispatch'
import { useAppSelector } from '@/shared/hooks/useAppSelector'
import { ErrorMessage } from '@/shared/ui/errorMessage/ErrorMessage'
import { Preloader } from '@/shared/ui/preloader/Preloader'
import { UserForm } from '@/shared/ui/userForm/UserForm'

import { loginUser, registerUser } from '../api/authActions'
import { setLoading } from '../api/userSlice'
import { FormType, IForm } from '../model/model'

import styles from './styles.module.scss'

export const LoginForm = memo(() => {
	const [formType, setFormType] = useState<FormType>('login')
	const dispatch = useAppDispatch()
	const { isLoading, errorLogin, errorRegistr } = useAppSelector(
		state => state.userReducer
	)
	const navigate = useNavigate()

	const formTypeHandler = (newType: FormType) => {
		setFormType(newType)
	}

	const onSubmit: SubmitHandler<IForm> = async ({
		email,
		password,
		nickName
	}) => {
		dispatch(setLoading(true))
		if (formType === 'register') {
			await dispatch(registerUser({ email, password, nickName }))
		} else {
			await dispatch(loginUser({ email, password }))
			navigate('/')
		}

		dispatch(setLoading(false))
	}

	return (
		<>
			{formType === 'login' ? (
				<div className={styles.formWrapper}>
					<h1>Авторизация</h1>
					<UserForm onSubmit={onSubmit} formType={formType} />
					{errorLogin && (
						<ErrorMessage
							message={
								errorLogin === 'auth/invalid-credential'
									? 'Неверный логин или пароль'
									: undefined
							}
						/>
					)}
					<div className={styles.formWrapper__togle}>
						Нет аккаунта?{' '}
						<span
							className={styles.formWrapper__togle_btn}
							onClick={() => formTypeHandler('register')}
						>
							Зарегистрируйтесь!
						</span>
					</div>
					{isLoading && <Preloader />}
				</div>
			) : (
				<div className={styles.formWrapper}>
					<h1>Регистрация</h1>
					<UserForm onSubmit={onSubmit} formType={formType} />
					{errorRegistr && (
						<ErrorMessage message={'Произошла ошибка при регистрации'} />
					)}
					<div className={styles.formWrapper__togle}>
						Уже есть аккаунт?{' '}
						<span
							className={styles.formWrapper__togle_btn}
							onClick={() => formTypeHandler('login')}
						>
							Войти
						</span>
					</div>
					{isLoading && <Preloader />}
				</div>
			)}
		</>
	)
})
