import { SubmitHandler } from 'react-hook-form'

export interface IForm {
	email: string
	password: string
}
export interface IUserFormProps {
	onSubmit: SubmitHandler<IForm>
	formType: string
}
