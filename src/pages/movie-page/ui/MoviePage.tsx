import movieStore from 'store/movie-store'
import style from './movie-page.module.scss'
import { IMovie } from 'shared/types/interfaces'
import { BUTTON_VARIANT, Button } from 'shared/baseUi/Button'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

export const MoviePage = observer(() => {
    const { movies, addToFavorite, deleteMovie, favoriteMovies } = movieStore
    const currentPathId = Number(window.location.pathname.split('/')[2])
    const currentMovie = movies?.find((movie: IMovie) => movie.id === currentPathId)
    const navigate = useNavigate()
    const toggleMovie = favoriteMovies.some((movie: IMovie) => movie.id === currentMovie?.id)


    const favoriteController = (data: IMovie) => {
        if (toggleMovie) {
            deleteMovie(data.id)
        } else {
            addToFavorite(data)
        }
    }


    return (
        <div className={style.wrapper}>
            {
                currentMovie?.poster ? <img src={currentMovie.poster.url} alt='poster' className={style.poster}/> 
                : <div className={style.noposter}><span>Нет постера</span></div>
            }
            <div className={style.infoContainer}>
                <div>
                    <span className={style.mark}>Название: </span>
                    <span>{ currentMovie?.name ?  currentMovie?.name : currentMovie?.alternativeName }</span>
                </div>
                <div>
                    <span className={style.mark}>Описание фильма: </span>
                    <span>{ currentMovie?.description }</span>
                </div>
                <div>
                    <span className={style.mark}>Рейтинг: </span>
                    <span>{ currentMovie?.rating.kp }</span>
                </div>
                <div>
                    <span className={style.mark}>Дата выхода: </span>
                    <span>{ currentMovie?.year }</span>
                </div>
                <div>
                    <span className={style.mark}>Жанры: </span>
                    <ul>{ currentMovie?.genres.map(genre => <li key={genre.name}>{ genre.name }</li>) }</ul>
                </div>
                <div className={style.btnBlock}>
                    <Button variant={BUTTON_VARIANT.SECONDARY} click={() => navigate('/')}>Назад</Button>
                    { currentMovie && <Button variant={BUTTON_VARIANT.PRIMARY} click={() => favoriteController(currentMovie)}>{ toggleMovie ? 'Не нравится' : 'Нравится' }</Button> }
                </div>
            </div> 
        </div>
    )
})