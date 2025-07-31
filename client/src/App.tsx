// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './pages/Admin'
import UserDashboard from './pages/Dashboard'

function App() {
    const user = JSON.parse(localStorage.getItem('user') || 'null')

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Rutas protegidas */}
                <Route
                    path="/admin"
                    element={
                        user && user.role === 'admin' ? (
                            <AdminDashboard />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />

                <Route
                    path="/dashboard"
                    element={
                        user && user.role === 'user' ? (
                            <UserDashboard />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />

                {/* Redirección por defecto */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    )
}

export default App
