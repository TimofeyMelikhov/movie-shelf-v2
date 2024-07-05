export const errorHandler = (errorCode: string | null) => {
	switch (errorCode) {
		case null:
			return undefined
		case 'auth/invalid-credential':
			return 'Неверный логин или пароль'
		case 'auth/user-disabled':
			return 'Пользователь был заблокирован. Пожалуйста обратитесь к администратору'
		case 'auth/too-many-requests':
			return 'Превышено количество попыток авторизации. Пожалуйста попробуйте позже'
		case 'auth/email-already-in-use':
			return 'Этот email уже используется другим аккаунтом'
		default:
			return errorCode
	}
}
