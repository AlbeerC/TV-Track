import { db } from "./config"
import { doc, collection, getDocs } from "firebase/firestore"

// Get movies and tv series from watchlist of firestore
const getWatchlist = async (userId) => {
    try {
        const userRef = doc(db, 'users', userId)
        const watchlistRef = collection(userRef, 'watchlist')
        const snapshot = await getDocs(watchlistRef)

        const watchlist = []
        snapshot.forEach(doc => {
            watchlist.push(doc.data())
        })

        return watchlist
    } catch (error) {
        return []
    }
}

    // Get movies and tv series from watched list of firestore
const getWatched = async (userId) => {
    try {
        const userRef = doc(db, 'users', userId)
        const watchedRef = collection(userRef, 'watched')
        const snapshot = await getDocs(watchedRef)

        const watched = []
        snapshot.forEach(doc => {
            watched.push(doc.data())
        })

        return watched
    } catch (error) {
        return []
    }
}

const getWatchlistMovies = () => {

}

const getWatchListSeries = () => {

}

export { getWatchlist, getWatched }