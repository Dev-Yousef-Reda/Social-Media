import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRouter({ children }) {
    
    if (!localStorage.getItem('tkn')) {
        return <Navigate to={'/login'} />
    }

    return (
        <>
            {children}
        </>
    )
}
