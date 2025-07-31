export default function Dashboard() {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold">Dashboard de Usuario</h1>
            <p className="mt-4">Hola, {user.username}.</p>
        </div>
    )
}
