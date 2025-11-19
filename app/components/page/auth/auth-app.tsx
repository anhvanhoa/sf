'use client'

import { useState } from 'react'
import HomePage from './home-page'
import Dashboard from './dashboard'

type AuthState = 'home' | 'dashboard'

const AuthApp = () => {
    const [authState, setAuthState] = useState<AuthState>('home')
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const handleLogin = () => {
        setIsAuthenticated(true)
        setAuthState('dashboard')
    }

    const handleLogout = () => {
        setIsAuthenticated(false)
        setAuthState('home')
    }

    if (isAuthenticated && authState === 'dashboard') {
        return <Dashboard onLogout={handleLogout} />
    }

    return <HomePage onLoginSuccess={handleLogin} />
}

export default AuthApp
