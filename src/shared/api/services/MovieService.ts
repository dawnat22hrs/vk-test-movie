import { IResponse } from "shared/types/interfaces"
import { api } from "../api"

export const MovieService = {
    getMovieList: async (page: number, filters?: string) => await api.get<IResponse>(`/v1.4/movie?limit=50&page=${page}${filters ? filters : ''}`)
}