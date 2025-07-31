// src/pages/Register.tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register() {
    const [form, setForm] = useState({ username: '', email: '', password: '' })
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await fetch('http://localhost:3000/api/admin/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            })

            const data = await res.json()

            if (!res.ok) throw new Error(data.error || 'Error al registrar')

            setMessage('Registro exitoso. Redirigiendo al login...')
            setTimeout(() => navigate('/login'), 1500)
        } catch (err: any) {
            setMessage(err.message || 'Ocurrió un error')
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Registro</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input name="username" placeholder="Nombre de usuario" onChange={handleChange} className="p-2 border rounded" />
                <input name="email" type="email" placeholder="Correo" onChange={handleChange} className="p-2 border rounded" />
                <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} className="p-2 border rounded" />
                <button type="submit" className="bg-blue-500 text-white py-2 rounded">Registrarse</button>
            </form>
            {message && <p className="mt-4 text-center">{message}</p>}
        </div>
    )
}
