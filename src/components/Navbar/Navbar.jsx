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

function Navbar () {

    const auth = useAuth()

    const getUser = auth.getUserFromLocalStorage()
    const user = getUser ? getUser.displayName || auth.cutDomainFromEmail(getUser?.email) : null
    const isLogged = auth.isLogged

    // Function to get user initials
    const getUserInitials = (name) => {
        if (!name) return 'U'
        const words = name.trim().split(' ')
        if (words.length === 1) {
            return words[0].charAt(0).toUpperCase()
        }
        return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase()
    }

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
        <header className='fixed top-0 left-0 right-0 z-50 shadow-sm'>
            <Link to='/'><h1>Peliteca</h1></Link>
            <SearchBar />
            <div className='buttons'>
                {
                    isLogged ? 
                    <div className='logged'>
                        <div className="user-avatar">
                            <Link to='/profile'>
                                <div className="avatar-circle">
                                    {getUserInitials(user)}
                                </div>
                            </Link>
                        </div>
                        <Link to='/profile'><p>{user}</p></Link>
                    </div>
                    :
                    <div className="not-logged">
                        <button onClick={handleLoginModal}>Iniciar sesión</button>
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