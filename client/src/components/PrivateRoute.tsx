import { Navigate } from 'react-router-dom'

interface Props {
    children: React.ReactNode
    allowedRoles: ('admin' | 'user')[]
}

export default function PrivateRoute({ children, allowedRoles }: Props) {
    const user = JSON.parse(localStorage.getItem('user') || 'null')

    if (!user) return <Navigate to="/login" />
    if (!allowedRoles.includes(user.role)) return <Navigate to="/" />

    return <>{children}</>
}
