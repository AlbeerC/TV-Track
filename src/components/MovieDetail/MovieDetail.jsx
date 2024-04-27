import './MovieDetail.scss'
import { useApi } from '../../context/ApiContext'
import { useAuth } from '../../context/AuthContext'
import { FaEye, FaBookmark, FaStar, FaRegStar, FaStarHalfAlt} from "react-icons/fa"
import { format } from 'date-fns'
import esLocale from 'date-fns/locale/es'
import { Tooltip } from '@chakra-ui/react'

function MovieDetail ( {data, addToWatchList, addToWatched} ) {
    
    const api = useApi()
    const { imageProps } = api
    const auth = useAuth()
    const isLogged = auth.isLogged

    const bgStyles = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(${imageProps.baseURL + 'original' + data.backdrop_path})`
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
        if (date === "") {
            return
        } else {
            const parsedDate = new Date(date)
            const formattedDate = format(parsedDate, 'dd/MM/yyyy', { locale: esLocale })
            return formattedDate
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
    const posterPath = imageProps.baseURL + imageProps.posterSize + data.poster_path

    const handleAddToWatchList = () => {
        addToWatchList({ id: data.id, posterPath: posterPath, title: data.title })
    }

    const handleAddToWatched = () => {
        addToWatched({ id: data.id, posterPath: posterPath, title: data.title })
    }

    return (
        <section className="movie-detail">
            <article className="poster" style={bgStyles}>
                <div className="image">
                    <img 
                        src={`${imageProps.baseURL}${imageProps.posterSize}${data.poster_path}`} 
                        alt={data.title || data.name} 
                    />
                </div>
                <div className="texts">
                    <h2>{data.title} <span>({data.release_date && data.release_date.slice(0, 4)})</span></h2>
                    <ul>
                        <li>{formatDate(data.release_date)}</li>
                        <li>{data.genres.map((genre, index) => (
                            <span key={genre.id}> {genre.name}
                                {index !== data.genres.length - 1 && ','}
                            </span>))}
                        </li>
                        <li>{formatDuration(data.runtime)}</li>
                    </ul>
                    <h3>{data.tagline}</h3>
                    <div className='icon-stars'>{renderStarIcons(data.vote_average)}
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
                    <p>{data.overview}</p>
                    <p className='companies'>{data.production_companies.map((companie, index) => (
                        <span key={companie.id}>{companie.name}
                            {index !== data.production_companies.length - 1 && ','}
                        </span>
                    ))}</p>
                </div>
            </article>
        </section>
    )
}

export default MovieDetail