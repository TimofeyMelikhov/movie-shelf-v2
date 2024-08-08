export interface IServerResponse<T> {
	docs: T
	limit: number
	page: number
	pages: number
	total: number
}

export interface IMovies {
	id: number
	name: string
	ageRating: number
	alternativeName: string
	enName: string | null
	genres: IGenres[]
	countries: ICountries[]
	backdrop: IPoster
	description: string
	isSeries: boolean
	movieLength: number
	poster: IPoster
	rating: IRating
	ratingMpaa: string
	seriesLength: null | number
	shortDescription: string
	status: null | string
	top10: number
	top250: number
	totalSeriesLength: null | number
	type: string
	year: number
	votes: IVotes
	slogan: string
	budget: IBudget
	persons: IPerson[]
	fees: {
		russia: IBudget
		usa: IBudget
		world: IBudget
	}
	audience: IAudience[]
	premiere: IPremiere
	videos: {
		trailers: IVideos[]
	}
	distributors: {
		distributor: string | null
		distributorRelease: string | null
	}
}

export interface IVideos {
	name: string
	site: string
	type: string
	url: string
}

interface IAudience {
	count: number
	country: string
}

interface IPremiere {
	bluray: string | null
	cinema: string | null
	country: string | null
	digital: string | null
	dvd: string | null
	russia: string | null
	world: string | null
}

export interface IPerson {
	id: number
	name: string
	enName: string
	enProfession: string
	description: string
	profession: string
	photo: string
}

interface IBudget {
	currency: string
	value: number
}

export interface IGenres {
	name: string
}
export interface ICountries {
	name: string
}
export interface IPoster {
	previewUrl: string
	url: string
}
export interface IRating {
	await: null
	filmCritics: number
	imdb: number
	kp: number
}
export interface IVotes {
	await: number
	filmCritics: number
	imdb: number
	kp: number
}

export interface IReviews {
	id: number
	movieId: number
	title: string
	type: string
	review: string
	date: string
	author: string
	userRating: number
	reviewDislikes: number
	reviewLikes: number
	updatedAt: string
	authorId: number
}
