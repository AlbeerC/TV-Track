import { createContext, useContext, useState, useEffect } from 'react'
import { auth, db } from '../firebase/config'
import { doc, setDoc, collection } from "firebase/firestore";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, signOut } from 'firebase/auth'

const AuthContext = createContext()

function AuthProvider ( {children} ) {
    const [isLogged, setIsLogged] = useState(false)
    const [error, setError] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user)
        })

        return () => unsubscribe()
    }, [])

    useEffect(() => {
        const storedUser = getUserFromLocalStorage()
        if (storedUser) {
          setIsLogged(true)
        }
      }, [])

    // Log in and sing up functions  
    const register = async (email, password) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            setIsLogged(true)
            setError(null)
            storeUserInLocalStorage(auth.currentUser)
            saveUserToFirestore(auth.currentUser)
        } catch (error) {
            setError(`Error al registrar usuario: ${error.message}`)
        }
    }

    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            setIsLogged(true)
            setError(null)
            storeUserInLocalStorage(auth.currentUser)
            saveUserToFirestore(auth.currentUser)
        } catch (error) {
            setError(`Error al ingresar usuario: ${error.message}`)
        }
    }

    const loginWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider()
            await signInWithPopup(auth, provider)
            setIsLogged(true)
            setError(null)
            storeUserInLocalStorage(auth.currentUser)
            saveUserToFirestore(auth.currentUser)
        } catch (error) {
            setError(`Error al ingresar con google: ${error.message}`)
        }
    }

    const logout = async () => {
        try {
            await signOut(auth)
            setIsLogged(false)
            setError(null)
            removeUserFromLocalStorage()
        } catch (error) {
            setError(`Error al cerrar sesión: ${error.message}`)
        }
    }

    // Get user and localStorage functions
    const getUser = () => {
        const currentUser = auth.currentUser
        if (currentUser) {
            return currentUser
        } else {
            return null
        }
    }

    const getUserId = () => {
        const user = getUser()
        return user ? user.uid : null
    }

    const storeUserInLocalStorage = (user) => {
        localStorage.setItem('user', JSON.stringify(user))
    }

    const getUserFromLocalStorage = () => {
        const storedUser = localStorage.getItem('user')
        return storedUser ? JSON.parse(storedUser) : null
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('user')
    }

    const saveUserToFirestore = async (user) => {
        try {
            const userId = getUserId()
            const userRef = doc(db, "users", userId)

            await setDoc(doc(userRef, 'watchlist', userId), {})
            await setDoc(doc(userRef, 'watched', userId), {})    

            await setDoc(userRef, {
                email: user.email
            })
        } catch (error) {
            console.error("Error saving user in Firestore:", error)
        }
    }

    // Other functions
    const cutDomainFromEmail = (email) => {
        const atIndex = email.indexOf('@')

        if (atIndex !== -1) {
            const username = email.substring(0, atIndex)
            return username
        }

        return email
    }

    return (
        <AuthContext.Provider value={{isLogged, error, register, login, loginWithGoogle, logout, getUser, getUserFromLocalStorage, cutDomainFromEmail, getUserId}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider