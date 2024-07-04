import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IInitialState, IUser } from '../model/model'

import { loginUser, registerUser } from './authActions'

const initialState: IInitialState = {
	user: {} as IUser,
	isLoading: false,
	errorLogin: null,
	errorRegistr: null
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload
		},
		setUser: (state, action: PayloadAction<IUser>) => {
			state.user.email = action.payload.email
			state.user.token = action.payload.token
			state.user.id = action.payload.id
			state.user.nickName = action.payload.nickName
		},
		removeUser: state => {
			state.user.email = null
			state.user.token = null
			state.user.id = null
			state.user.nickName = null
		},
		dropLoginError: state => {
			state.errorLogin = null
		}
	},
	extraReducers(builder) {
		builder
			.addCase(loginUser.rejected, (state, action) => {
				state.errorLogin = action.payload as string
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.errorRegistr = action.payload as string
			})
	}
})

export const { setLoading, setUser, removeUser, dropLoginError } =
	userSlice.actions

export default userSlice.reducer
