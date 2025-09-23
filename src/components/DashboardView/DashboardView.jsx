import './DashboardView.scss'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading'
import { useEffect, useState } from 'react'
import AlertLogout from '../AlertLogout/AlertLogout'
import { 
    Film, 
    Clock, 
    Eye, 
    Bookmark, 
    Trash2, 
    Star, 
    TrendingUp,
    Calendar,
    Award,
    Heart
} from "lucide-react"

function DashboardView ( {isLogged, watchList, watched, deleteFromWatchlist, deleteFromWatched, loading } ) {
    
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

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

    return (
        <section className="dashboard mt-48">
            {
                isLogged ? 
                    <article className='dashboard-logged'>
                        {/* Hero Section */}
                        <div className={`hero-section ${isVisible ? 'visible' : ''}`}>
                            <div className="hero-background">
                                <div className="floating-icons">
                                    <Film className="icon-1" />
                                    <Star className="icon-2" />
                                    <Heart className="icon-3" />
                                    <Award className="icon-4" />
                                </div>
                            </div>
                            
                            <div className="hero-content">
                                <h1 className="welcome-title">
                                    ¡Bienvenido a tu 
                                    <span className="highlight"> universo cinematográfico</span>!
                                </h1>
                                
                                <div className="stats-grid">
                                    <div className="stat-card">
                                        <div className="stat-icon">
                                            <Eye className="icon" />
                                        </div>
                                        <div className="stat-info">
                                            <h3>{loading ? "..." : watched.length}</h3>
                                            <p>Películas vistas</p>
                                        </div>
                                    </div>
                                    
                                    <div className="stat-card">
                                        <div className="stat-icon">
                                            <Clock className="icon" />
                                        </div>
                                        <div className="stat-info">
                                            <h3>{loading ? "..." : getTimeWatching()}</h3>
                                            <p>Tiempo disfrutado</p>
                                        </div>
                                    </div>
                                    
                                    <div className="stat-card">
                                        <div className="stat-icon">
                                            <Bookmark className="icon" />
                                        </div>
                                        <div className="stat-info">
                                            <h3>{loading ? "..." : watchList.length}</h3>
                                            <p>Por ver</p>
                                        </div>
                                    </div>
                                    
                                    <div className="stat-card">
                                        <div className="stat-icon">
                                            <TrendingUp className="icon" />
                                        </div>
                                        <div className="stat-info">
                                            <h3>{loading ? "..." : (watched.length + watchList.length)}</h3>
                                            <p>Total en colección</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Watchlist Section */}
                        <div className={`movie-section watchlist-section ${isVisible ? 'visible' : ''}`}>
                            <div className="section-header">
                                <div className="header-icon">
                                    <Bookmark className="icon" />
                                </div>
                                <h2>Ver próximamente</h2>
                                <div className="section-count">{watchList.length}</div>
                            </div>
                            
                            <div className="movies-grid">
                                {loading && <Loading />}
                                {watchList.length === 0 && !loading ? 
                                    <div className="empty-state">
                                        <Film className="empty-icon" />
                                        <h3>Tu lista está vacía</h3>
                                        <p>¡Descubre películas increíbles para agregar a tu lista!</p>
                                        <Link to="/" className="discover-btn">
                                            <TrendingUp className="btn-icon" />
                                            Explorar películas
                                        </Link>
                                    </div>
                                : null}
                                
                                {watchList.map((item, index) => (
                                    <div 
                                        key={item.id} 
                                        className={`movie-card watchlist-card ${isVisible ? 'visible' : ''}`}
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <Link to={`/detail/movie/${item.id}`} className="movie-link">
                                            <div className="card-overlay">
                                                <div className="play-overlay">
                                                    <Eye className="play-icon" />
                                                </div>
                                            </div>
                                            <img src={item.posterPath} alt={item.title} />
                                        </Link>
                                        <button 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                deleteFromWatchlist(item.id);
                                            }}
                                            className="delete-btn"
                                            title="Eliminar de la lista"
                                        >
                                            <Trash2 className="delete-icon" />
                                        </button>
                                        <div className="card-info">
                                            <h4>{item.title}</h4>
                                            <div className="card-badge watchlist-badge">
                                                <Bookmark className="badge-icon" />
                                                Por ver
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Watched Section */}
                        <div className={`movie-section watched-section ${isVisible ? 'visible' : ''}`}>
                            <div className="section-header">
                                <div className="header-icon">
                                    <Eye className="icon" />
                                </div>
                                <h2>Películas vistas</h2>
                                <div className="section-count">{watched.length}</div>
                            </div>
                            
                            <div className="movies-grid">
                                {loading && <Loading />}
                                {watched.length === 0 && !loading ? 
                                    <div className="empty-state">
                                        <Eye className="empty-icon" />
                                        <h3>No has visto películas aún</h3>
                                        <p>¡Comienza tu maratón cinematográfico!</p>
                                        <Link to="/" className="discover-btn">
                                            <TrendingUp className="btn-icon" />
                                            Descubrir películas
                                        </Link>
                                    </div>
                                : null}
                                
                                {watched.map((item, index) => (
                                    <div 
                                        key={item.id} 
                                        className={`movie-card watched-card ${isVisible ? 'visible' : ''}`}
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <Link to={`/detail/movie/${item.id}`} className="movie-link">
                                            <div className="card-overlay">
                                                <div className="play-overlay">
                                                    <Eye className="play-icon" />
                                                </div>
                                            </div>
                                            <img src={item.posterPath} alt={item.title} />
                                        </Link>
                                        <button 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                deleteFromWatched(item.id);
                                            }}
                                            className="delete-btn"
                                            title="Eliminar de la lista"
                                        >
                                            <Trash2 className="delete-icon" />
                                        </button>
                                        <div className="card-info">
                                            <h4>{item.title}</h4>
                                            <div className="card-badge watched-badge">
                                                <Eye className="badge-icon" />
                                                Visto
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="logout">
                            <AlertLogout />
                        </div>
                    </article>
                    :
                    <article className='dashboard-not-logged'>
                        <div className="not-logged-content">
                            <Film className="not-logged-icon" />
                            <h2>Accede a tu perfil</h2>
                            <p>Inicia sesión o regístrate para gestionar tu colección cinematográfica</p>
                            <div className="auth-buttons">
                                <Link to="/login" className="auth-btn primary">Iniciar sesión</Link>
                                <Link to="/register" className="auth-btn secondary">Registrarse</Link>
                            </div>
                        </div>
                    </article>
            }
        </section>
    )
}

export default DashboardView