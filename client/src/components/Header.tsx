// src/components/Header.tsx
import { Link, useNavigate } from 'react-router-dom'

export default function Header() {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('user')
        navigate('/')
    }

    const user = JSON.parse(localStorage.getItem('user') || 'null')

    return (
        <header className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow">
            <Link to="/" className="text-xl font-bold">Renta de Autos Chihuahua UTCH</Link>
            <nav className="flex gap-4 items-center">
                {user ? (
                    <>
                        <span className="text-lg font-large text-gray-300">
                            Bienvenido, <strong>{user.username}</strong>
                        </span>

                        {user.role === 'admin' && <Link to="/AdminDashboard">Administrador</Link>}
                        {user.role === 'user' && <Link to="/UserDashboard">Usuario</Link>}
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                    </>
                )}
            </nav>
        </header>
    )
}
