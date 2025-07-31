// src/components/LogoutButton.tsx
import { useNavigate } from 'react-router-dom'

export default function LogoutButton() {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('user')
        navigate('/login')
    }

    return (
        <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
        >
            Cerrar sesión
        </button>
    )
}
