import mongoose, { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: 'atenecion_publico' | 'encargado_autos' | 'dueño';
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// 2. Esquema de Mongoose
const UserSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: [true, 'El nombre de usuario es obligatorio'],
            unique: true,
            trim: true,
            minlength: [3, 'Mínimo 3 caracteres'],
            maxlength: [30, 'Máximo 30 caracteres'],
        },
        email: {
            type: String,
            required: [true, 'El email es obligatorio'],
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'Email no válido'],
        },
        password: {
            type: String,
            required: [true, 'La contraseña es obligatoria'],
            minlength: [6, 'Mínimo 6 caracteres'],
            select: false, // No se devuelve en las queries a menos que se pida explícitamente
        },
        role: {
            type: String,
            enum: ['atenecion_publico', 'encargado_autos' , 'dueño'],
            default: 'atenecion_publico',
        },
        status: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true, // Agrega createdAt y updatedAt automáticamente
        versionKey: false, // Evita el campo __v
    },
);

UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await Bun.password.hash(this.password);
    next();
});

// 3. Modelo de Mongoose
const User = model<IUser>('User', UserSchema);

export default User;