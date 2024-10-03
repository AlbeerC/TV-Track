import './FilterButtons.scss'
import { Link } from 'react-router-dom'

function FilterButtons ( {selectedEndpoint, handleFilterSelect} ) {
    
    return (
        <article className="filter-buttons">
            <button className={selectedEndpoint === "popular" ? "active" : ""} 
            onClick={() => handleFilterSelect("popular")}>Tendencias</button>
            <button className={selectedEndpoint === "top_rated" ? "active" : ""} 
            onClick={() => handleFilterSelect("top_rated")}>Mejor valoradas</button>
            <button className={selectedEndpoint === "upcoming" ? "active" : ""} 
            onClick={() => handleFilterSelect("upcoming")}>Próximamente</button>
        </article>
    )
}

export default FilterButtons