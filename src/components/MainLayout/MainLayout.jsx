import { useState } from 'react'
import { useApi } from "../../context/ApiContext"
import Hero from '../Hero/Hero'
import { useLocation, useNavigate } from 'react-router-dom'
import ResultsList from '../ResultsList/ResultsList'

function MainLayout () {
    const { data, loadMore } = useApi()
    const location = useLocation()
    const navigate = useNavigate()

    return (
        <main>
            <Hero />
            <ResultsList />
        </main>
    )
}

export default MainLayout