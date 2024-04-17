import { BrowserRouter, Routes, Route } from 'react-router-dom'
// Components
import Navbar from './components/Navbar/Navbar'
import MainLayout from './components/MainLayout/MainLayout'
import Dashboard from './components/Dashboard/Dashboard'
import TrendingList from './components/TrendingList/TrendingList'
import MovieList from './components/MovieList/MovieList'
import SerieList from './components/SerieList/SerieList'
// Context
import ApiProvider from './context/ApiContext'
import AuthProvider from './context/AuthContext'

function App() {

  return (
    <ApiProvider>
      <AuthProvider>
        <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<MainLayout /> } />
          <Route path='/profile' element={<Dashboard /> } />
          <Route path='/trendings' element={<TrendingList /> } />
          <Route path='/movies' element={<MovieList /> } />
          <Route path='/series' element={<SerieList /> } />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </ApiProvider>
  )
}

export default App
