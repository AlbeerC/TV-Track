import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loading from '../Loading/Loading'
import MovieDetail from "../MovieDetail/MovieDetail"
import { collection, doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useAuth } from "../../context/AuthContext"
import { useToast } from '@chakra-ui/react'
import { useApi } from "../../context/ApiContext"

function MovieDetailContainer () {

    const { id } = useParams()
    const auth = useAuth()
    const toast = useToast()    // Library for notifications
    const userId = auth.getUserId() // Get userID for add functions
    const { loading, fetchMovieDetails, movieDetails } = useApi()

    useEffect(() => {
        fetchMovieDetails(id)
    }, [id])

    if (loading) { return <Loading /> }


    // Add movie to watchlist
    const addToWatchList = async (userId, movie) => {
        try {
            const userRef = doc(db, 'users', userId)
            const watchlistRef = collection(userRef, 'watchlist')
            const prefixedId = `${movie.id}`
            const movieRef = doc(watchlistRef, prefixedId)

            const docSnapshot = await getDoc(movieRef)
            if (docSnapshot.exists()) {
                // Show notification if the movie is already on the list
                toast({
                    title: 'Esta película ya está en la lista',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                    position: 'top',
                })
                return
            }

            await setDoc(movieRef, {
                id: movie.id,
                posterPath: movie.posterPath,
                title: movie.title,
            })
            // Show notification if the movie added successfully
            toast({
                title: 'Película agregada correctamente',
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: 'top',
            })
        } catch (error) {
            // Show notification if there was an error
            toast({
                title: 'Error al agregar la película',
                description: error,
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top',
            })
        }
    }

    // Add movie to watched
    const addToWatched = async (userId, movie) => {
        try {
            const userRef = doc(db, 'users', userId)
            const watchedRef = collection(userRef, 'watched')
            const prefixedId = `${movie.id}`
            const movieRef = doc(watchedRef, prefixedId)

            const docSnapshot = await getDoc(movieRef)
            if (docSnapshot.exists()) {
                // Show notification if the movie is already on the list
                toast({
                    title: 'Esta película ya está en la lista',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                    position: 'top',
                })
                return
            }

            await setDoc(movieRef, {
                id: movie.id,
                posterPath: movie.posterPath,
                title: movie.title,
                runtime: movie.runtime
            })
            // Show notification if the movie added successfully
            toast({
                title: 'Película agregada correctamente',
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: 'top',
            })
        } catch (error) {
            // Show notification if there was an error
            toast({
                title: 'Error al agregar la película',
                description: error,
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top',
            })
        }
    }

    return (
        <section className="details">
            <MovieDetail
                movie={movieDetails}
                addToWatchList={(movie) => addToWatchList(userId, movie)}
                addToWatched={(movie) => addToWatched(userId, movie)}
            />
        </section>
    )
}

export default MovieDetailContainer