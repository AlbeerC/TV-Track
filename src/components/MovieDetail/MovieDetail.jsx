import './MovieDetail.scss'
import { useApi } from '../../context/ApiContext'
import { useAuth } from '../../context/AuthContext'
import { FaEye, FaBookmark, FaStar, FaRegStar, FaStarHalfAlt} from "react-icons/fa"
import { format } from 'date-fns'
import esLocale from 'date-fns/locale/es'
import { Tooltip } from '@chakra-ui/react'

function MovieDetail ( {addToWatchList, addToWatched, movie} ) {
    
    const api = useApi()
    const { getImageUrl, getBackdropUrl, } = api
    const auth = useAuth()
    const isLogged = auth.isLogged

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

    const handleAddToWatchList = () => {
        addToWatchList({ id: movie.id, posterPath: posterPath, title: movie.title  })
    }

    const handleAddToWatched = () => {
        addToWatched({ id: movie.id, posterPath: posterPath, title: movie.title, runtime: movie.runtime })
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
                                <Tooltip hasArrow label='Agregar a películas vistas' fontSize='xl' color='#a40990' bg='#000000' fontWeight='bold'>
                                    <button onClick={handleAddToWatched}><FaEye /></button>
                                </Tooltip>
                                <Tooltip hasArrow label='Agregar a películas por ver' fontSize='xl' color='#a40990' bg='#000000' fontWeight='bold'>
                                    <button onClick={handleAddToWatchList}><FaBookmark /></button>
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