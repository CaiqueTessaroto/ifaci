'use client'

interface DashboardStatsProps {
  iotDataCount: number
  devicesCount: number
  usuariosCount: number
}

export default function DashboardStats({
  iotDataCount,
  devicesCount,
  usuariosCount,
}: DashboardStatsProps) {
  const stats = [
    {
      label: 'Leituras IoT',
      value: iotDataCount,
      icon: '📊',
      color: 'from-blue-600 to-blue-400',
    },
    {
      label: 'Dispositivos',
      value: devicesCount,
      icon: '🖥️',
      color: 'from-purple-600 to-purple-400',
    },
    {
      label: 'Usuários',
      value: usuariosCount,
      icon: '👥',
      color: 'from-green-600 to-green-400',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`bg-linear-to-br ${stat.color} rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition-shadow`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-100 text-sm font-medium">{stat.label}</p>
              <p className="text-4xl font-bold mt-2">{stat.value}</p>
            </div>
            <div className="text-5xl opacity-20">{stat.icon}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
