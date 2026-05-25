"use client"
import { FormEvent, useState } from "react"

const API_URL = 'http://localhost:8080'

export default function CriarDispositivo() {
    const [nome, setNome] = useState('')
    const [tipo, setTipo] = useState('')
    const [mensagem, setMensagem] = useState('')
    const [erro, setErro] = useState('')

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setMensagem('')
        setErro('')

        if (!nome || !tipo) {
            setErro('Preencha nome e tipo do dispositivo')
            return
        }

        try {
            const resposta = await fetch(`${API_URL}/devices`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: nome, type: tipo })
            })

            const data = await resposta.json()

            if (!resposta.ok) {
                setErro(data.msg || 'Erro ao cadastrar dispositivo')
                return
            }

            setMensagem('Dispositivo cadastrado com sucesso!')
            setNome('')
            setTipo('')
        } catch (error) {
            setErro('Erro de conexão com a API')
            console.error(error)
        }
    }

    return (
        <div className="w-[50vw] h-fit bg-white rounded-xl text-black p-4 flex flex-col gap-4">
            <h2 className="text-lg font-semibold">Criar Novo Dispositivo</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={nome}
                    onChange={(event) => setNome(event.target.value)}
                    placeholder="Nome do dispositivo"
                    className="p-4 rounded-lg border border-gray-300"
                />
                <input
                    type="text"
                    value={tipo}
                    onChange={(event) => setTipo(event.target.value)}
                    placeholder="Tipo"
                    className="p-4 rounded-lg border border-gray-300"
                />
                <button
                    type="submit"
                    className="py-2 px-4 text-white rounded-lg hover:bg-red-500 bg-red-400"
                >
                    Criar
                </button>
            </form>
            {mensagem && <p className="text-green-600">{mensagem}</p>}
            {erro && <p className="text-red-600">{erro}</p>}
        </div>
    )
}