import { observer } from "mobx-react-lite"
import { genres, rating, years } from "../model/model"
import movieStore from "store/movie-store"
import style from './filters.module.scss'

export const Filters = observer(() => {
    const { getFilterAction, filters, deleteFilterAction } = movieStore

    const isCheckedFilters = filters.map((filter: string) => filter.split('=')[1])

    const getControllCheckbox = (data: string, type: string) => {
        if (isCheckedFilters.includes(data)) {
            deleteFilterAction(data, type)
        } else getFilterAction(data, type)
    }

    return (
        <div className={style.filters}>
            <span className={style.title}>фильтры</span>
            <div className={style.wrapperItem}>
                <span className={style.mark}>По жанрам</span>
                <div className={style.filtersItem}>
                    {
                        genres.map(genre => 
                            <div className={style.value} key={genre.id}>
                                <input
                                    onChange={() => getControllCheckbox(genre.name, 'genres.name')}
                                    checked={isCheckedFilters.includes(genre.name)}
                                    id={genre.name}
                                    type="checkbox"
                                />
                                <label htmlFor={genre.name}>{genre.name}</label>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className={style.wrapperItem}>
                <span className={style.mark}>По рейтингу</span>
                <div className={style.filtersItem}>
                {
                    rating.map(r => 
                        <div className={style.value}  key={r}>
                            <input
                            onChange={() => getControllCheckbox(String(r), 'rating.kp')}
                            id={String(r)}
                            checked={isCheckedFilters.includes(String(r))}
                            type="checkbox"
                            />
                            <label htmlFor={String(r)}>{r}</label>
                        </div>
                    )
                }
                </div>
            </div>
            <div className={style.wrapperItem}>
                <span className={style.mark}>По годам</span>
                <div className={style.filtersItem}>
                    {
                        years.map(year => 
                            <div className={style.value} key={year}>
                                <input
                                    onChange={() => getControllCheckbox(String(year), 'year')}
                                    id={String(year)}
                                    checked={isCheckedFilters.includes(String(year))}
                                    type="checkbox"
                                />
                                <label htmlFor={String(year)}>{year}</label>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
})