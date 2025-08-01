// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './pages/AdminDashboard'
import UserDashboard from './pages/UserDashboard'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
    const user = JSON.parse(localStorage.getItem('user') || 'null')

    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Rutas protegidas */}
                <Route
                    path="/AdminDashboard"
                    element={
                        user && user.role === 'admin' ? (
                            <AdminDashboard />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />

                <Route
                    path="/UserDashboard"
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
            <Footer />
        </Router>
    )
}

export default App
