import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IInitialState, IUser } from '../model/model'

import { loginUser, registerUser } from './authActions'

const initialState: IInitialState = {
	user: {} as IUser,
	isLoading: false,
	infoMessage: null
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload
		},
		removeUser: state => {
			state.user.email = null
			state.user.token = null
			state.user.id = null
			state.user.nickName = null
		},
		clearInfoMessage: state => {
			state.infoMessage = null
		}
	},
	extraReducers(builder) {
		builder
			.addCase(loginUser.fulfilled, (state, action: PayloadAction<IUser>) => {
				state.user.email = action.payload.email
				state.user.token = action.payload.token
				state.user.id = action.payload.id
				state.user.nickName = action.payload.nickName
				state.user.photoURL = action.payload.photoURL
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.infoMessage = { type: 'error', message: action.payload as string }
			})
			.addCase(registerUser.fulfilled, state => {
				state.infoMessage = {
					type: 'success',
					message: 'Регистрация прошла успешно!'
				}
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.infoMessage = { type: 'error', message: action.payload as string }
			})
	}
})

export const { setLoading, removeUser, clearInfoMessage } = userSlice.actions

export default userSlice.reducer
