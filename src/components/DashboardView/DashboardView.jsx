import './DashboardView.scss'
import { Link } from 'react-router-dom'

function DashboardView ( {isLogged, watchList, watched, deleteFromWatchlist, deleteFromWatched } ) {

    const handleDeleteFromWatchlist = async (movieDocName) => {
        try {
            await deleteFromWatchlist(movieDocName)
        } catch (error) {
            console.error('Error al eliminar la película:', error)
        }
    }

    const handleDeleteFromWatched = async (movieDocName) => {
        try {
            await deleteFromWatched(movieDocName)
        } catch (error) {
            console.error('Error al eliminar la película:', error)
        }
    }
    
    return (
        <section className="dashboard">
            {
                isLogged ? 
                    <article className='dashboard-logged'>

                        <div className="watch-list">
                            <h2>Ver próximamente:</h2>
                            <div className="map">
                                {watchList.map((item) => (
                                    <div className="item" key={item.id}>
                                        <Link to={item.title ? `/detail/movie/${item.id}` : `/detail/serie/${item.id}`}>
                                            <img src={item.posterPath} alt={item.name || item.title} />
                                        </Link>
                                        <button onClick={() => {
                                            const docNamePrefix = item.title ? 'movie' : 'serie'
                                            handleDeleteFromWatchlist(`${docNamePrefix}_${item.id}`)}}>X
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="watched">
                            <h2>Visto:</h2>
                            <div className="map">
                                {watched.map((item) => (
                                    <div className="item" key={item.id}>
                                        <Link to={item.title ? `/detail/movie/${item.id}` : `/detail/serie/${item.id}`}>
                                            <img src={item.posterPath} alt={item.name || item.title} />
                                        </Link>
                                        <button onClick={() => {
                                            const docNamePrefix = item.title ? 'movie' : 'serie'
                                            handleDeleteFromWatched(`${docNamePrefix}_${item.id}`)}}>X
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                    </article>
                    :
                    <article className='dashboard-not-logged'>
                        <p>Tienes que iniciar sesión o registrarte para ver tu perfil</p>
                    </article>
            }
        </section>
    )
}

export default DashboardView