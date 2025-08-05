
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TrendingUp, Users, Calendar, BarChart3, Download } from "lucide-react";

interface SummaryCardsProps {
  stats: any;
  onDownload?: (format: 'excel' | 'word' | 'text') => void;
}

const SummaryCards = ({ stats, onDownload }: SummaryCardsProps) => {
  if (!stats) return null;

  const summaryItems = [
    {
      title: "Total Opinions",
      value: stats.total || 0,
      icon: Users,
      description: "Total collected opinions"
    },
    {
      title: "Recent Opinions",
      value: stats.recent || 0,
      icon: Calendar,
      description: "Opinions from last 7 days"
    },
    {
      title: "Categories",
      value: Object.keys(stats.byProjectType || {}).length,
      icon: BarChart3,
      description: "Different project types"
    },
    {
      title: "Countries",
      value: Object.keys(stats.byCountry || {}).length,
      icon: TrendingUp,
      description: "Geographic coverage"
    }
  ];

  const handleDownload = (format: 'excel' | 'word' | 'text') => {
    console.log('SummaryCards: Download triggered for format:', format);
    if (onDownload) {
      onDownload(format);
    } else {
      console.warn('SummaryCards: No download handler provided');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Summary Overview</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleDownload('excel')}>
              Export to Excel
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDownload('word')}>
              Export to Word
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDownload('text')}>
              Export to Text
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {item.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{item.value.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default SummaryCards;
