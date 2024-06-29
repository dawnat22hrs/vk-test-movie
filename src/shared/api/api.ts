import axios from "axios"

export const api = axios.create({
    baseURL: 'https://api.kinopoisk.dev/',
    headers: {'X-API-KEY': '6ZR74XE-SNZMVAD-GB9MPVT-BHK5KQ1' }
})