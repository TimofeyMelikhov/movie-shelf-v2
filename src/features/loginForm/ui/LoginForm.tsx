import { memo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CiLogin } from 'react-icons/ci'
import { RiLockPasswordLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword
} from 'firebase/auth'

import { setUser } from '@/pages/auth/api/userSlice'

import { ErrorMessage } from '@/shared/errorMessage/ui/ErrorMessage'
import { useAppDispatch } from '@/shared/hooks/useAppDispatch'

import { ExtendedUser, FormType, IForm } from '../model/model'

import styles from './styles.module.scss'

export const LoginForm = memo(() => {
	const dispatch = useAppDispatch()

	const navigate = useNavigate()

	const { register, handleSubmit, formState } = useForm<IForm>({
		mode: 'onChange'
	})
	const loginError = formState.errors.email?.message
	const passwordError = formState.errors.password?.message

	const onSubmit: SubmitHandler<IForm> = async ({ email, password }) => {
		const auth = getAuth()
		if (formType === 'register') {
			try {
				const { user } = await createUserWithEmailAndPassword(
					auth,
					email,
					password
				)
				const extendedUser = user as ExtendedUser
				dispatch(
					setUser({
						email: extendedUser.email,
						id: extendedUser.uid,
						token: extendedUser.accessToken
					})
				)
			} catch (error) {
				console.error(error)
				alert('Ошибка регистрации')
			}
		} else {
			try {
				const { user } = await signInWithEmailAndPassword(auth, email, password)
				const extendedUser = user as ExtendedUser
				dispatch(
					setUser({
						email: extendedUser.email,
						id: extendedUser.uid,
						token: extendedUser.accessToken
					})
				)
				alert('добро пожаловать')
				navigate('/')
			} catch (error) {
				console.error(error)
				alert('Ошибка авторизации')
			}
		}
	}

	const [formType, setFormType] = useState<FormType>('login')

	const formTypeHandler = (newType: FormType) => {
		setFormType(newType)
	}

	return (
		<>
			{formType === 'login' ? (
				<form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
					<h1>Авторизация</h1>
					<div className={styles.inputWrapper}>
						<div className={styles.iconWrapper}>
							<CiLogin />
						</div>
						<input
							type='text'
							placeholder='логин'
							{...register('email', {
								required: 'Логин не может быть пустым'
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
					<button>Войти</button>
					<p
						className={styles.formToggle}
						onClick={() => formTypeHandler('register')}
					>
						Зарегистрироваться
					</p>
				</form>
			) : (
				<form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
					<h1>Регистрация</h1>
					<div className={styles.inputWrapper}>
						<div className={styles.iconWrapper}>
							<CiLogin />
						</div>
						<input
							type='text'
							placeholder='логин'
							{...register('email', {
								required: 'Логин не может быть пустым'
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
					<button>Войти</button>
					<p
						className={styles.formToggle}
						onClick={() => formTypeHandler('login')}
					>
						Войдите, если уже есть аккаунт
					</p>
				</form>
			)}
		</>
	)
})
