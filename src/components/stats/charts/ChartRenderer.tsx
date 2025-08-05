
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid, Legend } from "recharts";
import AdaptivePieChart from "@/components/AdaptivePieChart";

const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#FF6B6B",
  "#6B8E23", "#4682B4", "#9932CC", "#CD5C5C", "#5599EE", "#C5A800", "#AA88FF"
];

interface ChartRendererProps {
  data: any[];
  chartType: string;
  label: string;
}

const ChartRenderer = ({ data, chartType, label }: ChartRendererProps) => {
  if (!data || !data.length) {
    return (
      <div className="text-center text-muted-foreground italic py-4 text-sm">
        No data available
      </div>
    );
  }

  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
        <XAxis 
          dataKey="name" 
          fontSize={10} 
          interval={0} 
          angle={-45} 
          textAnchor="end"
          height={80}
        />
        <YAxis fontSize={10}/>
        <Tooltip 
          contentStyle={{ fontSize: '12px' }}
          wrapperStyle={{ zIndex: 1000 }}
        />
        <Legend wrapperStyle={{ fontSize: '12px' }} />
        <Bar dataKey="value" fill="#4f46e5">
          {data.map((entry: any, idx: number) => (
            <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );

  const renderPieChart = () => (
    <AdaptivePieChart data={data} height={300} showLegend={true} />
  );

  const renderDataTable = () => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    return (
      <div className="max-h-64 overflow-y-auto overflow-x-auto">
        <table className="w-full text-xs sm:text-sm min-w-full">
          <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0">
            <tr>
              <th className="px-2 sm:px-4 py-2 text-left font-medium">{label}</th>
              <th className="px-2 sm:px-4 py-2 text-right font-medium">Count</th>
              <th className="px-2 sm:px-4 py-2 text-right font-medium">%</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx} className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-2 sm:px-4 py-2 break-words">{item.name}</td>
                <td className="px-2 sm:px-4 py-2 text-right">{item.value}</td>
                <td className="px-2 sm:px-4 py-2 text-right">{((item.value / total) * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  switch (chartType) {
    case 'pie':
      return renderPieChart();
    case 'table':
      return renderDataTable();
    default:
      return renderBarChart();
  }
};

export default ChartRenderer;
