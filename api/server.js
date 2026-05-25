const express = require('express')
const cors = require('cors')

const api = express()

// Middlewares
api.use(express.json())
api.use(cors())

// Arrays de armazenamento
const dados = []
const iot_data = []
const devices = []

// Contador de ID
let id = 0

// ======================
// ROTAS DE USUÁRIOS
// ======================

api.get('/usuarios', (req, res) => {
    res.status(200).send(dados)
})

// Criar novo usuário
api.post('/usuarios', (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send({
            msg: 'Dados do usuário não enviados'
        })
    }

    const { nome, email, senha } = req.body

    const usuario = {
        id: dados.length + 1,
        nome,
        email,
        senha
    }

    dados.push(usuario)

    return res.status(201).send({
        msg: 'Usuário cadastrado com sucesso!',
        usuario
    })
})

// Atualizar usuário
api.put('/usuarios/:id', (req, res) => {
    const usuarioId = parseInt(req.params.id)
    const { nome, email, senha } = req.body

    const index = dados.findIndex((usuario) => usuario.id === usuarioId)

    if (index === -1) {
        return res.status(404).send({ msg: 'Usuário não encontrado!' })
    }

    dados[index] = {
        ...dados[index],
        nome: nome ?? dados[index].nome,
        email: email ?? dados[index].email,
        senha: senha ?? dados[index].senha
    }

    return res.status(200).send({
        msg: 'Usuário atualizado com sucesso!',
        usuario: dados[index]
    })
})

// Excluir usuário
api.delete('/usuarios/:id', (req, res) => {
    const usuarioId = parseInt(req.params.id)
    const index = dados.findIndex((usuario) => usuario.id === usuarioId)

    if (index === -1) {
        return res.status(404).send({ msg: 'Usuário não encontrado!' })
    }

    dados.splice(index, 1)

    return res.status(200).send({ msg: 'Usuário excluído com sucesso!' })
})

// ======================
// ROTAS DE IOT
// ======================

// Buscar todos os dados IoT
api.get('/iot', (req, res) => {
    res.status(200).send(iot_data)
})

// Buscar sensor por ID
api.get('/sensor/:id', (req, res) => {

    const sensor = iot_data.find(
        item => item.id === parseInt(req.params.id)
    )

    if (!sensor) {
        return res.status(404).send({
            msg: 'Sensor não encontrado!'
        })
    }

    res.status(200).send(sensor)
})

// Cadastrar novos dados IoT
api.post('/newData', (req, res) => {

    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send({
            msg: 'Dados não encontrados'
        })
    }

    const {
        temperatura,
        pressao,
        umidade,
        sensor_presenca,
        trava_seguranca
    } = req.body

    id++

    const newData = {
        id,
        temperatura,
        pressao,
        umidade,
        sensor_presenca,
        trava_seguranca
    }

    iot_data.push(newData)

    return res.status(201).send({
        message: 'Dados recebidos com sucesso!',
        data: newData
    })
})

// Atualizar sensor
api.put('/sensor/:id', (req, res) => {

    const sensorId = parseInt(req.params.id)
    const newBody = req.body

    const index = iot_data.findIndex(
        p => p.id === sensorId
    )

    if (index !== -1) {

        iot_data[index] = {
            id: sensorId,
            ...newBody
        }

        return res.status(200).send({
            msg: 'Dados do sensor atualizados!',
            data: iot_data[index]
        })
    }

    return res.status(404).send({
        msg: 'Sensor não encontrado!'
    })
})

// ======================
// ROTAS DE DEVICES
// ======================

// Buscar devices
api.get('/devices', (req, res) => {
    res.status(200).send(devices)
})

// Cadastrar device
api.post('/devices', (req, res) => {

    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send({
            msg: 'Dados do dispositivo não enviados'
        })
    }

    const device = {
        id: devices.length + 1,
        ...req.body
    }

    devices.push(device)

    return res.status(201).send({
        msg: 'Dispositivo cadastrado!',
        device
    })
})

// Atualizar device
api.put('/devices/:id', (req, res) => {
    const deviceId = parseInt(req.params.id)
    const { name, type, status } = req.body

    const index = devices.findIndex((device) => device.id === deviceId)

    if (index === -1) {
        return res.status(404).send({ msg: 'Dispositivo não encontrado!' })
    }

    devices[index] = {
        ...devices[index],
        name: name ?? devices[index].name,
        type: type ?? devices[index].type,
        status: status ?? devices[index].status
    }

    return res.status(200).send({
        msg: 'Dispositivo atualizado com sucesso!',
        device: devices[index]
    })
})

// Excluir device
api.delete('/devices/:id', (req, res) => {
    const deviceId = parseInt(req.params.id)
    const index = devices.findIndex((device) => device.id === deviceId)

    if (index === -1) {
        return res.status(404).send({ msg: 'Dispositivo não encontrado!' })
    }

    devices.splice(index, 1)

    return res.status(200).send({ msg: 'Dispositivo excluído com sucesso!' })
})

// ======================
// INICIAR SERVIDOR
// ======================

const porta = 8080

api.listen(porta, () => {
    console.log(`API rodando na porta ${porta}`)
})