import { memo, useEffect, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useAuthInitializing } from '@/app/AuthProvider'

import { useAppDispatch } from '@/shared/hooks/useAppDispatch'
import { useAppSelector } from '@/shared/hooks/useAppSelector'
import { InfoMessage } from '@/shared/ui/infoMessage/InfoMessage'
import { Modal } from '@/shared/ui/modal/Modal'
import { UserForm } from '@/shared/ui/userForm/UserForm'

import { loginUser, registerUser, resetPassword } from '../api/authActions'
import { clearInfoMessage, setLoading } from '../api/userSlice'
import { FormType, IForm } from '../model/model'
import { errorHandler } from '../utils/errorHandler'

import styles from './styles.module.scss'

export const LoginForm = memo(() => {
	const [formType, setFormType] = useState<FormType>('login')

	const { setIsRegistered } = useAuthInitializing()
	const dispatch = useAppDispatch()
	const { infoMessage } = useAppSelector(state => state.userReducer)
	const navigate = useNavigate()
	const [active, setActive] = useState<boolean>(false)

	const formTypeHandler = (newType: FormType) => {
		setFormType(newType)
	}

	useEffect(() => {
		if (infoMessage) {
			const timer = setTimeout(() => {
				dispatch(clearInfoMessage())
			}, 3500)
			return () => clearTimeout(timer)
		}
	}, [infoMessage, dispatch])

	const onSubmit: SubmitHandler<IForm> = async ({
		email,
		password,
		nickName
	}) => {
		dispatch(setLoading(true))

		if (formType === 'register') {
			await dispatch(registerUser({ email, password, nickName }))
			setIsRegistered(true)
			formTypeHandler('login')
		} else {
			await dispatch(loginUser({ email, password }))
			navigate('/')
		}

		dispatch(setLoading(false))
	}

	const showModal = () => {
		setActive(true)
	}

	const onSubmitResetPass: SubmitHandler<{ email: string }> = async data => {
		dispatch(setLoading(true))
		await dispatch(resetPassword(data.email))
		dispatch(setLoading(false))
		setActive(false)
	}

	return (
		<div className={styles.formWrapper}>
			{infoMessage && (
				<InfoMessage
					message={errorHandler(infoMessage.message)}
					type={infoMessage.type}
				/>
			)}
			{formType === 'login' ? (
				<>
					<h1>Авторизация</h1>
					<UserForm onSubmit={onSubmit} formType={formType} />

					<div className={styles.formWrapper__togle}>
						Нет аккаунта?{' '}
						<span
							className={styles.formWrapper__togle_btn}
							onClick={() => formTypeHandler('register')}
						>
							Зарегистрируйтесь!
						</span>
					</div>
				</>
			) : (
				<>
					<h1>Регистрация</h1>
					<UserForm onSubmit={onSubmit} formType={formType} />
					<div className={styles.formWrapper__togle}>
						Уже есть аккаунт?{' '}
						<span
							className={styles.formWrapper__togle_btn}
							onClick={() => formTypeHandler('login')}
						>
							Войти
						</span>
					</div>
				</>
			)}
			{formType !== 'register' && (
				<button className={styles.resetPass} onClick={showModal}>
					Забыли пароль?
				</button>
			)}
			<Modal active={active} setActive={setActive}>
				<p>
					Введите адрес электронной почты на который был зарегистрирован аккаунт
				</p>
				<UserForm onSubmit={onSubmitResetPass} formType={'reset_password'} />
			</Modal>
		</div>
	)
})
