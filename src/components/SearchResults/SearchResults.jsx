import './SearchResults.scss'
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Loading from "../Loading/Loading"

function SearchResults () {

    const API_KEY = "59a8b9ea3a6d0f0d1d790d8bb5f36d94"
    const { searchTerm } = useParams()
    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/search/multi?query=${searchTerm}&api_key=${API_KEY}&language=es`)
            .then((response) => response.json())
            .then((data) => setSearchResults(data.results))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false))
    }, [searchTerm])

    if (loading) { return <Loading /> }

    return (
        <section className="search-results">
            <h2>Resultados de la búsqueda: "{searchTerm}"</h2>
            <article className="map">
                {searchResults.filter((result) => result.media_type !== "person").map((result) => (
                    <div key={result.id} className="map-result">
                        <Link to={result.release_date || result.title ? `/detail/movie/${result.id}` : `/detail/serie/${result.id}`}>
                            <img
                                src={result.poster_path === null ? 
                                    "https://images.squarespace-cdn.com/content/v1/5a79de08aeb625f12ad4f85a/1527015265032-KYY1AQ4NCW6NB7BK1NDH/placeholder-image-vertical.png" : 
                                    `https://image.tmdb.org/t/p/w200/${result.poster_path}`}
                                alt={result.name || result.title} 
                            />
                        </Link>
                        <h3>{result.name || result.title}</h3>
                        <p>{result.media_type === "tv" ? "Serie de TV" : "Película"}</p>
                    </div>
                ))}
            </article>
            {searchResults.length === 0 ? <h3 className='empty'>No se han encontrado resultados</h3> : null}
        </section>
    )
}

export default SearchResults