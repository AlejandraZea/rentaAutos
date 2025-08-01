// src/pages/AdminDashboard.tsx
import { useEffect, useState } from 'react'

type User = {
    _id: string
    username: string
    email: string
    role: 'admin' | 'user'
}

export default function AdminDashboard() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchUsers = async () => {
        setLoading(true)
        setError(null)
        try {
            const res = await fetch('http://localhost:3000/api/admin/users')
            if (!res.ok) throw new Error('Error al cargar usuarios')
            const data = await res.json()
            setUsers(data)
        } catch (err: any) {
            setError(err.message || 'Error desconocido')
        } finally {
            setLoading(false)
        }
    }

    const changeRole = async (id: string, newRole: 'admin' | 'user') => {
        try {
            const res = await fetch(`http://localhost:3000/api/admin/users/${id}/role`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: newRole }),
            })
            if (!res.ok) throw new Error('Error al actualizar rol')
            await fetchUsers()
        } catch (err: any) {
            setError(err.message)
        }
    }

    const deleteUser = async (id: string) => {
        if (!window.confirm('¿Seguro que quieres eliminar este usuario?')) return
        try {
            const res = await fetch(`http://localhost:3000/api/admin/users/${id}`, {
                method: 'DELETE',
            })
            if (!res.ok) throw new Error('Error al eliminar usuario')
            await fetchUsers()
        } catch (err: any) {
            setError(err.message)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>

            {error && <p className="mb-4 text-red-600">{error}</p>}

            {loading ? (
                <p>Cargando usuarios...</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2">Nombre</th>
                        <th className="border border-gray-300 p-2">Correo</th>
                        <th className="border border-gray-300 p-2">Rol</th>
                        <th className="border border-gray-300 p-2">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="text-center">
                            <td className="border border-gray-300 p-2">{user.username}</td>
                            <td className="border border-gray-300 p-2">{user.email}</td>
                            <td className="border border-gray-300 p-2">{user.role}</td>
                            <td className="border border-gray-300 p-2 space-x-2">
                                <button
                                    onClick={() => changeRole(user._id, user.role === 'admin' ? 'user' : 'admin')}
                                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                >
                                    Cambiar a {user.role === 'admin' ? 'user' : 'admin'}
                                </button>
                                <button
                                    onClick={() => deleteUser(user._id)}
                                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                    {users.length === 0 && (
                        <tr>
                            <td colSpan={4} className="p-4 text-center text-gray-500">
                                No hay usuarios para mostrar.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            )}
        </div>
    )
}
