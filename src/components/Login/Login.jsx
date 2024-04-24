import './Login.scss'
import { FaGoogle } from "react-icons/fa"
import { useAuth } from '../../context/AuthContext'
import { useState } from 'react'

function Login ( {handleLoginModal} ) {

    const auth = useAuth()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault()
        await auth.login(email, password)
        handleLoginModal()
    }

    const handleLoginWithGoogle = async () => {
        await auth.loginWithGoogle()
        handleLoginModal()
    }



    return (
        <section className="modal-overlay">
            <article className="modal">
                <div className="top">
                    <h2>Inciar sesión</h2>
                    <button className='close-modal' onClick={handleLoginModal}>X</button>
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
                    <button type='submit' onClick={handleLogin}>Enviar</button>
                </form>
                <button className='google' onClick={handleLoginWithGoogle}><FaGoogle /> Ingresar con google</button>
                <p className='error-message'>{auth.error}</p>
            </article>
        </section>
    )
}

export default Login