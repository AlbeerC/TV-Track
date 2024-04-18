import { useApi } from "../../context/ApiContext"

function SerieList ( {loadMore, items} ) {

    const api = useApi()
    const { imageProps, loading } = api
    const pageSize = 20

    const handleLoadMore = (e) => {
      console.log("Cargar más")
      loadMore(e)
    }
  
    return (
      <section className="results-list">
        <article className="map">
          {items.slice(0, pageSize).map((prod) => (
            <div className="result" key={prod.id}>
              {prod.poster_path && (
                <img src={`${imageProps.baseURL}${imageProps.posterSize}${prod.poster_path}`}alt={prod.title} />)}
                <h3>{prod.title || prod.name}</h3>
                <div className="bottom">
                  <p>{prod.first_air_date.slice(0, 4)}</p>
                  <span>-</span>
                  <p>{prod.vote_average.toString().slice(0, 3)}/10</p>
                </div>
            </div> 
          ))}
          {loading && <p>Loading...</p>}
        </article>
        {!loading && items.length > pageSize && (
            <button className="load-more" onClick={handleLoadMore}>Ver más</button>
          )}
      </section>
    )
}

export default SerieList