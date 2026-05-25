import CriarUsuario from "./components/CriarUsuario"
import Header from "./components/Header"
import ListarUsuario from "./components/ListarUsuario"
import Link from "next/link"

export default function Home(){
  return(
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header name="Gerenciar Usuários"/>
      
      {/* Banner com link para Dashboard */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 p-6 m-4 rounded-lg text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Novo Dashboard Disponível</h2>
            <p className="text-blue-100">Monitore sensores e dispositivos IoT em tempo real</p>
          </div>
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Ir para Dashboard →
          </Link>
        </div>
      </div>

      <div className="flex gap-4 p-4 max-w-7xl mx-auto">
        <CriarUsuario/>
        <ListarUsuario/>
      </div>
    </div>
  )
}