import { Link } from 'react-router-dom'
import './NotFound.scss'

function NotFound () {

    return (
        <section className="not-found">
            <h2>404 | PÁGINA NO ENCONTRADA</h2>
            <Link to='/'>Volver al inicio</Link>
            <p></p>
        </section>
    )
}

export default NotFound