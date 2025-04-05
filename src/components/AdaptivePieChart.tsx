import { useState, useEffect, useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector, Legend, Tooltip } from "recharts";
import { motion } from "framer-motion";

interface DataItem {
  name: string;
  value: number;
}

interface AdaptivePieChartProps {
  data: DataItem[];
  title: string;
  colors?: string[];
  className?: string;
}

const AdaptivePieChart = ({ data, title, colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#8D6E63', '#26A69A', '#7986CB', '#D4E157'], className }: AdaptivePieChartProps) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [chartHeight, setChartHeight] = useState(400);
  
  // Filter out very small values that would cause label overlap issues
  const filteredData = useMemo(() => {
    // Get total value
    const total = data.reduce((acc, item) => acc + item.value, 0);
    
    // Keep only items that are at least 2% of the total, to avoid cluttering
    // Group the rest into "Others" category
    if (total > 0) {
      const threshold = total * 0.02;
      const mainItems = data.filter(item => item.value >= threshold);
      const smallItems = data.filter(item => item.value < threshold);
      
      if (smallItems.length > 0) {
        const othersValue = smallItems.reduce((acc, item) => acc + item.value, 0);
        return [
          ...mainItems,
          { name: `Others (${smallItems.length} categories)`, value: othersValue }
        ];
      }
      
      return mainItems;
    }
    
    return data;
  }, [data]);
  
  useEffect(() => {
    // Adjust chart height based on data size
    const baseHeight = 400;
    const itemCount = filteredData.length;
    setChartHeight(Math.max(baseHeight, baseHeight + (itemCount - 8) * 20));
  }, [filteredData]);
  
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };
  
  const onPieLeave = () => {
    setActiveIndex(-1);
  };
  
  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    
    return (
      <g>
        <text x={cx} y={cy - 10} dy={8} textAnchor="middle" fill="#333" className="text-xs font-medium dark:fill-white">
          {payload.name}
        </text>
        <text x={cx} y={cy + 10} dy={8} textAnchor="middle" fill="#999" className="text-xs dark:fill-gray-300">
          {`${value} (${(percent * 100).toFixed(1)}%)`}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 8}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          opacity={0.8}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
      </g>
    );
  };
  
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
    // Only show labels for segments that are large enough
    if (percent < 0.05) return null;
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 1.1;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return (
      <text
        x={x}
        y={y}
        fill="#666"
        className="text-xs dark:fill-gray-300"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${name} (${(percent * 100).toFixed(0)}%)`}
      </text>
    );
  };
  
  // Custom legend that handles long lists better
  const renderLegend = (props: any) => {
    const { payload } = props;
    
    // If there are too many items, use a compact grid layout
    const compact = payload.length > 8;
    
    return (
      <div className={`flex ${compact ? 'flex-wrap justify-center gap-2' : 'flex-col items-start gap-1'} mt-4 text-xs`}>
        {payload.map((entry: any, index: number) => (
          <div key={`legend-${index}`} className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: entry.color }}
            />
            <span className="dark:text-white">
              {compact 
                ? `${entry.value.length > 20 ? entry.value.substring(0, 20) + '...' : entry.value}`
                : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };
  
  if (filteredData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-80 bg-white/50 dark:bg-gray-800/30 rounded-lg p-6">
        <p className="text-gray-500 dark:text-gray-400">No data available</p>
      </div>
    );
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white/50 dark:bg-gray-800/30 rounded-lg p-6 ${className}`}
    >
      <h3 className="text-lg font-medium mb-4 text-center text-gray-900 dark:text-white">{title}</h3>
      
      <ResponsiveContainer width="100%" height={chartHeight}>
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={filteredData}
            cx="50%"
            cy="50%"
            labelLine={filteredData.length < 15}
            label={filteredData.length < 15 ? renderCustomizedLabel : false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
          >
            {filteredData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value} votes`, '']} />
          <Legend content={renderLegend} />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default AdaptivePieChart;
