import './Dashboard.scss'
import { useAuth } from '../../context/AuthContext'

function Dashboard () {

    const auth = useAuth()

    const getUser = auth.getUserFromLocalStorage()
    const user = getUser ? getUser.displayName || auth.cutDomainFromEmail(getUser?.email) : null
    const isLogged = auth.isLogged

    const handleLogout = () => {
        auth.logout()
    }

    return (
        <section className="dashboard">
            {
            isLogged ? 
                <article className='dashboard-logged'>
                    <h2>{user}</h2>
                    <button onClick={handleLogout}>Cerrar sesión</button>
                </article>
                :
                <article className='dashboard-not-logged'>
                    <p>Tienes que iniciar sesión o registrarte para ver tu perfil</p>
                </article>
            }
        </section>
    )
}

export default Dashboard