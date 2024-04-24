import './Hero.scss'
import { FaCheckCircle } from "react-icons/fa"

function Hero () {

    return (
        <section className="hero">
            <article>
                <ul className="list">
                    <li>-Lleva un registro de lo que has visto <FaCheckCircle /></li>
                    <li>-Guarda lo que quieres ver próximamente <FaCheckCircle /></li>
                    <li>-Brinda opiniones y comentarios <FaCheckCircle /></li>
                    <li>-Descubre qué puedes ver a continuación <FaCheckCircle /></li>
                </ul>
                <button>Descubrir</button>
            </article>
        </section>
    )
}

export default Hero