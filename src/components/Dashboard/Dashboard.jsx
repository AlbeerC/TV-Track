import './Dashboard.scss'
import { useAuth } from '../../context/AuthContext'

function Dashboard () {

    const auth = useAuth()

    const getUser = auth.getUserFromLocalStorage()
    const user = getUser ? getUser.displayName || auth.cutDomainFromEmail(getUser?.email) : null

    return (
        <section className="dashboard">
            <h2>{user}</h2>
        </section>
    )
}

export default Dashboard