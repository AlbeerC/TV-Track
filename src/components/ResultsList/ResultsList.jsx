import './ResultsList.scss'
import { useApi } from "../../context/ApiContext"
import Loading from '../Loading/Loading'
import { Link } from 'react-router-dom'
import FilterButtons from '../FilterButtons/FilterButtons'
import { useEffect, useState } from 'react'

function ResultList () {
    const api = useApi()
    const { fetchMovies, loading, getImageUrl, movies } = api
    const pageSize = 20
    const [page, setPage] = useState(1)
    const [selectedEndpoint, setSelectedEndpoint] = useState('popular')

    useEffect(() => {
        setPage(1)
    }, [selectedEndpoint])

    useEffect(() => {
        fetchMovies(selectedEndpoint, page)
    }, [selectedEndpoint, page])

    const loadMore = () => {
        if (!loading) {
            setPage(prevPage => prevPage + 1)
        }
    }

    const handleFilterSelect = (filter) => {
        setSelectedEndpoint(filter)
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
