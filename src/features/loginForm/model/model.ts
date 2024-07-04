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
	errorLogin: null | string
	errorRegistr: null | string
}

export interface IUser {
	email: null | string
	token: null | string
	id: null | string
	nickName: string | null
}

export type FormType = 'login' | 'register'
