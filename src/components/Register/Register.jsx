import { FaGoogle } from "react-icons/fa";

function Register ( {handleRegisterModal} ) {

    return (
        <section className="modal-overlay">
            <article className="modal">
                <div className="top">
                    <h2>Registrarse</h2>
                    <button className='close-modal' onClick={handleRegisterModal}>X</button>
                </div>
                <form onClick={(e) => e.preventDefault()}>
                    <div className="field">
                        <label>E-mail <span>*</span></label>
                        <input type="email" required/>
                    </div>
                    <div className="field">
                        <label>Contraseña <span>*</span></label>
                        <input type="password" required/>
                    </div>
                    <button type='submit'>Enviar</button>
                </form>
                <button className='google'><FaGoogle /> Ingresar con google</button>
            </article>
        </section>
    )
}

export default Register