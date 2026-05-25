"use client"
import { FormEvent, useEffect, useState } from "react"

const API_URL = 'http://localhost:8080'

interface Usuario {
    id: number
    nome: string
    email: string
    senha?: string
}

export default function ListarUsuario() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState('')
    const [modalAberto, setModalAberto] = useState(false)
    const [editUsuario, setEditUsuario] = useState<Usuario | null>(null)
    const [editNome, setEditNome] = useState('')
    const [editEmail, setEditEmail] = useState('')
    const [editSenha, setEditSenha] = useState('')
    const [actionErro, setActionErro] = useState('')
    const [actionMensagem, setActionMensagem] = useState('')

    const buscarUsuarios = async () => {
        setCarregando(true)
        setErro('')
        setActionMensagem('')
        setActionErro('')

        try {
            const resposta = await fetch(`${API_URL}/usuarios`)
            const data = await resposta.json()

            if (!resposta.ok) {
                setErro('Erro ao carregar usuários')
                return
            }

            setUsuarios(data)
        } catch (error) {
            setErro('Erro de conexão com a API')
            console.error(error)
        } finally {
            setCarregando(false)
        }
    }

    const abrirEdicao = (usuario: Usuario) => {
        setEditUsuario(usuario)
        setEditNome(usuario.nome)
        setEditEmail(usuario.email)
        setEditSenha(usuario.senha || '')
        setActionErro('')
        setActionMensagem('')
        setModalAberto(true)
    }

    const fecharModal = () => {
        setModalAberto(false)
        setEditUsuario(null)
        setEditNome('')
        setEditEmail('')
        setEditSenha('')
        setActionErro('')
        setActionMensagem('')
    }

    const handleEditarUsuario = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!editUsuario) return

        setActionErro('')
        setActionMensagem('')

        try {
            const resposta = await fetch(`${API_URL}/usuarios/${editUsuario.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome: editNome, email: editEmail, senha: editSenha })
            })

            const data = await resposta.json()
            if (!resposta.ok) {
                setActionErro(data.msg || 'Erro ao atualizar usuário')
                return
            }

            setActionMensagem('Usuário atualizado com sucesso!')
            buscarUsuarios()
            fecharModal()
        } catch (error) {
            setActionErro('Erro de conexão com a API')
            console.error(error)
        }
    }

    const handleExcluirUsuario = async (id: number) => {
        if (!confirm('Deseja excluir este usuário?')) {
            return
        }

        setActionErro('')
        setActionMensagem('')

        try {
            const resposta = await fetch(`${API_URL}/usuarios/${id}`, {
                method: 'DELETE'
            })
            const data = await resposta.json()

            if (!resposta.ok) {
                setActionErro(data.msg || 'Erro ao excluir usuário')
                return
            }

            setActionMensagem('Usuário excluído com sucesso!')
            buscarUsuarios()
        } catch (error) {
            setActionErro('Erro de conexão com a API')
            console.error(error)
        }
    }

    useEffect(() => {
        buscarUsuarios()
    }, [])

    return (
        <div className="w-[50vw] max-h-[88vh] overflow-y-auto bg-white text-black rounded-xl flex flex-col gap-4 p-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Lista de Usuários</h2>
                <button
                    onClick={buscarUsuarios}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Atualizar
                </button>
            </div>

            {actionMensagem && <p className="text-green-600">{actionMensagem}</p>}
            {actionErro && <p className="text-red-600">{actionErro}</p>}

            {carregando ? (
                <p>Carregando usuários...</p>
            ) : erro ? (
                <p className="text-red-600">{erro}</p>
            ) : usuarios.length === 0 ? (
                <p>Nenhum usuário encontrado.</p>
            ) : (
                usuarios.map((usuario) => (
                    <div key={usuario.id} className="bg-gray-100 border border-gray-300 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                            <div>
                                <p className="text-lg font-semibold">{usuario.nome}</p>
                                <p className="text-sm text-gray-600">{usuario.email}</p>
                            </div>
                            <span className="text-sm text-slate-500">ID {usuario.id}</span>
                        </div>
                        <div className="flex gap-3 text-sm text-slate-700 mb-4">
                            <p>Senha: {usuario.senha ? '••••••••' : 'não cadastrada'}</p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                                onClick={() => abrirEdicao(usuario)}
                            >
                                Editar
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                onClick={() => handleExcluirUsuario(usuario.id)}
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                ))
            )}

            {modalAberto && editUsuario && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold">Editar Usuário</h2>
                            <button
                                type="button"
                                onClick={fecharModal}
                                className="text-slate-500 hover:text-slate-800"
                            >
                                Fechar
                            </button>
                        </div>
                        <form onSubmit={handleEditarUsuario} className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <input
                                    type="text"
                                    value={editNome}
                                    onChange={(event) => setEditNome(event.target.value)}
                                    placeholder="Nome completo"
                                    className="w-full rounded-lg border border-gray-300 p-3"
                                />
                                <input
                                    type="email"
                                    value={editEmail}
                                    onChange={(event) => setEditEmail(event.target.value)}
                                    placeholder="Email"
                                    className="w-full rounded-lg border border-gray-300 p-3"
                                />
                            </div>
                            <input
                                type="password"
                                value={editSenha}
                                onChange={(event) => setEditSenha(event.target.value)}
                                placeholder="Senha (opcional)"
                                className="w-full rounded-lg border border-gray-300 p-3"
                            />
                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={fecharModal}
                                    className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-100"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                                >
                                    Salvar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
