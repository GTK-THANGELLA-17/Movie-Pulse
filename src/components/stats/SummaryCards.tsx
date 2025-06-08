
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SummaryCardsProps {
  stats: {
    total: number;
    recent: number;
    byProjectType: Record<string, number>;
    byCountry: Record<string, number>;
    byGenre: Record<string, number>;
  };
}

const SummaryCards = ({ stats }: SummaryCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Opinions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <Badge variant="secondary" className="mt-1">
            {stats.recent} this week
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Project Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{Object.keys(stats.byProjectType).length}</div>
          <p className="text-xs text-muted-foreground mt-1">Categories covered</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Countries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{Object.keys(stats.byCountry).length}</div>
          <p className="text-xs text-muted-foreground mt-1">Global reach</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Genres</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{Object.keys(stats.byGenre).length}</div>
          <p className="text-xs text-muted-foreground mt-1">Popular preferences</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCards;
