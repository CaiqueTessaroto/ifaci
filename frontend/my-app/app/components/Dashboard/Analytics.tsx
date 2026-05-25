'use client'

interface IoTData {
  id: number
  temperatura?: number
  pressao?: number
  umidade?: number
  sensor_presenca?: boolean
  trava_seguranca?: boolean
}

interface AnalyticsProps {
  data: IoTData[]
}

export default function Analytics({ data }: AnalyticsProps) {
  const getStats = () => {
    const temps = data
      .map((item) => item.temperatura)
      .filter((v) => typeof v === 'number') as number[]
    const pressures = data
      .map((item) => item.pressao)
      .filter((v) => typeof v === 'number') as number[]
    const humidity = data
      .map((item) => item.umidade)
      .filter((v) => typeof v === 'number') as number[]

    const presenceCount = data.filter((item) => item.sensor_presenca).length
    const lockCount = data.filter((item) => item.trava_seguranca).length

    return {
      tempMax: temps.length > 0 ? Math.max(...temps).toFixed(2) : 'N/A',
      tempMin: temps.length > 0 ? Math.min(...temps).toFixed(2) : 'N/A',
      presencePercentage: data.length > 0 ? ((presenceCount / data.length) * 100).toFixed(1) : '0',
      lockPercentage: data.length > 0 ? ((lockCount / data.length) * 100).toFixed(1) : '0',
    }
  }

  const stats = getStats()

  return (
    <div className="bg-linear-to-br from-slate-800 to-slate-700 rounded-lg border border-slate-700/50 p-6">
      <h3 className="text-xl font-semibold text-white mb-6">Análise e Estatísticas</h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/30">
          <p className="text-gray-400 text-sm mb-2">Temperatura Máxima</p>
          <p className="text-2xl font-bold text-red-400">{stats.tempMax}°C</p>
        </div>

        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/30">
          <p className="text-gray-400 text-sm mb-2">Temperatura Mínima</p>
          <p className="text-2xl font-bold text-blue-400">{stats.tempMin}°C</p>
        </div>

        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/30">
          <p className="text-gray-400 text-sm mb-2">Presença Detectada</p>
          <p className="text-2xl font-bold text-green-400">{stats.presencePercentage}%</p>
        </div>

        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/30">
          <p className="text-gray-400 text-sm mb-2">Trava Ativa</p>
          <p className="text-2xl font-bold text-yellow-400">{stats.lockPercentage}%</p>
        </div>
      </div>
    </div>
  )
}
