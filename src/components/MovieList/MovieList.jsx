import { useApi } from "../../context/ApiContext"
import './MovieList.scss'

function MovieList () {

    const api = useApi()
    const { movies, imageProps, loadMore, loading } = api
    const pageSize = 20
    return (
      <section className="movie-list">
        <h2>Películas</h2>
        <article className="map">
          {movies.slice(0, pageSize).map((prod) => (
            <div className="movie" key={prod.id}>
              {prod.poster_path && (
                <img src={`${imageProps.baseURL}${imageProps.posterSize}${prod.poster_path}`} alt={prod.title} />)}
                <h3>{prod.title || prod.name}</h3>
                <div className="bottom">
                  <p>{prod.release_date.slice(0, 4)}</p>
                  <span>-</span>
                  <p>{prod.vote_average.toString().slice(0, 3)}/10</p>
                </div>
            </div>
          ))}
          {loading && <p>Loading...</p>}
          {!loading && movies.length > pageSize && (
            <button onClick={loadMore}>Ver más</button>
          )}
        </article>
      </section>
    )
}

export default MovieList