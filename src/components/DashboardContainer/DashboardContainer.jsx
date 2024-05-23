import { useAuth } from '../../context/AuthContext'
import { deleteDoc, collection, doc } from 'firebase/firestore'
import { getWatchlist, getWatched } from '../../firebase/firestore'
import { db } from '../../firebase/config'
import DashboardView from '../DashboardView/DashboardView'
import { useEffect, useState } from 'react'
import { useToast } from '@chakra-ui/react'

function DashboardContainer () {

    const [watchList, setWatchList] = useState([])
    const [watched, setWatched] = useState([])
    
    const toast = useToast()
    const auth = useAuth()

    const getUser = auth.getUserFromLocalStorage()
    const user = getUser ? getUser.displayName || auth.cutDomainFromEmail(getUser?.email) : null
    const isLogged = auth.isLogged
    const userId = auth.getUserId()

    const [updateFlag, setUpdateFlag] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const watchListData = await getWatchlist(userId)
                const watchedData = await getWatched(userId)

                setWatchList(watchListData)
                setWatched(watchedData)
            } catch (error) {
                console.error('Error', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [userId, updateFlag])


    const deleteFromWatchlist = async (movieDocName) => {
        try {
            const userRef = doc(db, 'users', userId)
            const watchlistRef = collection(userRef, 'watchlist')
            const movieRef = doc(watchlistRef, movieDocName)
    
            await deleteDoc(movieRef)
            setUpdateFlag(prevFlag => !prevFlag)
    
            // Show notification if movie deleted successfully
            toast({
                title: 'Eliminada correctamente',
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: 'top',
            })
        } catch (error) {
            // Show notification if there was an error
            toast({
                title: 'Error al eliminar',
                description: error,
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top',
            })
        }
    }

    const deleteFromWatched = async (movieDocName) => {
        try {
            const userRef = doc(db, 'users', userId)
            const watchedRef = collection(userRef, 'watched')
            const movieRef = doc(watchedRef, movieDocName)
    
            await deleteDoc(movieRef)
            setUpdateFlag(prevFlag => !prevFlag)
    
            // Show notification if movie deleted successfully
            toast({
                title: 'Eliminada correctamente',
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: 'top',
            })
        } catch (error) {
            // Show notification if there was an error
            toast({
                title: 'Error al eliminar',
                description: error,
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top',
            })
        }
    }

    
    return (
        <DashboardView 
            isLogged={isLogged}
            watchList={watchList}
            watched={watched}
            deleteFromWatchlist={deleteFromWatchlist}
            deleteFromWatched={deleteFromWatched}
            loading={loading}
        />
    )
}

export default DashboardContainer