import { ICountries, IGenres, IPoster, IRating } from './moviesModel'

export interface ICardMovies {
	name: string
	poster: IPoster
	genres: IGenres[]
	year: number
	countries: ICountries[]
	rating: IRating
}
