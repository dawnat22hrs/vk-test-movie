export interface INameOnly {
    name: string
}

export interface IVotes {
    kp: string
    imdb: number
    tmdb: number
    filmCritics: number
    russianFilmCritics: number
    await: number
}

export interface IRating extends Omit<IVotes, 'kp'> {
    kp: number
}

export interface IPoster {
    url: string
    previewUrl: string
}

export interface IMovie {
    id: number
    ageRating: number
    alternativeName: string
    countries: INameOnly[]
    description: string
    enName: string
    genres: INameOnly[]
    isSeries: boolean
    movieLength: number
    name: string
    rating: IRating
    ratingMpaa: string
    seriesLength: number
    shortDescription: string
    status: string
    ticketsOnSale: boolean
    top10: number
    top250: number
    totalSeriesLength: number
    type: string
    typeNumber: number
    votes: IVotes
    year: number
    poster: IPoster
}

export interface IResponse {
    docs: IMovie[]
    limit: number
    page: number
    pages: number
    total: number
}