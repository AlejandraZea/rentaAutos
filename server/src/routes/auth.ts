import User from "@server/models/User";
import {Hono} from "hono";

const authRoutes = new Hono()

authRoutes.post('/login', async (c) => {
    try {
        const { email, password } = await c.req.json()

        const user = await User.findOne({ email })
        if (!user) {
            return c.json({ error: 'Correo o contraseña incorrectos' }, 401)
        }

        const isValid = await Bun.password.verify(password, user.password)
        if (!isValid) {
            return c.json({ error: 'Correo o contraseña incorrectos' }, 401)
        }

        // Aquí puedes generar un token si más adelante quieres manejar sesiones con JWT

        return c.json({
            message: 'Login exitoso',
            user: {
                username: user.username,
                email: user.email,
                role: user.role
            }
        })
    } catch (err) {
        console.error('Error en login:', err)
        return c.json({ error: 'Error interno del servidor' }, 500)
    }
})

export default authRoutes;
