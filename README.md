# IFACI

Sistema integrado para monitoramento e automação IoT utilizando API, dashboard web e fluxos de integração com Node-RED.

## 📖 Sobre o Projeto

O **IFACI** é um projeto voltado para integração entre dispositivos IoT, APIs e interfaces web, permitindo a coleta, gerenciamento e visualização de dados em tempo real.

A aplicação foi estruturada em três módulos principais:

* **API Backend** responsável pelo gerenciamento dos dados e comunicação entre os serviços.
* **Frontend Web** para visualização das informações e interação com os dispositivos.
* **Node-RED** para automação de fluxos, integração entre sensores/dispositivos e processamento de eventos.

O objetivo do projeto é criar uma arquitetura simples, escalável e prática para aplicações de Internet das Coisas (IoT), podendo ser utilizada em ambientes acadêmicos, industriais ou comerciais.

---

# 🏗️ Arquitetura do Projeto

```text
┌──────────────┐
│ Dispositivos │
│     IoT      │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Node-RED    │
│ Automação e  │
│ Integrações  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ API Backend  │
│  Node.js +   │
│   Express    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Frontend    │
│ Dashboard UI │
└──────────────┘
```

---

# ⚙️ Tecnologias Utilizadas

## Backend

* **Node.js**
* **Express.js**
* **CORS**
* **JavaScript**

O backend atua como uma camada de comunicação entre os dispositivos IoT e a interface do sistema.

## Frontend

* **TypeScript**
* **JavaScript**
* **CSS**

A interface web foi desenvolvida para exibir informações em tempo real e facilitar a interação do usuário com os dados coletados.

## Integração IoT

* **Node-RED**

O Node-RED é utilizado para:

* Criação de fluxos automatizados
* Integração entre sensores e APIs
* Processamento de eventos em tempo real
* Automação de tarefas IoT

---

# 📂 Estrutura do Projeto

```text
ifaci/
├── api/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   └── my-app/
│
├── node-red/
│
├── iniciar.bat
└── .gitignore
```

---

# 🚀 Funcionalidades

* Comunicação entre dispositivos IoT e API
* Visualização de dados em interface web
* Integração com Node-RED
* Processamento de eventos em tempo real
* Estrutura modular para expansão futura
* Backend REST para gerenciamento dos dados

---

# 🧠 Possíveis Aplicações

O projeto pode ser utilizado em diferentes contextos de IoT e automação:

## 🏭 Indústria 4.0

* Monitoramento de máquinas
* Controle de produção
* Coleta de dados industriais
* Alertas automatizados

## 🏠 Automação Residencial

* Controle de iluminação
* Monitoramento de temperatura
* Integração com sensores domésticos
* Acionamento automático de dispositivos

## 🚗 Mobilidade e Logística

* Rastreamento de ativos
* Monitoramento de veículos
* Controle de sensores embarcados

## 🌱 Agricultura Inteligente

* Sensoriamento de solo
* Monitoramento climático
* Irrigação automatizada

## 🏫 Projetos Educacionais

* Ensino de IoT
* Estudos de integração entre APIs e sensores
* Desenvolvimento de dashboards em tempo real

---

# 🛠️ Como Executar o Projeto

## Pré-requisitos

Instale as seguintes ferramentas:

* Node.js
* NPM
* Node-RED

---

## Backend

Acesse a pasta da API:

```bash
cd api
```

Instale as dependências:

```bash
npm install
```

Execute o servidor:

```bash
node server.js
```

---

## Frontend

Acesse a pasta do frontend:

```bash
cd frontend/my-app
```

Instale as dependências:

```bash
npm install
```

Inicie a aplicação:

```bash
npm start
```

---

## Node-RED

Execute o Node-RED:

```bash
node-red
```

Depois acesse:

```text
http://localhost:1880
```

---

# 📡 Integração IoT

A arquitetura do projeto permite integrar:

* Sensores
* Microcontroladores
* APIs externas
* MQTT
* Dispositivos inteligentes

Isso possibilita a criação de sistemas distribuídos e aplicações em tempo real.

---

# 🔒 Escalabilidade

O projeto foi organizado de forma modular para facilitar:

* Expansão do backend
* Criação de novos dashboards
* Integração com bancos de dados
* Adição de autenticação
* Deploy em nuvem
* Integração com serviços externos

---

# 📈 Melhorias Futuras

* Integração com banco de dados
* Autenticação JWT
* Dashboard analítico
* Comunicação MQTT
* Deploy em Docker
* Integração com AWS IoT
* Sistema de alertas em tempo real
* Monitoramento com gráficos e métricas

---

# 👨‍💻 Autor

Projeto desenvolvido por:

* Caique Leandro Tessaroto

---

# 📄 Licença

Este projeto está disponível para fins educacionais e de estudo.

---
