import { observer } from "mobx-react-lite"
import { IMovie } from "shared/types/interfaces"
import style from './favorite-page.module.scss'
import { MovieCard } from "entities/MovieCard/ui/MovieCard"
import { BUTTON_VARIANT, Button } from "shared/baseUi/Button"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

export const FavoritePage = observer(() => {
    const movies: IMovie[] = JSON.parse(localStorage.getItem('favoriteMovies') || '[]')
    const [currentMovies, setCurrentMovies] = useState(movies)
    const [loaded, setLoaded] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (loaded) return 
        setCurrentMovies(movies)
        setLoaded(true)
    }, [movies, loaded])

    return (
        <div className={style.movieListWrapper}>
            <div className={style.controllerBtn}>
                <Button variant={BUTTON_VARIANT.PRIMARY} click={() => navigate('/')}>Главная</Button>
            </div>
            <div className={style.movieList}>
                {
                    currentMovies.length ? 
                        currentMovies.map((movie: IMovie) => <MovieCard key={movie.id} {...movie} />)
                    : <span>Список пуст</span>
                }
            </div>
        </div>
    )
})