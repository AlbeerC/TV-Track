import './MovieDetail.scss'
import { useApi } from '../../context/ApiContext'
import { FaEye, FaBookmark, FaStar, FaRegStar, FaStarHalfAlt} from "react-icons/fa"
import { format } from 'date-fns'
import esLocale from 'date-fns/locale/es'

function MovieDetail ( {data} ) {

    const api = useApi()
    const { imageProps } = api

    const bgStyles = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7)), url(${imageProps.baseURL + 'w780' + data.backdrop_path})`
    }

    const formatDuration = (runtime) => {
        const hours = Math.floor(runtime / 60)
        const remainingMinutes = runtime % 60
      
        if (hours === 0) {
          return `${remainingMinutes} min`;
        } else if (remainingMinutes === 0) {
          return `${hours}hr`;
        } else {
          return `${hours}hr ${remainingMinutes}min`
        }
    }

    const formatDate = (date) => {
        const parsedDate = new Date(date)
        const formattedDate = format(parsedDate, 'dd/MM/yyyy', { locale: esLocale })
        return formattedDate
    }

    // Stars in rating
    const renderStarIcons = (rating) => {
        const filledStars = Math.floor(rating)
        const halfStar = rating % 1 !== 0
        const emptyStars = 10 - filledStars - (halfStar ? 1 : 0);
    
        const starIcons = [];
    
        for (let i = 0; i < filledStars; i++) {
            starIcons.push(<FaStar key={i} />)
        }
    
        if (halfStar) {
            starIcons.push(<FaStarHalfAlt key="half" />)
        }
    
        for (let i = 0; i < emptyStars; i++) {
            starIcons.push(<FaRegStar key={i + filledStars} />)
        }
    
        return starIcons;
    };
    
    
    

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
                        <button><FaEye /></button>
                        <button><FaBookmark /></button>
                    </div>
                    <p>{data.overview}</p>
                    <p className='companies'>{data.production_companies.map((companie) => (
                        <span key={companie.id}>{companie.name}</span>
                    ))}</p>
                </div>
            </article>
        </section>
    )
}

export default MovieDetail