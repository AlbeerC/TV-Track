import { BrowserRouter, Routes, Route } from 'react-router-dom'
// Components
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Dashboard from './components/Dashboard/Dashboard'
// Context
import AuthProvider from './context/AuthContext'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Hero /> } />
          <Route path='/profile' element={<Dashboard /> } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
