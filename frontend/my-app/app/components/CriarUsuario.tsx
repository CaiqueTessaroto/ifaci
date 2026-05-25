"use client"
import { FormEvent, useState } from "react"

const API_URL = 'http://localhost:8080'

export default function CriarUsuario() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [mensagem, setMensagem] = useState('')
    const [erro, setErro] = useState('')

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setMensagem('')
        setErro('')

        if (!nome || !email || !senha) {
            setErro('Preencha todos os campos')
            return
        }

        try {
            const resposta = await fetch(`${API_URL}/usuarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome, email, senha })
            })

            const data = await resposta.json()

            if (!resposta.ok) {
                setErro(data.msg || 'Erro ao cadastrar usuário')
                return
            }

            setMensagem('Usuário cadastrado com sucesso!')
            setNome('')
            setEmail('')
            setSenha('')
        } catch (error) {
            setErro('Erro de conexão com a API')
            console.error(error)
        }
    }

    return (
        <div className="w-[50vw] flex flex-col gap-4 rounded-xl max-h-fit bg-white text-black p-4">
            <h2 className="text-lg font-semibold">Criar Novo Usuário</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    value={nome}
                    onChange={(event) => setNome(event.target.value)}
                    placeholder="Nome Completo"
                    className="p-4 rounded-lg border border-gray-300"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="email@email.com"
                    className="p-4 rounded-lg border border-gray-300"
                />
                <input
                    type="password"
                    value={senha}
                    onChange={(event) => setSenha(event.target.value)}
                    placeholder="Crie uma senha"
                    className="p-4 rounded-lg border border-gray-300"
                />
                <button
                    type="submit"
                    className="py-2 px-4 text-white rounded-lg hover:bg-red-500 bg-red-400"
                >
                    Enviar
                </button>
            </form>
            {mensagem && <p className="text-green-600">{mensagem}</p>}
            {erro && <p className="text-red-600">{erro}</p>}
        </div>
    )
}