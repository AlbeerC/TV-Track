import { FaGoogle } from "react-icons/fa"
import { useAuth } from '../../context/AuthContext'
import { useState } from 'react'

function Register ( {handleRegisterModal} ) {

    const auth = useAuth()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleRegister = async (e) => {
        e.preventDefault()
        await auth.register(email, password)
        handleRegisterModal()                   
    }

    const handleRegisterWithGoogle = async () => {
        await auth.loginWithGoogle()
        handleRegisterModal()
    }

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
                        <input type="email" required onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="field">
                        <label>Contraseña <span>*</span></label>
                        <input type="password" required onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <button type='submit' onClick={handleRegister}>Enviar</button>
                </form>
                <button className='google' onClick={handleRegisterWithGoogle}><FaGoogle /> Ingresar con google</button>
            </article>
        </section>
    )
}

export default Register