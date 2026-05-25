"use client"
import { FormEvent, useEffect, useState } from "react"

const API_URL = 'http://localhost:8080'

interface Device {
    id: number
    name?: string
    type?: string
    status?: string
}

export default function ListarDispositivos() {
    const [devices, setDevices] = useState<Device[]>([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState('')
    const [modalAberto, setModalAberto] = useState(false)
    const [editDevice, setEditDevice] = useState<Device | null>(null)
    const [editName, setEditName] = useState('')
    const [editType, setEditType] = useState('')
    const [editStatus, setEditStatus] = useState('')
    const [actionErro, setActionErro] = useState('')
    const [actionMensagem, setActionMensagem] = useState('')

    const buscarDevices = async () => {
        setCarregando(true)
        setErro('')
        setActionMensagem('')
        setActionErro('')

        try {
            const resposta = await fetch(`${API_URL}/devices`)
            const data = await resposta.json()

            if (!resposta.ok) {
                setErro('Erro ao carregar dispositivos')
                return
            }

            setDevices(data)
        } catch (error) {
            setErro('Erro de conexão com a API')
            console.error(error)
        } finally {
            setCarregando(false)
        }
    }

    const abrirEdicao = (device: Device) => {
        setEditDevice(device)
        setEditName(device.name || '')
        setEditType(device.type || '')
        setEditStatus(device.status || 'Ativo')
        setActionErro('')
        setActionMensagem('')
        setModalAberto(true)
    }

    const fecharModal = () => {
        setModalAberto(false)
        setEditDevice(null)
        setEditName('')
        setEditType('')
        setEditStatus('')
        setActionErro('')
        setActionMensagem('')
    }

    const handleEditarDevice = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!editDevice) return

        setActionErro('')
        setActionMensagem('')

        try {
            const resposta = await fetch(`${API_URL}/devices/${editDevice.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: editName, type: editType, status: editStatus })
            })

            const data = await resposta.json()
            if (!resposta.ok) {
                setActionErro(data.msg || 'Erro ao atualizar dispositivo')
                return
            }

            setActionMensagem('Dispositivo atualizado com sucesso!')
            buscarDevices()
            fecharModal()
        } catch (error) {
            setActionErro('Erro de conexão com a API')
            console.error(error)
        }
    }

    const handleExcluirDevice = async (id: number) => {
        if (!confirm('Deseja excluir este dispositivo?')) {
            return
        }

        setActionErro('')
        setActionMensagem('')

        try {
            const resposta = await fetch(`${API_URL}/devices/${id}`, {
                method: 'DELETE'
            })
            const data = await resposta.json()

            if (!resposta.ok) {
                setActionErro(data.msg || 'Erro ao excluir dispositivo')
                return
            }

            setActionMensagem('Dispositivo excluído com sucesso!')
            buscarDevices()
        } catch (error) {
            setActionErro('Erro de conexão com a API')
            console.error(error)
        }
    }

    useEffect(() => {
        buscarDevices()
    }, [])

    return (
        <div className="w-[50vw] max-h-[88vh] overflow-y-auto bg-white text-black rounded-xl flex flex-col gap-4 p-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Lista de Dispositivos</h2>
                <button
                    onClick={buscarDevices}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Atualizar
                </button>
            </div>

            {actionMensagem && <p className="text-green-600">{actionMensagem}</p>}
            {actionErro && <p className="text-red-600">{actionErro}</p>}

            {carregando ? (
                <p>Carregando dispositivos...</p>
            ) : erro ? (
                <p className="text-red-600">{erro}</p>
            ) : devices.length === 0 ? (
                <p>Nenhum dispositivo cadastrado.</p>
            ) : (
                devices.map((device) => (
                    <div key={device.id} className="bg-gray-100 border border-gray-300 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                            <div>
                                <p className="text-lg font-semibold">{device.name || `Dispositivo ${device.id}`}</p>
                                <p className="text-sm text-gray-600">Tipo: {device.type || 'n/d'}</p>
                            </div>
                            <span className="text-sm text-slate-500">ID {device.id}</span>
                        </div>
                        <div className="flex gap-4 text-sm text-slate-700 mb-4">
                            <p>Status: {device.status || 'Ativo'}</p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                                onClick={() => abrirEdicao(device)}
                            >
                                Editar
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                onClick={() => handleExcluirDevice(device.id)}
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                ))
            )}

            {modalAberto && editDevice && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold">Editar Dispositivo</h2>
                            <button
                                type="button"
                                onClick={fecharModal}
                                className="text-slate-500 hover:text-slate-800"
                            >
                                Fechar
                            </button>
                        </div>
                        <form onSubmit={handleEditarDevice} className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={(event) => setEditName(event.target.value)}
                                    placeholder="Nome do dispositivo"
                                    className="w-full rounded-lg border border-gray-300 p-3"
                                />
                                <input
                                    type="text"
                                    value={editType}
                                    onChange={(event) => setEditType(event.target.value)}
                                    placeholder="Tipo"
                                    className="w-full rounded-lg border border-gray-300 p-3"
                                />
                            </div>
                            <select
                                value={editStatus}
                                onChange={(event) => setEditStatus(event.target.value)}
                                className="w-full rounded-lg border border-gray-300 p-3"
                            >
                                <option value="Ativo">Ativo</option>
                                <option value="Inativo">Inativo</option>
                            </select>
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
