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
	profession: IProfession[]
	movies: IMoviesPerson[]
}

interface IMoviesPerson {
	alternativeName: string
	description: string
	enProfession: string
	general: boolean
	id: number
	name: string
	rating: number | null
}

interface IProfession {
	value: string
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
	divorcedReason: string
}
