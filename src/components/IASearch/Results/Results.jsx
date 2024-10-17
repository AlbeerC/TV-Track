import './Results.scss'

function Results ( {response, loading} ) {
    
    return (
        <section className='results'>
            <p>{loading ? "Cargando respuesta..." : response}</p>
        </section>
    )
}

export default Results