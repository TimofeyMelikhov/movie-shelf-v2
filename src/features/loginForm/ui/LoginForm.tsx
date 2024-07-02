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

import { FormType, IForm } from '../model/model'

import styles from './styles.module.scss'

export const LoginForm = memo(() => {
	const dispatch = useAppDispatch()

	const navigate = useNavigate()

	const { register, handleSubmit, formState } = useForm<IForm>({
		mode: 'onChange'
	})
	const loginError = formState.errors.email?.message
	const passwordError = formState.errors.password?.message

	const onSubmit: SubmitHandler<IForm> = ({ email, password }) => {
		const auth = getAuth()
		if (formType === 'register') {
			createUserWithEmailAndPassword(auth, email, password)
				.then(({ user }) => {
					// dispatch(
					// 	setUser({
					// 		email: user.email,
					// 		id: user.uid,
					// 		token: user.accessToken
					// 	})
					// )
					navigate('/')
				})
				.catch(console.error)
		} else {
			signInWithEmailAndPassword(auth, email, password)
				.then(console.log)
				.catch(console.error)
		}
		// dispatch()
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
