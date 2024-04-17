import { useApi } from "../../context/ApiContext"
import './SerieList.scss'

function SerieList () {

    const api = useApi()
    const { series, imageProps, loadMore, loading } = api
    const pageSize = 20
  
    return (
      <section className="serie-list">
        <h2>Series</h2>
        <article className="map">
          {series.slice(0, pageSize).map((prod) => (
            <div className="serie" key={prod.id}>
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
          {!loading && series.length > pageSize && (
            <button onClick={loadMore}>Ver más</button>
          )}
        </article>
      </section>
    )
}

export default SerieList