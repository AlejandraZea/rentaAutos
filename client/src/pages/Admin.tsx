export default function Admin() {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold">Panel de Administración</h1>
            <p className="mt-4">Bienvenido, {user.username}.</p>
        </div>
    )
}
