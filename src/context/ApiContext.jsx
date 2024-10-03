import { createContext, useContext, useState, useEffect } from "react"

const ApiContext = createContext()

function ApiProvider ( {children} ) {

    const [movies, setMovies] = useState([])
    const [movieDetails, setMovieDetails] = useState([])
    const [searchMovie, setSearchMovie] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchMovies = async (endpoint, page) => {
        setLoading(true)
        setError(null)
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${endpoint}?language=es-MX&api_key=59a8b9ea3a6d0f0d1d790d8bb5f36d94&page=${page}`)
            const result = await response.json()
            setMovies(prevMovies => page === 1 ? result.results : [...prevMovies, ...result.results])
        } catch (error){
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    const fetchMovieDetails = async (id) => {
        setLoading(true)
        setError(null)
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=es-MX&api_key=59a8b9ea3a6d0f0d1d790d8bb5f36d94`)
            const result = await response.json()
            setMovieDetails(result)
        } catch (error){
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    const fetchSearchMovie = async (query) => {
        setLoading(true)
        setError(null)
        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${query}&api_key=59a8b9ea3a6d0f0d1d790d8bb5f36d94&language=es-MX`)
            const result = await response.json()
            setSearchMovie(result.results.filter(movie => movie.media_type === "movie" && movie.poster_path))
        } catch (error){
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    const getImageUrl = (url) => {
        return `https://image.tmdb.org/t/p/w342${url}`
    }

    const getBackdropUrl = (url) => {
        return `https://image.tmdb.org/t/p/original${url}`
    }

    return (
        <ApiContext.Provider value={{movies, movieDetails, searchMovie, loading, error, fetchMovies, fetchMovieDetails, fetchSearchMovie, getImageUrl, getBackdropUrl}}>
            {children}
        </ApiContext.Provider>
    )
}

export const useApi = () => useContext(ApiContext)

export default ApiProvider