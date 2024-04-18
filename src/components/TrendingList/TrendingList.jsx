import './TrendingList.scss'
import { useApi } from "../../context/ApiContext";

function TrendingList( {items, loadMore} ) {

    const api = useApi()
    const { imageProps, loading } = api
    const pageSize = 20
    
    return (
      <section className="results-list">
        <article className="map">
          {items.slice(0, pageSize).map((prod) => (
            <div className='result' key={prod.id}>
              {prod.poster_path && (
              <img src={`${imageProps.baseURL}${imageProps.posterSize}${prod.poster_path}`} alt={prod.title} /> )}
              <h3>{prod.title || prod.name}</h3>
              <p>{prod.release_date || prod.first_air_date}</p>
            </div>
          ))}
          {loading && <p>Loading...</p>}
        </article>
        {!loading && items.length > pageSize && (
          <button className='load-more' onClick={loadMore}>Ver más</button>
        )}
      </section>
    )
}

export default TrendingList
