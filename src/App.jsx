import { BrowserRouter, Routes, Route } from 'react-router-dom'
// Components
import Navbar from './components/Navbar/Navbar'
import MainLayout from './components/MainLayout/MainLayout'
import DashboardContainer from './components/DashboardContainer/DashboardContainer'
import Footer from './components/Footer/Footer'
import NotFound from './components/NotFound/NotFound'
import MovieDetailContainer from './components/MovieDetailContainer/MovieDetailContainer'
import SearchResults from './components/SearchResults/SearchResults'
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
          <Route path='/profile' element={<DashboardContainer /> } />
          <Route path='/detail/movie/:id' element={ <MovieDetailContainer /> } />
          <Route path='/search/:searchTerm' element={<SearchResults />}/>
          <Route path='*' element={<NotFound /> } />
        </Routes>
        <Footer />
      </BrowserRouter>
      </AuthProvider>
    </ApiProvider>
  )
}

export default App
