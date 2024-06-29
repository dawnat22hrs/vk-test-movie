import { IMovie } from "shared/types/interfaces"
import style from './movie-card.module.scss'
import { useNavigate } from "react-router-dom"
import { BUTTON_VARIANT, Button } from "shared/baseUi/Button"
import movieStore from "store/movie-store"
import { observer } from "mobx-react-lite"

export const MovieCard = observer((data: IMovie) => {
    const { poster, name, year, rating, id, alternativeName } = data
    const navigate = useNavigate()
    const { addToFavorite, favoriteMovies, deleteMovie } = movieStore
    const toggleMovie = favoriteMovies.some((movie: IMovie) => movie.id === id)

    const handleClick = (event: MouseEvent) => {
        event?.stopPropagation()
        if (toggleMovie) {
            deleteMovie(id)
        } else {
            addToFavorite(data)
        }
    }

    return (
        <div className={style.card} onClick={() => navigate(`/movie/${id}`)} >
            <div className={style.btnBlock}>
                <Button variant={BUTTON_VARIANT.PRIMARY} click={(event: MouseEvent) => handleClick(event)}>{ toggleMovie ? 'Не нравится' : 'Нравится' }</Button>
            </div>
            {
                poster ? <img src={poster.previewUrl} className={style.poster} /> : <div className={style.noposter}>Нет постера</div>
            }
            <div className={style.infoContainer}>
                <div className={style.nameBlock}>
                    <span className={style.name}>{ name ? name : alternativeName }</span >
                </div>
                <span>Год выхода: { year }</span>
                <span> Рейтинг по КП: { rating.kp }</span>
            </div>
        </div>
    )
})