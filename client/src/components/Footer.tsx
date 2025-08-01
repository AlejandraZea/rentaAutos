// src/components/Footer.tsx
export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white text-center py-4 mt-10">
            © {new Date().getFullYear()} BHVR App. Todos los derechos reservados.
        </footer>
    )
}
