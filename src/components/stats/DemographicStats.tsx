
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface DemographicStatsProps {
  demographics: {
    gender: Record<string, number>;
    age: Record<string, number>;
    region: Record<string, number>;
  };
}

const DemographicStats = ({ demographics }: DemographicStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Gender Distribution</CardTitle>
          <CardDescription>Voter demographics by gender</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(demographics.gender).map(([gender, count]) => (
              <div key={gender} className="flex justify-between items-center">
                <span className="text-sm capitalize">{gender.replace('-', ' ')}</span>
                <Badge variant="outline">{count as number}</Badge>
              </div>
            ))}
            {Object.keys(demographics.gender).length === 0 && (
              <p className="text-sm text-muted-foreground">No gender data available</p>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Age Groups</CardTitle>
          <CardDescription>Voter demographics by age</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(demographics.age).map(([age, count]) => (
              <div key={age} className="flex justify-between items-center">
                <span className="text-sm">{age} years</span>
                <Badge variant="outline">{count as number}</Badge>
              </div>
            ))}
            {Object.keys(demographics.age).length === 0 && (
              <p className="text-sm text-muted-foreground">No age data available</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Regional Distribution</CardTitle>
          <CardDescription>Voter demographics by region</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(demographics.region).map(([region, count]) => (
              <div key={region} className="flex justify-between items-center">
                <span className="text-sm">{region}</span>
                <Badge variant="outline">{count as number}</Badge>
              </div>
            ))}
            {Object.keys(demographics.region).length === 0 && (
              <p className="text-sm text-muted-foreground">No regional data available</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DemographicStats;
