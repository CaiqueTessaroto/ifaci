'use client'

interface Device {
  id?: number
  name?: string
  status?: string
  [key: string]: any
}

interface DevicesCardProps {
  devices: Device[]
}

export default function DevicesCard({ devices }: DevicesCardProps) {
  return (
    <div className="bg-linear-to-br from-slate-800 to-slate-700 rounded-lg p-6 border border-slate-700/50">
      <h3 className="text-xl font-semibold text-white mb-4">Dispositivos</h3>

      {devices.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <p className="text-sm">Nenhum dispositivo cadastrado</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {devices.map((device, index) => (
            <div
              key={index}
              className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/30 hover:bg-slate-700/70 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">
                    {device.name || `Dispositivo ${device.id || index + 1}`}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    Status: {device.status || 'Ativo'}
                  </p>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-slate-600/30">
        <div className="text-2xl font-bold text-purple-400">{devices.length}</div>
        <p className="text-gray-400 text-xs">Total de dispositivos</p>
      </div>
    </div>
  )
}
