import './SearchBar.scss'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { FaSearch } from "react-icons/fa"

function SearchBar ( {closeModal} ) {

    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState("")

    const handleSearch = () => {
        navigate(`/search/${searchTerm}`)
        setSearchTerm("")
        if (closeModal) { closeModal() }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          handleSearch()
        }
      }

    return (
        <div className="search">
            <FaSearch />
            <input
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder='Buscar película o serie'
                onKeyDown={handleKeyPress}
            />
        </div>
    )
}

export default SearchBar