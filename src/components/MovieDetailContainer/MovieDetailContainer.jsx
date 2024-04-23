import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loading from '../Loading/Loading'
import MovieDetail from "../MovieDetail/MovieDetail"
import { collection, doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useAuth } from "../../context/AuthContext"

function MovieDetailContainer () {

    const API_KEY = "59a8b9ea3a6d0f0d1d790d8bb5f36d94"
    const { id } = useParams()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const auth = useAuth()

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=es`)
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false))

    }, [id])

    if (loading) { return <Loading /> }


    const userId = auth.getUserId()

    const addToWatchList = async (userId, movie) => {
        try {
            const userRef = doc(db, 'users', userId)
            const watchlistRef = collection(userRef, 'watchlist')
            const prefixedId = `movie_${movie.id}`
            const movieRef = doc(watchlistRef, prefixedId)

            const docSnapshot = await getDoc(movieRef)
            if (docSnapshot.exists()) {
                console.log('The movie is already on the list')
                return
            }

            await setDoc(movieRef, {
                id: movie.id,
                posterPath: movie.posterPath,
                movie: movie.name
            })
            // Mostrar notificacion si se agregó
            console.log("Movie added to watchlist")
        } catch (error) {
            console.error("Error adding movie to watchlist", error)
        }
    }

    const addToWatched = async (userId, movie) => {
        try {
            const userRef = doc(db, 'users', userId)
            const watchedRef = collection(userRef, 'watched')
            const prefixedId = `movie_${movie.id}`
            const movieRef = doc(watchedRef, prefixedId)

            const docSnapshot = await getDoc(movieRef)
            if (docSnapshot.exists()) {
                console.log('The movie is already on the list')
                return
            }

            await setDoc(movieRef, {
                id: movie.id,
                posterPath: movie.posterPath,
                name: movie.name
            })
            // Mostrar notificacion si se agregó
            console.log("Movie added to watched list")
        } catch (error) {
            console.error("Error adding movie to watched list", error)
        }
    }

    return (
        <section className="details">
            <MovieDetail
                data={data}
                addToWatchList={(movie) => addToWatchList(userId, movie)}
                addToWatched={(movie) => addToWatched(userId, movie)}
            />
        </section>
    )
}

export default MovieDetailContainer