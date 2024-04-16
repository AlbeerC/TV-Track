import { useState } from 'react'
import './Navbar.scss'
import { TfiMenu } from "react-icons/tfi"
import { IoMdCloseCircleOutline } from "react-icons/io";
import Login from '../Login/Login'
import Register from '../Register/Register'
import ModalMobile from '../ModalMobile/ModalMobile'

function Navbar () {

    const [openMenu, setOpenMenu] = useState(false)
    const [openLoginModal, setOpenLoginModal] = useState(false)
    const [openRegisterModal, setOpenRegisterModal] = useState(false)

    const handleMobileModal = () => {
        setOpenMenu(!openMenu)
    }

    const handleLoginModal = () => {
        setOpenLoginModal(!openLoginModal)
    }

    const handleRegisterModal = () => {
        setOpenRegisterModal(!openRegisterModal)
    }
    return (
        <header>
            <h1>TV Track</h1>
            <input className='search-bar' type="search" name="" id="" />
            <div className='buttons'>
                <button onClick={handleLoginModal}>Inciar sesión</button>
                <span>|</span>
                <button onClick={handleRegisterModal}>Registrarse</button>
            </div>
            <button onClick={handleMobileModal} className='menu'>{openMenu ? <IoMdCloseCircleOutline /> : <TfiMenu />}</button>
            {openMenu && (
                <ModalMobile
                    handleLoginModal={handleLoginModal}
                    handleRegisterModal={handleRegisterModal}
                    handleMobileModal={handleMobileModal}
                />
            )}
            {openLoginModal ? <Login handleLoginModal={handleLoginModal}/> : null}
            {openRegisterModal ? <Register handleRegisterModal={handleRegisterModal} /> : null }
        </header>
    )
}

export default Navbar