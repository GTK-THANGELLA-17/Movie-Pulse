
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, PieChart, Table, Filter } from "lucide-react";

interface ChartControlsProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  chartType: string;
  onChartTypeChange: (type: string) => void;
}

const ChartControls = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange,
  chartType,
  onChartTypeChange
}: ChartControlsProps) => {
  return (
    <div className="space-y-4">
      {/* Category Filter */}
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4" />
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Chart Type Selector */}
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={chartType === 'bar' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => onChartTypeChange('bar')}
          className="flex items-center gap-2 text-xs sm:text-sm"
        >
          <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Bar Chart</span>
          <span className="sm:hidden">Bar</span>
        </Button>
        <Button 
          variant={chartType === 'pie' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => onChartTypeChange('pie')}
          className="flex items-center gap-2 text-xs sm:text-sm"
        >
          <PieChart className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Pie Chart</span>
          <span className="sm:hidden">Pie</span>
        </Button>
        <Button 
          variant={chartType === 'table' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => onChartTypeChange('table')}
          className="flex items-center gap-2 text-xs sm:text-sm"
        >
          <Table className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Data Table</span>
          <span className="sm:hidden">Table</span>
        </Button>
      </div>
    </div>
  );
};

export default ChartControls;
