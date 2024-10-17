import { useState } from 'react'
import './Navbar.scss'
import { TfiMenu } from "react-icons/tfi"
import { IoMdCloseCircleOutline } from "react-icons/io"
import { FaUserAlt, FaRobot } from "react-icons/fa"
import Login from '../Login/Login'
import Register from '../Register/Register'
import ModalMobile from '../ModalMobile/ModalMobile'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'
import AlertLogout from '../AlertLogout/AlertLogout'

function Navbar () {

    const auth = useAuth()

    const getUser = auth.getUserFromLocalStorage()
    const user = getUser ? getUser.displayName || auth.cutDomainFromEmail(getUser?.email) : null
    const isLogged = auth.isLogged

    const [openMenu, setOpenMenu] = useState(false)
    const [openLoginModal, setOpenLoginModal] = useState(false)
    const [openRegisterModal, setOpenRegisterModal] = useState(false)

    const handleMobileModal = () => {
        setOpenMenu(!openMenu)
        document.body.classList.toggle('modal-opened', !openMenu)
    }

    const handleLoginModal = () => {
        setOpenLoginModal(!openLoginModal)
    }

    const handleRegisterModal = () => {
        setOpenRegisterModal(!openRegisterModal)
    }

    const closeModal = () => {
        setOpenMenu(false)
        document.body.classList.toggle('modal-opened')
    }
    
    if (isLogged && openLoginModal) {
        setOpenLoginModal(false)
    }

    if (isLogged && openRegisterModal) {
        setOpenRegisterModal(false)
    }

    return (
        <header>
            <Link to='/'><h1>TV Track</h1></Link>
            <SearchBar />
            <div className='buttons'>
                <Link to='/AI-search'>Tom<FaRobot /></Link>
                {
                    isLogged ? 
                    <div className='logged'>
                        <Link to='/profile'><p><FaUserAlt />{user}</p></Link>
                        <AlertLogout />
                    </div>
                    :
                    <div className="not-logged">
                        <button onClick={handleLoginModal}>Inciar sesión</button>
                        <span>|</span>
                        <button onClick={handleRegisterModal}>Registrarse</button>
                    </div>
                }
            </div>
            <button onClick={handleMobileModal} className='menu'>{openMenu ? <IoMdCloseCircleOutline /> : <TfiMenu />}</button>
            {openMenu && (
                <ModalMobile
                    handleLoginModal={handleLoginModal}
                    handleRegisterModal={handleRegisterModal}
                    handleMobileModal={handleMobileModal}
                    closeModal={closeModal}
                />
            )}
            {openLoginModal ? <Login handleLoginModal={handleLoginModal} /> : null}
            {openRegisterModal ? <Register handleRegisterModal={handleRegisterModal} /> : null }
        </header>
    )
}

export default Navbar