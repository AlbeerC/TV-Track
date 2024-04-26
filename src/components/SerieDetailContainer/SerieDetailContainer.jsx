import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loading from '../Loading/Loading'
import SerieDetail from "../SerieDetail/SerieDetail"
import { collection, doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useAuth } from "../../context/AuthContext"
import { useToast } from "@chakra-ui/react"

function SerieDetailContainer () {

    const API_KEY = "59a8b9ea3a6d0f0d1d790d8bb5f36d94"
    const { id } = useParams()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const auth = useAuth()
    const toast = useToast()    // Library for notifications

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=es`)
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false))

    }, [id])

    if (loading) { return <Loading /> }


    const userId = auth.getUserId()

    const addToWatchList = async (userId, serie) => {
        try {
            const userRef = doc(db, 'users', userId)
            const watchlistRef = collection(userRef, 'watchlist')
            const prefixedId = `serie_${serie.id}`
            const serieRef = doc(watchlistRef, prefixedId)

            const docSnapshot = await getDoc(serieRef)
            if (docSnapshot.exists()) {
                // Show notification if the serie is already on the list
                toast({
                    title: 'Esta serie ya está en la lista',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                    position: 'top',
                })
                return
            }

            await setDoc(serieRef, {
                id: serie.id,
                posterPath: serie.posterPath,
                name: serie.name
            })
            // Show notification if the serie added successfully
            toast({
                title: 'Serie agregada correctamente',
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: 'top',
            })
        } catch (error) {
            // Show notification if there was an error
            toast({
                title: 'Error al agregar la serie',
                description: error,
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top',
            })
        }
    }

    const addToWatched = async (userId, serie) => {
        try {
            const userRef = doc(db, 'users', userId)
            const watchedRef = collection(userRef, 'watched')
            const prefixedId = `serie_${serie.id}`
            const serieRef = doc(watchedRef, prefixedId)

            const docSnapshot = await getDoc(serieRef)
            if (docSnapshot.exists()) {
                // Show notification if the serie is already on the list
                toast({
                    title: 'Esta serie ya está en la lista',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                    position: 'top',
                })
                return
            }

            await setDoc(serieRef, {
                id: serie.id,
                posterPath: serie.posterPath,
                name: serie.name
            })
            // Show notification if the serie added successfully
            toast({
                title: 'Serie agregada correctamente',
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: 'top',
            })
        } catch (error) {
            // Show notification if there was an error
            toast({
                title: 'Error al agregar la serie',
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
            <SerieDetail 
                data={data}
                addToWatchList={(serie) => addToWatchList(userId, serie)}
                addToWatched={(serie) => addToWatched(userId, serie)}
            />
        </section>
    )
}

export default SerieDetailContainer