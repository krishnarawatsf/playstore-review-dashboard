import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface StatsChartsProps {
  sentimentData: {
    name: string;
    value: number;
    color: string;
  }[];
  reasonsData: {
    reason: string;
    count: number;
  }[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="text-sm font-semibold text-gray-900">{payload[0].name}</p>
        <p className="text-sm text-gray-600">Count: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export function StatsCharts({ sentimentData, reasonsData }: StatsChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Sentiment Distribution Pie Chart */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Sentiment Distribution</h3>
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={sentimentData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              strokeWidth={2}
              stroke="#fff"
            >
              {sentimentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-6 mt-4">
          {sentimentData.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm font-medium text-gray-700">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Reasons Bar Chart */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Top Review Reasons</h3>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={reasonsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="reason" 
              tick={{ fill: '#6B7280', fontSize: 12 }}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <YAxis 
              tick={{ fill: '#6B7280', fontSize: 12 }}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="count" 
              fill="#6366F1" 
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
