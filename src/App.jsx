import { BrowserRouter, Routes, Route } from 'react-router-dom'
// Components
import Navbar from './components/Navbar/Navbar'
import MainLayout from './components/MainLayout/MainLayout'
import Dashboard from './components/Dashboard/Dashboard'
import Footer from './components/Footer/Footer'
import NotFound from './components/NotFound/NotFound'
import MovieDetailContainer from './components/MovieDetailContainer/MovieDetailContainer'
import SerieDetailContainer from './components/SerieDetailContainer/SerieDetailContainer'
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
          <Route path='*' element={<NotFound /> } />
          <Route path='/detail/movie/:id' element={ <MovieDetailContainer /> } />
          <Route path='/detail/serie/:id' element={ <SerieDetailContainer /> } />
        </Routes>
        <Footer />
      </BrowserRouter>
      </AuthProvider>
    </ApiProvider>
  )
}

export default App
