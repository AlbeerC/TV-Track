import './DashboardView.scss'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading'

function DashboardView ( {isLogged, watchList, watched, deleteFromWatchlist, deleteFromWatched, loading } ) {

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
                        <div className="length">
                            <p>Películas vistas: 
                                <span>{watched.filter((item) => item.title).length}</span>
                            </p>
                            <p>Series vistas: 
                                <span>{watched.filter((item) => item.name).length}</span>
                            </p>
                        </div>
                        <div className="watch-list">
                            <h2>Ver próximamente:</h2>
                            <div className="map">
                                {loading && <Loading />}
                                {watchList.length === 0  && !loading ? 
                                    <p className='empty-list'>La lista está vacía. <Link to='/'>Descrubrir</Link></p> 
                                : null}
                                {/* Watchlist Movies */}
                                <h3>Películas</h3>
                                <div className="mapped">
                                    {watchList.filter((item) => item.title).map((item) => (
                                        <div className="item" key={item.id}>
                                            <Link to={`/detail/movie/${item.id}`}>
                                                <img src={item.posterPath} alt={item.title} />
                                            </Link>
                                            <button onClick={() => {
                                                const docNamePrefix = item.title ? 'movie' : 'serie'
                                                handleDeleteFromWatchlist(`${docNamePrefix}_${item.id}`)}}>X
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                {/* Watchlist series */}
                                <h3>Series</h3>
                                <div className="mapped">
                                    {watchList.filter((item) => item.name).map((item) => (
                                        <div className="item" key={item.id}>
                                            <Link to={`/detail/serie/${item.id}`}>
                                                <img src={item.posterPath} alt={item.name} />
                                            </Link>
                                            <button onClick={() => {
                                                const docNamePrefix = item.title ? 'movie' : 'serie'
                                                handleDeleteFromWatchlist(`${docNamePrefix}_${item.id}`)}}>X
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="watched">
                            <h2>Visto:</h2>
                            <div className="map">
                                {loading && <Loading />}
                                {watched.length === 0  && !loading ? 
                                    <p className='empty-list'>La lista está vacía. <Link to='/'>Descrubrir</Link></p> 
                                : null}
                                {/* Watched movies */}
                                <h3>Películas</h3>
                                <div className="mapped">
                                    {watched.filter((item) => item.title).map((item) => (
                                        <div className="item" key={item.id}>
                                            <Link to={`/detail/movie/${item.id}`}>
                                                <img src={item.posterPath} alt={item.title} />
                                            </Link>
                                            <button onClick={() => {
                                                const docNamePrefix = item.title ? 'movie' : 'serie'
                                                handleDeleteFromWatched(`${docNamePrefix}_${item.id}`)}}>X
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                {/* Watched series */}
                                <h3>Series</h3>
                                <div className="mapped">
                                    {watched.filter((item) => item.name).map((item) => (
                                        <div className="item" key={item.id}>
                                            <Link to={`/detail/serie/${item.id}`}>
                                                <img src={item.posterPath} alt={item.name} />
                                            </Link>
                                            <button onClick={() => {
                                                const docNamePrefix = item.title ? 'movie' : 'serie'
                                                handleDeleteFromWatched(`${docNamePrefix}_${item.id}`)}}>X
                                            </button>
                                        </div>
                                    ))}
                                </div>
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