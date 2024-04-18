import './MainLayout.scss'
import Hero from '../Hero/Hero'
import { Link } from 'react-router-dom'
import TrendingList from '../TrendingList/TrendingList'
import MovieList from "../MovieList/MovieList"
import SerieList from "../SerieList/SerieList"
import { useApi } from "../../context/ApiContext"
import { useState } from 'react'

function MainLayout () {
    const { data, loadMore } = useApi();
    const [selectedTab, setSelectedTab] = useState("trendings")

    const handleTabChange = (tab) => {
        setSelectedTab(tab)
    }

    return (
        <main>
            <Hero />
            <section className="results">
                <article className="filter-buttons">
                    <button className={selectedTab === "trendings" ? "active" : ""} onClick={() => handleTabChange("trendings")}>Tendencias</button>
                    <button className={selectedTab === "movies" ? "active" : ""} onClick={() => handleTabChange("movies")}>Películas</button>
                    <button className={selectedTab === "series" ? "active" : ""} onClick={() => handleTabChange("series")}>Series</button>
                </article>
                <article className="lists">
                    {selectedTab === "trendings" && (
                        <TrendingList items={data.trendings} loadMore={() => loadMore("trendings")} />
                    )}
                    {selectedTab === "movies" && (
                        <MovieList items={data.movies} loadMore={() => loadMore("movies")} />
                    )}
                    {selectedTab === "series" && (
                        <SerieList items={data.series} loadMore={() => loadMore("series")} />
                    )}
                </article>
            </section>  
        </main>
    )
}

export default MainLayout