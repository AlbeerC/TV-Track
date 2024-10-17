import './IAContainer.scss'
import { useEffect, useState } from "react"
import axios from "axios"
import Results from "../Results/Results"
import { IoSend } from "react-icons/io5"

function IAContainer () {
    const [prompt, setPrompt] = useState('')
    const [response, setResponse] = useState('')
    const [loading, setLoading] = useState(false)

    const handlePromptSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setResponse('') // Limpiar la respuesta anterior

        const maxLength = 300
        const modifiedPrompt = `${prompt} Por favor, asegúrate de que la respuesta no supere los ${maxLength} caracteres, y de dar una respuesta concisa sin entrar en detalles.`
    
        try {
            const apiUrl = 'https://api.cohere.ai/generate'
            const apiKey = import.meta.env.VITE_COHERE_API_KEY
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            }

            const requestBody = {
                model: 'command-xlarge-nightly',  // Modelo de Cohere
                prompt: modifiedPrompt,                   // El prompt que envías
                max_tokens: 500,                  // Número máximo de tokens en la respuesta
                temperature: 0.5,
            }
            
            const { data } = await axios.post(apiUrl, requestBody, { headers })
            setResponse(data.text) // Establecer la respuesta de GPT
            setPrompt("") // Limpiar el prompt
        } catch (error) {
          console.error('Error al obtener la respuesta:', error)
          setResponse('Hubo un error al procesar tu solicitud.')
        } finally {
          setLoading(false) // Dejar de mostrar el estado de carga
        }
      }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          handlePromptSubmit()
        }
    }

    return (
        <section className='ia-container'>
            <Results response={response} loading={loading}/>
            <form onSubmit={handlePromptSubmit}>
                <input
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Pide recomendaciones de películas aquí"
                    onKeyDown={handleKeyPress}
                />
                <button type="submit" disabled={loading}>
                    <IoSend />
                </button>

            </form>
        </section>
    )
}

export default IAContainer
