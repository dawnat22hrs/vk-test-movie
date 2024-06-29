import { makeAutoObservable, runInAction } from "mobx"
import { MovieService } from "shared/api/services/MovieService"
import { IMovie } from "shared/types/interfaces"

class MovieStore {
    movies: IMovie[] = []
    favoriteMovies: IMovie[] = JSON.parse(localStorage.getItem('favoriteMovies') || '[]')
    isLoading = false
    pagePosition = 1
    totalPage = 0
    filters: string[] = []

    constructor(){
        makeAutoObservable(this)
    }

    getMovieAction = async (genre?: string) => {
        try {
            this.isLoading = true
            const response = await MovieService.getMovieList(this.pagePosition, genre)

            runInAction(() => {
                this.totalPage = response.data.pages
                this.movies = response.data.docs
                this.isLoading = false
            })
        } catch(error) {
            this.isLoading =  false
        }
    }

    getFilterAction = (data: string, type: string) => {
        if (!this.filters.includes(data)) {
            this.filters.push( `&${type}=${data}`)
            this.getMovieAction(this.filters.join(''))
        }
    }

    deleteFilterAction = (data: string, type: string) => {
        this.filters.splice(this.filters.findIndex((item: string) => item === `&${type}=${data}`), 1)
        this.getMovieAction(this.filters.join(''))
    }

    prevPage = () => {
        if (this.pagePosition > 1) {
            this.pagePosition--
            this.getMovieAction(this.filters.join(''))
        }
    }

    nextPage = () => {
        if (this.pagePosition < this.totalPage) {
            this.pagePosition++
            this.getMovieAction(this.filters.join(''))
        }   
    }

    addToFavorite = (data: IMovie) => {
        if (!this.favoriteMovies.some((movie: IMovie) => movie.id === data.id)) {
            this.favoriteMovies.push(data)
            const sendMovies = JSON.stringify(this.favoriteMovies)
            localStorage.setItem('favoriteMovies', sendMovies)
        }
    }

    deleteMovie = (id: number) => {
        this.favoriteMovies.splice(this.favoriteMovies.findIndex((movie: IMovie) => movie.id === id), 1)
        const sendMovies = JSON.stringify(this.favoriteMovies)
        localStorage.setItem('favoriteMovies', sendMovies)
    }
}

export default new MovieStore()