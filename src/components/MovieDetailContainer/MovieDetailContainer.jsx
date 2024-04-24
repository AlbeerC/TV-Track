import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loading from '../Loading/Loading'
import MovieDetail from "../MovieDetail/MovieDetail"
import { collection, doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useAuth } from "../../context/AuthContext"
import { useToast } from '@chakra-ui/react'

function MovieDetailContainer () {

    const API_KEY = "59a8b9ea3a6d0f0d1d790d8bb5f36d94"
    const { id } = useParams()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const auth = useAuth()
    const toast = useToast()    // Library for notifications
    const userId = auth.getUserId() // Get userID for add functions

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=es`)
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false))

    }, [id])

    if (loading) { return <Loading /> }


    const addToWatchList = async (userId, movie) => {
        try {
            const userRef = doc(db, 'users', userId)
            const watchlistRef = collection(userRef, 'watchlist')
            const prefixedId = `movie_${movie.id}`
            const movieRef = doc(watchlistRef, prefixedId)

            const docSnapshot = await getDoc(movieRef)
            if (docSnapshot.exists()) {
                // Show notification if the movie is already on the list
                toast({
                    title: 'Esta película ya está en la lista',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top',
                })
                return
            }

            await setDoc(movieRef, {
                id: movie.id,
                posterPath: movie.posterPath,
                movie: movie.name
            })
            // Show notification if the movie added successfully
            toast({
                title: 'Película agregada correctamente',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top',
            })
        } catch (error) {
            // Show notification if there was an error
            toast({
                title: 'Error al agregar la película',
                description: error,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
            })
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
                // Show notification if the movie is already on the list
                toast({
                    title: 'Esta película ya está en la lista',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top',
                })
                return
            }

            await setDoc(movieRef, {
                id: movie.id,
                posterPath: movie.posterPath,
                name: movie.name
            })
            // Show notification if the movie added successfully
            toast({
                title: 'Película agregada correctamente',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top',
            })
        } catch (error) {
            // Show notification if there was an error
            toast({
                title: 'Error al agregar la película',
                description: error,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
            })
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