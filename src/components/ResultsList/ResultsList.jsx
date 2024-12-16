import './ResultsList.scss'
import { useApi } from "../../context/ApiContext"
import Loading from '../Loading/Loading'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import FilterButtons from '../FilterButtons/FilterButtons'
import { useEffect, useState } from 'react'

function ResultList () {
    const api = useApi()
    const { fetchMovies, loading, getImageUrl, movies } = api

    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)

    const [page, setPage] = useState(1)
    const initialPage = Number(queryParams.get('page')) || 1
    const initialTab = queryParams.get('tab') || 'popular'
    const [selectedEndpoint, setSelectedEndpoint] = useState(initialTab)

    useEffect(() => {
        setPage(initialPage)
    }, [selectedEndpoint])

    useEffect(() => {
        fetchMovies(selectedEndpoint, page)
    }, [selectedEndpoint, page])

    const loadMore = () => {
        if (!loading) {
            const newPage = page + 1
            setPage(newPage)
            navigate(`?tab=${selectedEndpoint}&page=${newPage}`)
        }
    }

    const handleFilterSelect = (filter) => {
        setSelectedEndpoint(filter)
        setPage(1)
        navigate(`?tab=${filter}&page=1`)
    }

    return (
        <section className="results-list">
            <FilterButtons selectedEndpoint={selectedEndpoint} handleFilterSelect={handleFilterSelect} />
            <article className="map">
                {movies.map((prod) => (
                    <div className="result" key={prod.id}>
                        {prod.poster_path && (
                            <Link to={`/detail/movie/${prod.id}`}>
                            <img 
                                src={getImageUrl(prod.poster_path)} 
                                alt={prod.title} 
                            />
                        </Link>
                        )}
                        <h3>{prod.title}</h3>
                        <div className="bottom">
                            <p>{prod.release_date && prod.release_date.slice(0, 4)}</p>
                            <span>-</span>
                            <p>{prod.vote_average?.toString().slice(0, 3)}/10</p>
                        </div>
                    </div>
                ))}
            </article>
            {loading && <Loading />}
            {!loading && (
                <button className="load-more" onClick={() => loadMore()}>Ver más</button>
            )}
        </section>
    )
}

export default ResultList
