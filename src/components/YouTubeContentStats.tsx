
import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { 
  YOUTUBE_CONTENT_CATEGORIES, 
  YOUTUBE_CHANNEL_TYPES,
  getFilteredVoteStats,
  COUNTRIES
} from "@/lib/data";
import { YouTubeContentCategory, YouTubeChannelType, Country } from "@/lib/types";

interface YouTubeContentStatsProps {
  className?: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF6B6B', '#4ECDC4', '#45B7D1'];

const YouTubeContentStats = ({ className }: YouTubeContentStatsProps) => {
  const [selectedCountry, setSelectedCountry] = useState<Country | 'all'>('all');
  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [selectedAge, setSelectedAge] = useState<string>('all');
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    updateStats();
  }, [selectedCountry, selectedGender, selectedAge]);

  const updateStats = () => {
    const filters: any = {
      projectType: 'YouTubeContent' as const
    };
    
    if (selectedCountry !== 'all') {
      filters.country = selectedCountry;
    }
    
    if (selectedGender !== 'all') {
      filters.gender = selectedGender;
    }
    
    if (selectedAge !== 'all') {
      filters.ageGroup = selectedAge;
    }

    const filteredStats = getFilteredVoteStats(filters);
    setStats(filteredStats);
  };

  if (!stats) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>YouTube Content Statistics</CardTitle>
          <CardDescription>Loading YouTube content preferences...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const categoryData = Object.entries(stats.byYoutubeCategory)
    .sort(([,a], [,b]) => (b as number) - (a as number))
    .slice(0, 20)
    .map(([category, count]) => ({
      name: category,
      value: count as number
    }));

  const totalVotes = categoryData.reduce((sum, item) => sum + item.value, 0);

  if (totalVotes === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>YouTube Content Statistics</CardTitle>
          <CardDescription>
            No YouTube content votes have been cast yet with the selected filters.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Be the first to vote for YouTube content preferences!
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={className}>
      {/* Filter Controls */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filter YouTube Content Statistics</CardTitle>
          <CardDescription>Apply filters to see specific YouTube content preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="country-filter">Country</Label>
              <Select 
                value={selectedCountry} 
                onValueChange={(value: string) => setSelectedCountry(value as Country | 'all')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Countries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  {COUNTRIES.map(country => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="gender-filter">Gender</Label>
              <Select value={selectedGender} onValueChange={setSelectedGender}>
                <SelectTrigger>
                  <SelectValue placeholder="All Genders" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genders</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="non-binary">Non-binary</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="age-filter">Age Group</Label>
              <Select value={selectedAge} onValueChange={setSelectedAge}>
                <SelectTrigger>
                  <SelectValue placeholder="All Ages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ages</SelectItem>
                  <SelectItem value="13-17">13-17</SelectItem>
                  <SelectItem value="18-24">18-24</SelectItem>
                  <SelectItem value="25-34">25-34</SelectItem>
                  <SelectItem value="35-44">35-44</SelectItem>
                  <SelectItem value="45-54">45-54</SelectItem>
                  <SelectItem value="55-64">55-64</SelectItem>
                  <SelectItem value="65+">65+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <Badge variant="outline">Total Votes: {totalVotes}</Badge>
            <Badge variant="outline">Categories: {categoryData.length}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Top Categories Chart */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Top YouTube Content Categories</CardTitle>
          <CardDescription>
            Most popular YouTube content categories based on your filters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8">
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Category Distribution</CardTitle>
          <CardDescription>Percentage breakdown of YouTube content preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={categoryData.slice(0, 10)}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.slice(0, 10).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default YouTubeContentStats;
