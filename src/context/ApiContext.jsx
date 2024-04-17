import { createContext, useState, useEffect, useContext } from "react"
 
const ApiContext = createContext()

function ApiProvider({ children }) {
  const API_KEY = "59a8b9ea3a6d0f0d1d790d8bb5f36d94"
  const [trendings, setTrendings] = useState([])
  const [movies, setMovies] = useState([])
  const [series, setSeries] = useState([])
  const [page, setPage] = useState({ trendings: 1, movies: 1, series: 1 });
  const [pageSize, setPageSize] = useState(20)
  const [loading, setLoading] = useState(true)

  const imageProps = {
    baseURL: "https://image.tmdb.org/t/p/",
    posterSize: "w200",
  }

  useEffect(() => {
    getAllData()
  }, [page])

  const getAllData = async () => {
    setLoading(true)
    try {
        // Trendings
      const trendingResponse = await fetch(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${page}`
      )
      const trendingJsonData = await trendingResponse.json()
      setTrendings((prevData) => [...prevData, ...trendingJsonData.results])

        // Movies
      const moviesResponse = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${page}`
      )
      const moviesJsonData = await moviesResponse.json();
      setMovies((prevData) => [...prevData, ...moviesJsonData.results])

        // Series
      const seriesResponse = await fetch(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&page=${page}`
      )
      const seriesJsonData = await seriesResponse.json()
      setSeries((prevData) => [...prevData, ...seriesJsonData.results])
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadMore = () => {
    setPage((prevPage) => ({
      ...prevPage,
      trendings: prevPage.trendings + 1,
      movies: prevPage.movies + 1,
      series: prevPage.series + 1
    }))
  }

  return (
    <ApiContext.Provider value={{ trendings, movies, series, imageProps, loadMore }}>
      {children}
    </ApiContext.Provider>
  )
}

export const useApi = () => useContext(ApiContext)

export default ApiProvider