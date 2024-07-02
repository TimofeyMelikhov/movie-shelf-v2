import { User } from 'firebase/auth'

export interface ExtendedUser extends User {
	accessToken: string
}

export interface IForm {
	email: string
	password: string
}
export type FormType = 'login' | 'register'
