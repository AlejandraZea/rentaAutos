import { Hono } from 'hono'
import User from '../models/User'

const adminRoutes = new Hono()

// Obtener todos los usuarios
adminRoutes.get('/users', async (c) => {
    try {
        const users = await User.find({}, { password: 0 }) // Ocultar password
        return c.json(users)
    } catch (err) {
        return c.json({ error: 'Error al obtener usuarios' }, 500)
    }
})

// Cambiar el rol de un usuario
adminRoutes.put('/users/:id/role', async (c) => {
    try {
        const id = c.req.param('id')
        const { role } = await c.req.json()
        const user = await User.findByIdAndUpdate(id, { role }, { new: true })
        return c.json({ message: 'Rol actualizado', user })
    } catch (err) {
        return c.json({ error: 'Error al cambiar rol' }, 500)
    }
})

// Eliminar usuario
adminRoutes.delete('/users/:id', async (c) => {
    try {
        const id = c.req.param('id')
        await User.findByIdAndDelete(id)
        return c.json({ message: 'Usuario eliminado' })
    } catch (err) {
        return c.json({ error: 'Error al eliminar usuario' }, 500)
    }
})

export default adminRoutes
