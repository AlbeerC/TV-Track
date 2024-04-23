import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loading from '../Loading/Loading'
import SerieDetail from "../SerieDetail/SerieDetail"
import { collection, doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useAuth } from "../../context/AuthContext"

function SerieDetailContainer () {

    const API_KEY = "59a8b9ea3a6d0f0d1d790d8bb5f36d94"
    const { id } = useParams()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const auth = useAuth()

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
                console.log('The serie is already on the list')
                return
            }

            await setDoc(serieRef, {
                id: serie.id,
                posterPath: serie.posterPath,
                serie: serie.name
            })
            // Mostrar notificacion si se agregó
            console.log("serie added to watchlist")
        } catch (error) {
            console.error("Error adding serie to watchlist", error)
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
                console.log('The serie is already on the list')
                return
            }

            await setDoc(serieRef, {
                id: serie.id,
                posterPath: serie.posterPath,
                name: serie.name
            })
            // Mostrar notificacion si se agregó
            console.log("serie added to watched list")
        } catch (error) {
            console.error("Error adding serie to watched list", error)
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