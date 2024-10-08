import { User } from 'firebase/auth'

export interface ExtendedUser extends User {
	accessToken: string
}

export interface IForm {
	email: string
	password: string
	nickName?: string
}

export interface IInitialState {
	user: IUser
	isLoading: boolean
	infoMessage: { type: 'error' | 'success'; message: string } | null
}

export interface IInitialFormState {
	formType: FormType
	isModalOpen: boolean
}

export interface IUser {
	email: null | string
	token: null | string
	id: null | string
	nickName: string | null
	photoURL: string | null
	emailVerified: boolean
}

export type FormType = 'login' | 'register' | 'reset_password'
