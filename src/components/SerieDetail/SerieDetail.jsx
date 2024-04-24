import { useApi } from '../../context/ApiContext'
import { useAuth } from '../../context/AuthContext'
import { FaEye, FaBookmark, FaStar, FaRegStar, FaStarHalfAlt} from "react-icons/fa"
import { format } from 'date-fns'
import esLocale from 'date-fns/locale/es'
import { Tooltip } from '@chakra-ui/react'

function SerieDetail ( {data, addToWatchList, addToWatched} ) {

    const api = useApi()
    const { imageProps } = api
    const auth = useAuth()
    const isLogged = auth.isLogged
    
    const validateData = () => {
        const importantProperties = ['name', 'first_air_date', 'genres', 'vote_average', 'overview', 'production_companies', 'poster_path']
        return importantProperties.some(prop => data && data[prop])
    }

    if (!validateData()) {
        // Mostrar mensaje de error o notificación
        return <p>Error: No se pudieron cargar los datos de la serie.</p>
    }

    const bgStyles = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7)), url(${imageProps.baseURL + 'w780' + data.backdrop_path})`
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
        const halfStar = rating % 1 !== 0
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
    const posterPath = imageProps.baseURL +imageProps.posterSize + data.poster_path

    const handleAddToWatchList = () => {
        addToWatchList({ id: data.id, posterPath: posterPath, name: data.name || data.title })
    }

    const handleAddToWatched = () => {
        addToWatched({ id: data.id, posterPath: posterPath, name: data.name || data.title })
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
                    <h2>{data.name} <span>({data.first_air_date && data.first_air_date.slice(0, 4)})</span></h2>
                    <ul>
                        <li>{formatDate(data.first_air_date)}</li>
                        <li>{data.genres.map((genre, index) => (
                            <span key={genre.id}> {genre.name}
                                {index !== data.genres.length - 1 && ','}
                            </span>))}
                        </li>
                        <li>{data.number_of_seasons} Temporada/s</li>
                    </ul>
                    <h3>{data.tagline}</h3>
                    <div className='icon-stars'>{renderStarIcons(data.vote_average)}
                        <p>Valoración de los usuarios</p>
                    </div>
                    <div className="add-buttons">
                        {
                            isLogged ?
                            <div className="logged-buttons">
                                <Tooltip hasArrow label='Agregar a series vistas' fontSize='xl' color='#7FB335' bg='#000000' fontWeight='bold'>
                                    <button onClick={handleAddToWatched}><FaEye /></button>
                                </Tooltip>
                                <Tooltip hasArrow label='Agregar a series por ver' fontSize='xl' color='#7FB335' bg='#000000' fontWeight='bold'>
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

export default SerieDetail