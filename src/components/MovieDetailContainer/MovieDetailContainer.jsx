import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loading from '../Loading/Loading'
import MovieDetail from "../MovieDetail/MovieDetail"

function MovieDetailContainer () {

    const API_KEY = "59a8b9ea3a6d0f0d1d790d8bb5f36d94"
    const { id } = useParams()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=es`)
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false))

    }, [id])

    if (loading) { return <Loading /> }

    return (
        <section className="details">
            <MovieDetail data={data}/>
        </section>
    )
}

export default MovieDetailContainer