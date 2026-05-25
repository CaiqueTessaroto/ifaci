'use client'

interface IoTData {
  id: number
  temperatura?: number
  pressao?: number
  umidade?: number
  sensor_presenca?: boolean
  trava_seguranca?: boolean
}

interface SensorChartProps {
  data: IoTData[]
}

export default function SensorChart({ data }: SensorChartProps) {
  const getLatestValue = (key: keyof IoTData) => {
    if (data.length === 0) return null
    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i][key] !== undefined) {
        return data[i][key]
      }
    }
    return null
  }

  const getAverageValue = (key: keyof IoTData) => {
    const values = data
      .map((item) => item[key])
      .filter((val) => typeof val === 'number') as number[]

    if (values.length === 0) return null
    return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2)
  }

  const temperatura = getLatestValue('temperatura') as number | null
  const pressao = getLatestValue('pressao') as number | null
  const umidade = getLatestValue('umidade') as number | null

  const tempMedia = getAverageValue('temperatura')
  const pressaoMedia = getAverageValue('pressao')
  const umidadeMedia = getAverageValue('umidade')

  const renderChart = (title: string, value: number | null, unit: string, average: string | null, icon: string) => (
    <div className="bg-slate-700/50 rounded-lg p-6 border border-slate-600/30">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-gray-300 font-medium">{title}</h4>
        <span className="text-2xl">{icon}</span>
      </div>

      <div className="mb-6">
        <div className="text-4xl font-bold text-blue-400 mb-2">
          {value !== null ? `${value.toFixed(2)}${unit}` : 'N/A'}
        </div>
        <div className="w-full bg-slate-600/30 rounded-full h-2">
          <div
            className="bg-linear-to-r from-blue-600 to-blue-400 h-2 rounded-full transition-all"
            style={{
              width: `${
                value !== null
                  ? Math.min(100, Math.max(0, (value / (title.includes('Temperatura') ? 50 : title.includes('Pressão') ? 1100 : 100)) * 100))
                  : 0
              }%`,
            }}
          ></div>
        </div>
      </div>

      {average !== null && (
        <div className="pt-4 border-t border-slate-600/30">
          <p className="text-gray-400 text-xs mb-1">Média</p>
          <p className="text-lg font-semibold text-gray-300">{average}{unit}</p>
        </div>
      )}
    </div>
  )

  return (
    <div className="bg-linear-to-br from-slate-800 to-slate-700 rounded-lg border border-slate-700/50 overflow-hidden">
      <div className="p-6 border-b border-slate-700/50">
        <h3 className="text-xl font-semibold text-white">Monitoramento de Sensores</h3>
        <p className="text-gray-400 text-sm mt-1">
          {data.length} leitura{data.length !== 1 ? 's' : ''} no total
        </p>
      </div>

      <div className="p-6 grid grid-cols-3 gap-4">
        {renderChart('Temperatura', temperatura, '°C', tempMedia, '🌡️')}
        {renderChart('Pressão', pressao, ' hPa', pressaoMedia, '📈')}
        {renderChart('Umidade', umidade, '%', umidadeMedia, '💧')}
      </div>
    </div>
  )
}
