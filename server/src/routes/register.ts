// src/routes/auth.ts
import { Hono } from 'hono'
import User from '../models/User'

const registerRoutes = new Hono()

registerRoutes.post('/register', async (c) => {
    try {
        const { username, email, password } = await c.req.json()

        const existing = await User.findOne({ email })
        if (existing) {
            return c.json({ error: 'Este correo ya está registrado' }, 400)
        }

        const hashedPassword = await Bun.password.hash(password)

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: 'user'
        })

        await newUser.save()

        return c.json({ message: 'Usuario registrado correctamente' })
    } catch (err) {
        console.error('Error en registro:', err)
        return c.json({ error: 'Error en el servidor' }, 500)
    }
})

export default registerRoutes
