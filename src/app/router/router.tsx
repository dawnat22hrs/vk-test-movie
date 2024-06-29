import { createBrowserRouter } from "react-router-dom"
import { ListPage } from "pages/list-page"
import { FavoritePage } from "pages/favorite-page"
import { MoviePage } from "pages/movie-page"

export const router = createBrowserRouter([
    {
        path: '/',
        element: <ListPage />
    },
    {
        path: '/favorite',
        element: <FavoritePage />
    },
    {
        path: '/movie/:id',
        element: <MoviePage /> 
    },
])