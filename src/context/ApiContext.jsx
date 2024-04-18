import { createContext, useState, useEffect, useContext } from "react"
 
const ApiContext = createContext()

function ApiProvider({ children }) {
  const API_KEY = "59a8b9ea3a6d0f0d1d790d8bb5f36d94"
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState({ trendings: 1, movies: 1, series: 1 })
  const [data, setData] = useState({trendings: [], movies: [], series: []})

  const loadMore = (type) => {
    setPage((prevPage) => ({
      ...prevPage,
      [type]: prevPage[type] + 1,
    }))
  }

  const callApi = async (endpoint, type) => {
    setLoading(true);
    try {
      const response = await fetch(`${endpoint}&page=${page[type]}`)
      const jsonData = await response.json()
      setData((prevData) => ({
        ...prevData,
        [type]: page[type] === 1 ? jsonData.results : [...prevData[type], ...jsonData.results],
      }))
    } catch (error) {
      console.error(`Error fetching ${type} data:`, error)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    callApi(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`, "trendings")
    callApi(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`, "movies")
    callApi(`https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}`, "series")
  }, [page])

  const imageProps = {
    baseURL: "https://image.tmdb.org/t/p/",
    posterSize: "w200",
  }

  return (
    <ApiContext.Provider value={{ data, imageProps, loadMore, loading }}>
      {children}
    </ApiContext.Provider>
  )
}

export const useApi = () => useContext(ApiContext)

export default ApiProvider