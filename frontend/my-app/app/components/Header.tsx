import Link from 'next/link'

interface Iprops {
    name: string
}

export default function Header({ name }: Iprops) {
    return (
        <div className="w-full bg-linear-to-r from-slate-900 to-slate-800 border-b border-slate-700/50 p-4 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">{name}</h1>
                <nav className="flex gap-6">
                    <Link
                        href="/dashboard"
                        className="px-4 py-2 text-gray-300 hover:text-blue-400 transition-colors font-medium flex items-center gap-2"
                    >
                        📊 Dashboard
                    </Link>
                    <Link
                        href="/"
                        className="px-4 py-2 text-gray-300 hover:text-blue-400 transition-colors font-medium flex items-center gap-2"
                    >
                        👥 Usuários
                    </Link>
                    <Link
                        href="/devices"
                        className="px-4 py-2 text-gray-300 hover:text-blue-400 transition-colors font-medium flex items-center gap-2"
                    >
                        🖥️ Dispositivos
                    </Link>
                </nav>
            </div>
        </div>
    )
}