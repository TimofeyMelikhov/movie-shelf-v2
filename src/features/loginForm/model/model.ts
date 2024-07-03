import { User } from 'firebase/auth'

export interface ExtendedUser extends User {
	accessToken: string
}

export interface IForm {
	email: string
	password: string
}

export interface IInitialState {
	user: IUser
	isLoading: boolean
	error: null | string
}

export interface IUser {
	email: null | string
	token: null | string
	id: null | string
}

export type FormType = 'login' | 'register'
