import { useState } from 'react'
import { useApi } from "../../context/ApiContext"
import Hero from '../Hero/Hero'
import TrendingList from '../ResultsList/TrendingList/TrendingList'
import MovieList from "../ResultsList/MovieList/MovieList"
import SerieList from "../ResultsList/SerieList/SerieList"
import FilterButtons from '../FilterButtons/FilterButtons'

function MainLayout () {
    const { data, loadMore } = useApi()

    const [selectedTab, setSelectedTab] = useState("trendings")

    const handleTabChange = (tab) => {
        setSelectedTab(tab)
    }

    return (
        <main>
            <Hero />
            <section className="results">
                <FilterButtons selectedTab={selectedTab} handleTabChange={handleTabChange}/>
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