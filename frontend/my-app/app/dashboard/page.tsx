'use client'

import { useState, useEffect } from 'react'
import DashboardStats from '@/app/components/Dashboard/DashboardStats'
import IoTDataTable from '@/app/components/Dashboard/IoTDataTable'
import DevicesCard from '@/app/components/Dashboard/DevicesCard'
import SensorChart from '@/app/components/Dashboard/SensorChart'
import Analytics from '@/app/components/Dashboard/Analytics'

const API_URL = 'http://localhost:8080'

export default function DashboardPage() {
  const [iotData, setIotData] = useState([])
  const [devices, setDevices] = useState([])
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 5000) // Atualiza a cada 5 segundos
    return () => clearInterval(interval)
  }, [])

  const fetchData = async () => {
    try {
      const [iotRes, devicesRes, usuariosRes] = await Promise.all([
        fetch(`${API_URL}/iot`),
        fetch(`${API_URL}/devices`),
        fetch(`${API_URL}/usuarios`),
      ])

      if (iotRes.ok) setIotData(await iotRes.json())
      if (devicesRes.ok) setDevices(await devicesRes.json())
      if (usuariosRes.ok) setUsuarios(await usuariosRes.json())
      setError(null)
    } catch (err) {
      setError('Erro ao carregar dados da API')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading && iotData.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-300">Carregando dados...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard IoT</h1>
          <p className="text-gray-400">Monitoramento em tempo real de sensores e dispositivos</p>
          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
              {error}
            </div>
          )}
        </div>

        {/* Statistics */}
        <DashboardStats 
          iotDataCount={iotData.length} 
          devicesCount={devices.length}
          usuariosCount={usuarios.length}
        />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Left column - Charts and Data */}
          <div className="lg:col-span-2 space-y-8">
            {/* Sensor Chart */}
            <SensorChart data={iotData} />

            {/* IoT Data Table */}
            <IoTDataTable data={iotData} onRefresh={fetchData} />
          </div>

          {/* Right column - Devices and Info */}
          <div className="space-y-8">
            <DevicesCard devices={devices} />
            
            <Analytics data={iotData} />
            
            {/* Usuários Summary */}
            <div className="bg-linear-to-br from-slate-800 to-slate-700 rounded-lg p-6 border border-slate-700/50">
              <h3 className="text-xl font-semibold text-white mb-4">Usuários Cadastrados</h3>
              <div className="text-3xl font-bold text-green-400 mb-2">{usuarios.length}</div>
              <p className="text-gray-400 text-sm">Total de usuários no sistema</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
