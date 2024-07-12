import { createAsyncThunk } from '@reduxjs/toolkit'
import {
	createUserWithEmailAndPassword,
	getAuth,
	sendEmailVerification,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	updateProfile
} from 'firebase/auth'

import { ExtendedUser, IForm } from '../model/model'

export const registerUser = createAsyncThunk(
	'auth/registerUser',
	async ({ email, password, nickName }: IForm, { rejectWithValue }) => {
		try {
			const auth = getAuth()
			const { user } = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)
			await updateProfile(user, { displayName: nickName })

			await sendEmailVerification(user)

			const extendedUser = user as ExtendedUser
			return {
				email: extendedUser.email,
				id: extendedUser.uid,
				token: extendedUser.accessToken,
				nickName: extendedUser.displayName
			}
		} catch (error: any) {
			return rejectWithValue(error.code)
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
				email: extendedUser.email,
				nickName: extendedUser.displayName,
				photoURL: extendedUser.photoURL,
				emailVerified: extendedUser.emailVerified
			}
			localStorage.setItem('userInfo', JSON.stringify(userInfo))
			return {
				email: extendedUser.email,
				id: extendedUser.uid,
				token: extendedUser.accessToken,
				nickName: extendedUser.displayName,
				photoURL: extendedUser.photoURL,
				emailVerified: extendedUser.emailVerified
			}
		} catch (error: any) {
			return rejectWithValue(error.code)
		}
	}
)

export const resetPassword = createAsyncThunk(
	'auth/resetPass',
	async (email: string, { rejectWithValue }) => {
		try {
			const auth = getAuth()
			await sendPasswordResetEmail(auth, email)
		} catch (error: any) {
			return rejectWithValue(error.code)
		}
	}
)
