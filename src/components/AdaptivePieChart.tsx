
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

  // Responsive sizing based on screen width
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const chartHeight = isMobile ? Math.min(height, 250) : height;
  const outerRadius = isMobile ? Math.min(chartHeight * 0.3, 80) : Math.min(height * 0.35, 120);

  // Custom label function for better readability on mobile
  const renderLabel = (entry: any) => {
    if (isMobile && entry.percentage < 8) return ''; // Hide smaller labels on mobile
    if (!isMobile && entry.percentage < 5) return ''; // Hide labels for small slices on desktop
    return isMobile ? `${entry.percentage.toFixed(0)}%` : `${entry.percentage.toFixed(1)}%`;
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 md:p-3 border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 text-xs md:text-sm">
          <p className="font-medium text-gray-900 dark:text-white truncate max-w-[150px] md:max-w-none">{data.name}</p>
          <p className="text-gray-600 dark:text-gray-300">
            Count: <span className="font-medium">{data.value}</span>
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Percentage: <span className="font-medium">{data.percentage.toFixed(1)}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  if (!data.length) {
    return (
      <div className="flex items-center justify-center" style={{ height: chartHeight }}>
        <p className="text-muted-foreground text-sm">No data available</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={chartHeight}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderLabel}
            outerRadius={outerRadius}
            fill="#8884d8"
            dataKey="value"
            fontSize={isMobile ? 10 : 12}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          {showLegend && (
            <Legend 
              verticalAlign="bottom" 
              height={isMobile ? 60 : 36}
              wrapperStyle={{
                fontSize: isMobile ? '10px' : '12px',
                paddingTop: '10px'
              }}
              formatter={(value) => (
                <span className="text-xs md:text-sm text-gray-700 dark:text-gray-300">
                  {isMobile && value.length > 15 ? `${value.substring(0, 12)}...` : value}
                </span>
              )}
              layout={isMobile ? 'horizontal' : 'horizontal'}
              align="center"
            />
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdaptivePieChart;
