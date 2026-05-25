'use client'

interface IoTData {
  id: number
  temperatura?: number
  pressao?: number
  umidade?: number
  sensor_presenca?: boolean
  trava_seguranca?: boolean
}

interface IoTDataTableProps {
  data: IoTData[]
  onRefresh: () => void
}

export default function IoTDataTable({ data, onRefresh }: IoTDataTableProps) {
  const getStatusColor = (value: boolean | undefined) => {
    return value ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
  }

  const getStatusText = (value: boolean | undefined) => {
    return value ? 'Ativo' : 'Inativo'
  }

  return (
    <div className="bg-linear-to-br from-slate-800 to-slate-700 rounded-lg border border-slate-700/50 overflow-hidden">
      <div className="p-6 border-b border-slate-700/50 flex justify-between items-center">
        <h3 className="text-xl font-semibold text-white">Dados dos Sensores</h3>
        <button
          onClick={onRefresh}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          🔄 Atualizar
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-900/50">
            <tr className="border-b border-slate-700/50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Temperatura</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Pressão</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Umidade</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Presença</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Trava</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                  Nenhum dado disponível
                </td>
              </tr>
            ) : (
              data.slice(-10).reverse().map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-700/30 hover:bg-slate-700/30 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-white font-medium">#{item.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {item.temperatura !== undefined ? `${item.temperatura.toFixed(2)}°C` : '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {item.pressao !== undefined ? `${item.pressao.toFixed(2)} hPa` : '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {item.umidade !== undefined ? `${item.umidade.toFixed(2)}%` : '-'}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        item.sensor_presenca
                      )}`}
                    >
                      {getStatusText(item.sensor_presenca)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        item.trava_seguranca
                      )}`}
                    >
                      {getStatusText(item.trava_seguranca)}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
