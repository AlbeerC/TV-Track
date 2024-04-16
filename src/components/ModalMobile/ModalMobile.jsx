import './ModalMobile.scss'

function ModalMobile({ handleLoginModal, handleRegisterModal, handleMobileModal}) {

    return (
        <div className='modal-mobile-overlay'>
            <div className='modal'>
                <button onClick={handleLoginModal}>Iniciar sesión</button>
                <button onClick={handleRegisterModal}>Registrarse</button>
                <input className='search-mobile-bar' type='search' placeholder='Buscar película o serie'/>
            </div>
        </div>
    );
}

export default ModalMobile;
