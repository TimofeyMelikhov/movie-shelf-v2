import {
	ICountries,
	IGenres,
	IPoster,
	IRating
} from '../../../shared/model/moviesModel'

export interface ICardMovies {
	id: number
	name: string
	poster: IPoster
	genres: IGenres[]
	year: number
	countries: ICountries[]
	rating: IRating
}
