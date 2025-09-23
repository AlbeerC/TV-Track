import './MovieDetail.scss'
import { useApi } from '../../context/ApiContext'
import { useAuth } from '../../context/AuthContext'
import { FaEye, FaBookmark, FaStar, FaRegStar, FaStarHalfAlt, FaCheck} from "react-icons/fa"
import { format } from 'date-fns'
import esLocale from 'date-fns/locale/es'
import { Tooltip } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { doc, getDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase/config'

function MovieDetail ( {addToWatchList, addToWatched, movie} ) {
    
    const api = useApi()
    const { getImageUrl, getBackdropUrl, } = api
    const auth = useAuth()
    const isLogged = auth.isLogged
    const userId = auth.getUserId()

    // State to track if movie is in user's lists
    const [isInWatchlist, setIsInWatchlist] = useState(false)
    const [isInWatched, setIsInWatched] = useState(false)
    const [isChecking, setIsChecking] = useState(true)

    // Function to check if movie exists in user's lists
    const checkMovieInLists = async () => {
        if (!userId || !movie.id) return
        
        try {
            setIsChecking(true)
            
            // Check watchlist
            const userRef = doc(db, 'users', userId)
            const watchlistRef = collection(userRef, 'watchlist')
            const watchlistMovieRef = doc(watchlistRef, movie.id.toString())
            const watchlistSnapshot = await getDoc(watchlistMovieRef)
            setIsInWatchlist(watchlistSnapshot.exists())

            // Check watched list
            const watchedRef = collection(userRef, 'watched')
            const watchedMovieRef = doc(watchedRef, movie.id.toString())
            const watchedSnapshot = await getDoc(watchedMovieRef)
            setIsInWatched(watchedSnapshot.exists())
            
        } catch (error) {
            console.error('Error checking movie in lists:', error)
        } finally {
            setIsChecking(false)
        }
    }

    // Check movie status when component mounts or movie changes
    useEffect(() => {
        if (isLogged && movie.id) {
            checkMovieInLists()
        } else {
            setIsChecking(false)
        }
    }, [isLogged, movie.id])

    const bgStyles = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), 
        url(${getBackdropUrl(movie.backdrop_path)})`,
    }

    const formatDuration = (runtime) => {
        const hours = Math.floor(runtime / 60)
        const remainingMinutes = runtime % 60
      
        if (hours === 0) {
          return `${remainingMinutes} min`
        } else if (remainingMinutes === 0) {
          return `${hours}hr`
        } else {
          return `${hours}hr ${remainingMinutes}min`
        }
    }

    const formatDate = (date) => {
        if (!date) {
            return ''
        }
        try {
            const parsedDate = new Date(date)
            return parsedDate.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            })
        } catch (error) {
            console.error('Error formatting date', error)
            return ''
        }
    }

    // Stars in rating
    const renderStarIcons = (rating) => {
        const filledStars = Math.floor(rating / 2)
        const halfStar = rating % 2 !== 0
        const emptyStars = 5 - filledStars - (halfStar ? 1 : 0)
    
        const starIcons = []
    
        for (let i = 0; i < filledStars; i++) {
            starIcons.push(<FaStar key={i} />)
        }
    
        if (halfStar) {
            starIcons.push(<FaStarHalfAlt key="half" />)
        }
    
        for (let i = 0; i < emptyStars; i++) {
            starIcons.push(<FaRegStar key={i + filledStars} />)
        }
    
        return starIcons
    }

    // Add to list
    const posterPath = getImageUrl(movie.poster_path)

    const handleAddToWatchList = async () => {
        if (!isInWatchlist) {
            await addToWatchList({ id: movie.id, posterPath: posterPath, title: movie.title })
            // Refresh the status after adding
            setTimeout(() => {
                checkMovieInLists()
            }, 500)
        }
    }

    const handleAddToWatched = async () => {
        if (!isInWatched) {
            await addToWatched({ id: movie.id, posterPath: posterPath, title: movie.title, runtime: movie.runtime })
            // Refresh the status after adding
            setTimeout(() => {
                checkMovieInLists()
            }, 500)
        }
    }

    return (
        <section className="movie-detail">
            <article className="poster" style={bgStyles}>
                <div className="image">
                    <img 
                        src={getImageUrl(movie.poster_path)} 
                        alt={movie.title} 
                    />
                </div>
                <div className="texts">
                    <h2>{movie.title} <span>({movie.release_date && movie.release_date.slice(0, 4)})</span></h2>
                    <ul>
                        <li>{formatDate(movie.release_date)}</li>
                        <li>{movie.genres?.map(genre => genre.name).join(', ')}</li>
                        <li>{formatDuration(movie.runtime)}</li>
                    </ul>
                    <h3>{movie.tagline}</h3>
                    <div className='icon-stars'>{renderStarIcons(movie.vote_average)}
                        <p>Valoración de los usuarios</p>
                    </div>
                    <div className="add-buttons">
                        {
                            isLogged ?
                            <div className="logged-buttons">
                                <Tooltip 
                                    hasArrow 
                                    label={isInWatched ? 'Ya está en películas vistas' : 'Agregar a películas vistas'} 
                                    fontSize='xl' 
                                    color='#a40990' 
                                    bg='#000000' 
                                    fontWeight='bold'
                                >
                                    <button 
                                        onClick={handleAddToWatched}
                                        disabled={isInWatched || isChecking}
                                        className={isInWatched ? 'disabled' : ''}
                                    >
                                        {isInWatched ? <FaCheck /> : <FaEye />}
                                    </button>
                                </Tooltip>
                                <Tooltip 
                                    hasArrow 
                                    label={isInWatchlist ? 'Ya está en películas por ver' : 'Agregar a películas por ver'} 
                                    fontSize='xl' 
                                    color='#a40990' 
                                    bg='#000000' 
                                    fontWeight='bold'
                                >
                                    <button 
                                        onClick={handleAddToWatchList}
                                        disabled={isInWatchlist || isChecking}
                                        className={isInWatchlist ? 'disabled' : ''}
                                    >
                                        {isInWatchlist ? <FaCheck /> : <FaBookmark />}
                                    </button>
                                </Tooltip>
                            </div> 
                            :
                            <p>Inicia sesión para guardar</p>
                        }
                    </div>
                    <p>{movie.overview}</p>
                    <p className='companies'>{movie.production_companies?.map(comp => comp.name).join(', ')}</p>
                </div>
            </article>
        </section>
    )
}

export default MovieDetail