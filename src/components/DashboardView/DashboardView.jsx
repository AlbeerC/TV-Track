import './DashboardView.scss'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading'
import { useEffect } from 'react'

function DashboardView ( {isLogged, watchList, watched, deleteFromWatchlist, deleteFromWatched, loading } ) {
    
    const getTimeWatching = () => {
        let minutes = 0
        watched.forEach((movie) => {
            minutes += movie.runtime
        })

        const hours = Math.floor(minutes / 60)
        const remainingMinutes = minutes % 60

        if (hours === 0) {
            return `${remainingMinutes} min`
        } else if (remainingMinutes === 0) {
            return `${hours}hr`
        } else {
            return `${hours}hr ${remainingMinutes}min`
        }
    }

    console.log(watched)
    console.log(watchList)

    return (
        <section className="dashboard">
            {
                isLogged ? 
                    <article className='dashboard-logged'>
                        <div className="length">
                            <p>Películas vistas: 
                                <span>
                                    {loading ? "..." : watched.length}
                                </span>
                            </p>
                            <p>Tiempo visto: 
                                <span>
                                    {loading ? "..." : getTimeWatching()}
                                </span>
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
                                <div className="mapped">
                                    {watchList.map((item) => (
                                        <div className="item" key={item.id}>
                                            <Link to={`/detail/movie/${item.id}`}>
                                                <img src={item.posterPath} alt={item.title} />
                                            </Link>
                                            <button onClick={() => deleteFromWatchlist(item.id)}>X
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
                                <div className="mapped">
                                    {watched.map((item) => (
                                        <div className="item" key={item.id}>
                                            <Link to={`/detail/movie/${item.id}`}>
                                                <img src={item.posterPath} alt={item.title} />
                                            </Link>
                                            <button onClick={() => deleteFromWatched(item.id)}>X
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