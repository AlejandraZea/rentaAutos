import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/', {
            dbName: 'rentaAutos',
        })
        console.log('📦 Conectado a MongoDB local correctamente')
    } catch (err) {
        console.error('❌ Error al conectar con MongoDB:', err)
        process.exit(1)
    }
}