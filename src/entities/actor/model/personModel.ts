export interface IPerson {
	id: number
	name: string
	enName: string
	photo: string
	sex: string
	growth: number
	birthday: string
	death: string | null
	age: number
	birthPlace: IBirthAndPlace[]
	deathPlace: IBirthAndPlace[]
	spouses: ISpouses[]
	countAwards: number | null
}

interface IBirthAndPlace {
	value: string
}

interface ISpouses {
	id: number
	name: string | null
	divorced: boolean
	children: number
	relation: string
}
