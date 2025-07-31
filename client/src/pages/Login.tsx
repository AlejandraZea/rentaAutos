// src/pages/Login.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom' // ✅ falta esta línea
import LogoutButton from '../components/LogoutButton'

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' })
    const [message, setMessage] = useState('')
    const [role, setRole] = useState<string | null>(null)
    const navigate = useNavigate() // ✅ falta esta línea

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await fetch('http://localhost:3000/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })

            const data = await res.json()
            debugger;

            if (!res.ok) throw new Error(data.error || 'Error en el login')

            setMessage(`Bienvenido, ${data.user.username}`)
            setRole(data.user.role)

            localStorage.setItem('user', JSON.stringify(data.user)) // ✅ solo una vez

            // ✅ redirección según rol
            if (data.user.role === 'admin') {
                navigate('/admin')
            } else {
                navigate('/dashboard')
            }

        } catch (err: any) {
            setMessage(err.message)
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input name="email" type="email" placeholder="Correo" onChange={handleChange} className="p-2 border rounded" />
                <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} className="p-2 border rounded" />
                <button type="submit" className="bg-green-600 text-white py-2 rounded">Iniciar sesión</button>
                <LogoutButton />
            </form>
            {message && <p className="mt-4 text-center">{message}</p>}
            {role && (
                <p className="mt-2 text-center font-medium text-blue-600">
                    Acceso como <strong>{role}</strong>
                </p>
            )}
        </div>
    )
}

