import './ModalMobile.scss'
import { useAuth } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'
import AlertLogout from '../AlertLogout/AlertLogout'
import { FaRobot } from 'react-icons/fa'

function ModalMobile({ handleLoginModal, handleRegisterModal, handleMobileModal, closeModal}) {

    const auth = useAuth()

    const getUser = auth.getUserFromLocalStorage()
    const user = getUser ? getUser.displayName || auth.cutDomainFromEmail(getUser?.email) : null
    const isLogged = auth.isLogged
    const navigate = useNavigate()

    const goToProfile = () => {
        navigate('/profile')
        closeModal()
    }

    return (
        <div className='modal-mobile-overlay'>
            {
                isLogged ? 
                    <div className="modal-logged">
                        <h3>{user}</h3>
                        <button onClick={goToProfile} to='/profile'>Ir a mi perfil</button>
                        <AlertLogout />
                        <SearchBar closeModal={closeModal}/>
                    </div>

                :
                    <div className='modal-not-logged'>
                        <button onClick={handleLoginModal}>Iniciar sesión</button>
                        <button onClick={handleRegisterModal}>Registrarse</button>
                        <SearchBar closeModal={closeModal}/>
                    </div>
            }
        </div>
    )
}

export default ModalMobile;
