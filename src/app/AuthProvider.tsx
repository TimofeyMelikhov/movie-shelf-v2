import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useContext,
	useEffect,
	useState
} from 'react'

import { getAuth, onAuthStateChanged } from 'firebase/auth'

import { removeUser, setUser } from '@/features/loginForm/api/userSlice'
import { ExtendedUser } from '@/features/loginForm/model/model'

import { useAppDispatch } from '@/shared/hooks/useAppDispatch'

interface AuthContextProps {
	initializing: boolean
	setIsRegistered: Dispatch<SetStateAction<boolean>>
	isRegistered: boolean
}
interface AuthProviderProps {
	children: ReactNode
}

const AuthContext = createContext<AuthContextProps>({
	initializing: true,
	setIsRegistered: () => {},
	isRegistered: false
})

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const dispatch = useAppDispatch()
	const [initializing, setInitializing] = useState<boolean>(true)
	const [isRegistered, setIsRegistered] = useState<boolean>(false)

	useEffect(() => {
		const auth = getAuth()
		const unsubscribe = onAuthStateChanged(auth, user => {
			if (user && !isRegistered) {
				const extendedUser = user as ExtendedUser
				const userInfo = {
					token: extendedUser.accessToken,
					id: extendedUser.uid,
					email: extendedUser.email,
					nickName: extendedUser.displayName,
					photoURL: extendedUser.photoURL
				}
				localStorage.setItem('userInfo', JSON.stringify(userInfo))
				dispatch(setUser(userInfo))
			} else {
				dispatch(removeUser())
				localStorage.removeItem('userInfo')
			}
			setInitializing(false)
		})

		return () => unsubscribe()
	}, [dispatch, isRegistered])

	const contextValue = { initializing, isRegistered, setIsRegistered }

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	)
}

export const useAuthInitializing = () => useContext(AuthContext)
