import './MainLayout.scss'
import Hero from '../Hero/Hero'
import { Link } from 'react-router-dom'
import TrendingList from '../TrendingList/TrendingList'

function MainLayout () {

    return (
        <main>
            <Hero />
            <section className="results">
                <div className="results-buttons">
                    <Link to='/movies'>Películas</Link>
                    <Link to='series'>Series</Link>
                </div>
            </section>
            <TrendingList />
        </main>
    )
}

export default MainLayout