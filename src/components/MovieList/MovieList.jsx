import { useApi } from "../../context/ApiContext"

function MovieList ( {loadMore, items} ) {

    const api = useApi()
    const { imageProps, loading } = api
    const pageSize = 20

    return (
      <section className="results-list">
        <article className="map">
          {items.slice(0, pageSize).map((prod) => (
            <div className="result" key={prod.id}>
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
        </article>
        {!loading && items.length > pageSize && (
            <button className="load-more" onClick={loadMore}>Ver más</button>
          )}
      </section>
    )
}

export default MovieList