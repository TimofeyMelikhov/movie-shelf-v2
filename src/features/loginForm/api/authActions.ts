import { createAsyncThunk } from '@reduxjs/toolkit'
import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword
} from 'firebase/auth'

import { ExtendedUser, IForm } from '../model/model'

export const registerUser = createAsyncThunk(
	'auth/registerUser',
	async ({ email, password }: IForm) => {
		const auth = getAuth()
		const { user } = await createUserWithEmailAndPassword(auth, email, password)
		const profileUserInfo = auth.currentUser
		console.log(profileUserInfo)
		const extendedUser = user as ExtendedUser
		const userInfo = {
			accessToken: extendedUser.accessToken,
			refreshToken: extendedUser.refreshToken,
			userId: extendedUser.uid,
			email: extendedUser.email
		}
		localStorage.setItem('userInfo', JSON.stringify(userInfo))
		return {
			email: extendedUser.email,
			id: extendedUser.uid,
			token: extendedUser.accessToken
		}
	}
)

export const loginUser = createAsyncThunk(
	'auth/loginUser',
	async ({ email, password }: IForm, { rejectWithValue }) => {
		try {
			const auth = getAuth()
			const { user } = await signInWithEmailAndPassword(auth, email, password)
			const extendedUser = user as ExtendedUser
			const userInfo = {
				accessToken: extendedUser.accessToken,
				refreshToken: extendedUser.refreshToken,
				userId: extendedUser.uid,
				email: extendedUser.email
			}
			localStorage.setItem('userInfo', JSON.stringify(userInfo))
			return {
				email: extendedUser.email,
				id: extendedUser.uid,
				token: extendedUser.accessToken
			}
		} catch (error: any) {
			return rejectWithValue(error.code)
		}
	}
)
