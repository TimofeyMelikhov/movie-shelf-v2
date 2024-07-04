import { SubmitHandler } from 'react-hook-form'

import { FormType } from '@/features/loginForm/model/model'

export interface IForm {
	email: string
	password: string
	nickName: string
}
export interface IUserFormProps {
	onSubmit: SubmitHandler<IForm>
	formType: FormType
}
