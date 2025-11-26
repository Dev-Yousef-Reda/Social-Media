import { jwtDecode } from 'jwt-decode'
import React, { createContext, useEffect, useState } from 'react'

export const authorizationContext = createContext()

export default function AuthorizationContextProvider({ children }) {

    const [token, setToken] = useState(() => (localStorage.getItem('tkn')))
    const [userId, setUserId] = useState(null)

    function addToken(tkn) {
        setToken(tkn)
    }

    function clearToken() {
        setToken(null)
        localStorage.clear()
    }

    useEffect(() => {

        if(token) {
            const { user } = jwtDecode(token)
            console.log('jwt: ', user)
            setUserId(user)
        }

    }, [token])


    return (
        <authorizationContext.Provider value={{ addToken, clearToken, userId }}>
            {children}
        </authorizationContext.Provider>
    )
}
