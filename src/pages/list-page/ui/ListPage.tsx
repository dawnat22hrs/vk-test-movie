import { observer } from "mobx-react-lite"
import { useEffect, useMemo, useState } from "react"
import { IMovie } from "shared/types/interfaces"
import movieStore from "store/movie-store"
import style from './list-page.module.scss'
import { MovieCard } from "entities/MovieCard/ui/MovieCard"
import { BUTTON_VARIANT, Button } from "shared/baseUi/Button"
import { useNavigate } from "react-router-dom"
import { Filters } from "features/filters"

export const ListPage = observer(() => {
    const { getMovieAction, movies, prevPage, nextPage, isLoading } = movieStore
    const navigate = useNavigate()
    const [currentMovies, setCurrentMovies] = useState<IMovie[]>([]) 

    useEffect(() => {
        if (!currentMovies.length) getMovieAction()
    }, [getMovieAction, currentMovies])

    useMemo(() => {
        setCurrentMovies(movies)
    }, [movies])

    return (
        <div className={style.movieListWrapper}>
            {
                isLoading ? 
                    <div className={style.loading}><span>Loading...</span></div>
                : 
                    <>
                     <div className={`${style.controllerPaginationBase} ${style.controllerPaginationHeader}`}>
                        <Button variant={BUTTON_VARIANT.SECONDARY} click={() => prevPage()}>Назад</Button>
                        <Button variant={BUTTON_VARIANT.PRIMARY} click={() => navigate('/favorite')}>Любимые фильмы</Button>
                        <Button variant={BUTTON_VARIANT.SECONDARY} click={() => nextPage()}>Вперед</Button>
                    </div>
                    <Filters />
                    <div className={style.movieList}>
                        {
                            currentMovies.map((movie: IMovie) => <MovieCard key={movie.id} {...movie} />)
                        }
                    </div>
                    <div className={`${style.controllerPaginationBase} ${style.controllerPaginationFooter}`}>
                        <Button variant={BUTTON_VARIANT.SECONDARY} click={() => prevPage()}>Назад</Button>
                        <Button variant={BUTTON_VARIANT.SECONDARY} click={() => nextPage()}>Вперед</Button>
                    </div>
                </>
            }
           
        </div>
    )
})