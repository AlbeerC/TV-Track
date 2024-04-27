import './Hero.scss'
import { FaCheckCircle } from "react-icons/fa"

function Hero () {

    const scrollDown = () => {
        if (window.innerWidth >= 768) {
            window.scrollBy(0, 610)
        } else {
            window.scrollBy(0, 810)
        }
    }

    return (
        <section className="hero">
            <article>
                <ul className="list">
                    <li>-Lleva un registro de lo que has visto <FaCheckCircle /></li>
                    <li>-Guarda lo que quieres ver próximamente <FaCheckCircle /></li>
                    <li>-Brinda opiniones y comentarios <FaCheckCircle /></li>
                    <li>-Descubre qué puedes ver a continuación <FaCheckCircle /></li>
                </ul>
                <button onClick={scrollDown}>Descubrir</button>
            </article>
        </section>
    )
}

export default Hero