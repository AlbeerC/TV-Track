import './ModalMobile.scss'
import { IoLogOutSharp } from "react-icons/io5"
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

function ModalMobile({ handleLoginModal, handleRegisterModal, handleMobileModal}) {

    const auth = useAuth()

    const getUser = auth.getUserFromLocalStorage()
    const user = getUser ? getUser.displayName || auth.cutDomainFromEmail(getUser?.email) : null
    const isLogged = auth.isLogged

    const handleLogout = () => {
        auth.logout()
    }

    return (
        <div className='modal-mobile-overlay'>
            {
                isLogged ? 
                    <div className="modal-logged">
                        <Link to='/profile'><p>{user}</p></Link>
                        <button onClick={handleLogout}><IoLogOutSharp /></button>
                    </div>

                :
                    <div className='modal-not-logged'>
                        <button onClick={handleLoginModal}>Iniciar sesión</button>
                        <button onClick={handleRegisterModal}>Registrarse</button>
                        <input className='search-mobile-bar' type='search' placeholder='Buscar película o serie'/>
                    </div>
            }
        </div>
    )
}

export default ModalMobile;
