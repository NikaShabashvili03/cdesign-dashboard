import React from 'react'
import { useAuthStore } from '../../stores/authStore'

function Logout() {
    const { logout } = useAuthStore()
    return (
        <button onClick={logout}>Logout</button>
    )
}

export default Logout
