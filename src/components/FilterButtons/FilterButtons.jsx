import './FilterButtons.scss'

function FilterButtons ( {selectedTab, handleTabChange} ) {
    
    return (
        <article className="filter-buttons">
            <button className={selectedTab === "trendings" ? "active" : ""} 
            onClick={() => handleTabChange("trendings")}>Tendencias</button>
            <button className={selectedTab === "movies" ? "active" : ""} 
            onClick={() => handleTabChange("movies")}>Películas</button>
            <button className={selectedTab === "series" ? "active" : ""} 
            onClick={() => handleTabChange("series")}>Series</button>
        </article>
    )
}

export default FilterButtons