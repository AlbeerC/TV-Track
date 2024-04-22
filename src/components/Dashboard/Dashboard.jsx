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
            <h2>{user}</h2>
            {isLogged && <button onClick={handleLogout}>Cerrar sesión</button>}
        </section>
    )
}

export default Dashboard