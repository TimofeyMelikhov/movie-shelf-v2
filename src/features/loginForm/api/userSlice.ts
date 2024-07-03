import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IInitialState, IUser } from '../model/model'

import { loginUser } from './authActions'

const initialState: IInitialState = {
	user: {} as IUser,
	isLoading: false,
	error: null
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
		},
		removeUser: state => {
			state.user.email = null
			state.user.token = null
			state.user.id = null
		},
		setError: (state, action: PayloadAction<string>) => {
			state.error = action.payload
		}
	},
	extraReducers(builder) {
		builder.addCase(loginUser.rejected, (state, action) => {
			state.error = action.payload as string
		})
	}
})

export const { setLoading, setUser, removeUser, setError } = userSlice.actions

export default userSlice.reducer
