
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export interface AdaptivePieChartProps {
  data: Array<{ name: string; value: number; percentage?: number }>;
  height?: number;
  showLegend?: boolean;
}

const COLORS = [
  '#5b2333', '#983b55', '#ff719A', '#00b2ff', '#ff5e5e', 
  '#4ade80', '#f59e0b', '#8b5cf6', '#06b6d4', '#ef4444',
  '#84cc16', '#f97316', '#a855f7', '#0ea5e9', '#dc2626'
];

const AdaptivePieChart = ({ data, height = 300, showLegend = true }: AdaptivePieChartProps) => {
  // Calculate percentages if not provided
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const chartData = data.map((item, index) => ({
    ...item,
    percentage: total > 0 ? ((item.value / total) * 100) : 0,
    fill: COLORS[index % COLORS.length]
  }));

  // Custom label function for better readability
  const renderLabel = (entry: any) => {
    if (entry.percentage < 5) return ''; // Hide labels for small slices
    return `${entry.percentage.toFixed(1)}%`;
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <p className="font-medium text-gray-900 dark:text-white">{data.name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Count: <span className="font-medium">{data.value}</span>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Percentage: <span className="font-medium">{data.percentage.toFixed(1)}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  if (!data.length) {
    return (
      <div className="flex items-center justify-center" style={{ height }}>
        <p className="text-muted-foreground">No data available</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderLabel}
          outerRadius={Math.min(height * 0.35, 120)}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        {showLegend && (
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value) => (
              <span className="text-sm text-gray-700 dark:text-gray-300">{value}</span>
            )}
          />
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default AdaptivePieChart;
