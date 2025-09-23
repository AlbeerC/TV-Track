import './SearchResults.scss'
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Loading from "../Loading/Loading"
import { useApi } from "../../context/ApiContext"

function SearchResults () {

    const { searchTerm } = useParams()
    const { fetchSearchMovie, loading, searchMovie, getImageUrl } = useApi()

    useEffect(() => {
        fetchSearchMovie(searchTerm)
    }, [searchTerm])

    if (loading) { return <Loading /> }

    return (
        <section className="search-results mt-48">
            <h2>Resultados de la búsqueda: "{searchTerm}"</h2>
            <article className="map">
                {searchMovie.map((result) => (
                    <div key={result.id} className="map-result">
                        <Link to={`/detail/movie/${result.id}`}>
                            <img src={getImageUrl(result.poster_path)} alt={result.title} />
                        </Link>
                        <h3>{result.title}</h3>
                    </div>
                ))}
            </article>
            {searchMovie.length === 0 ? <h3 className='empty'>No se han encontrado resultados</h3> : null}
        </section>
    )
}

export default SearchResults