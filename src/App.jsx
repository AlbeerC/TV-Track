import { BrowserRouter, Routes, Route } from 'react-router-dom'
// Components
import Navbar from './components/Navbar/Navbar'
import MainLayout from './components/MainLayout/MainLayout'
import Dashboard from './components/Dashboard/Dashboard'
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
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </ApiProvider>
  )
}

export default App
