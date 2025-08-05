
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tv, TrendingUp, Globe, Users, Download, FileSpreadsheet, FileText, MessageSquare } from "lucide-react";
import AdaptivePieChart from "./AdaptivePieChart";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { COUNTRIES, TELEVISION_CHANNELS_BY_COUNTRY } from "@/lib/data";
import { Country, TelevisionChannel } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";
import * as XLSX from 'xlsx';

interface TelevisionStatsData {
  channelStats: Array<{ _id: string; count: number }>;
  contentTypeStats: Array<{ _id: string; count: number }>;
  countryStats: Array<{ _id: string; count: number }>;
  channelContentCorrelation: Array<{ _id: { channel: string; contentType: string }; count: number }>;
  channelsByCountry: Array<{ _id: { country: string; channel: string }; count: number }>;
}

interface TelevisionNote {
  id: string;
  country: string;
  televisionChannel: string;
  televisionContentType: string;
  notes: string;
  timestamp: string;
  age?: string;
  gender?: string;
}

const fetchTelevisionStats = async (gender?: string, age?: string, country?: string, channel?: string): Promise<TelevisionStatsData> => {
  try {
    const params = new URLSearchParams();
    if (gender && gender !== 'all') params.append('gender', gender);
    if (age && age !== 'all') params.append('age', age);
    if (country && country !== 'all') params.append('country', country);
    if (channel && channel !== 'all') params.append('channel', channel);
    
    const response = await fetch(`https://Audience-Pulse-api.onrender.com/api/opinions/stats/television?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching television stats:', error);
    return {
      channelStats: [],
      contentTypeStats: [],
      countryStats: [],
      channelContentCorrelation: [],
      channelsByCountry: []
    };
  }
};

const fetchTelevisionNotes = async (gender?: string, age?: string, country?: string, channel?: string): Promise<TelevisionNote[]> => {
  try {
    const params = new URLSearchParams();
    if (gender && gender !== 'all') params.append('gender', gender);
    if (age && age !== 'all') params.append('age', age);
    if (country && country !== 'all') params.append('country', country);
    if (channel && channel !== 'all') params.append('channel', channel);
    
    const response = await fetch(`https://Audience-Pulse-api.onrender.com/api/opinions/notes/television?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching television notes:', error);
    return [];
  }
};

const TelevisionStats = () => {
  const { toast } = useToast();
  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [selectedAge, setSelectedAge] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedChannel, setSelectedChannel] = useState<string>('all');
  const [filterMode, setFilterMode] = useState<'channel' | 'contentType'>('channel');

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['television-stats', selectedGender, selectedAge, selectedCountry, selectedChannel],
    queryFn: () => fetchTelevisionStats(selectedGender, selectedAge, selectedCountry, selectedChannel),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const { data: notes, isLoading: notesLoading } = useQuery({
    queryKey: ['television-notes', selectedGender, selectedAge, selectedCountry, selectedChannel],
    queryFn: () => fetchTelevisionNotes(selectedGender, selectedAge, selectedCountry, selectedChannel),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const availableChannels = selectedCountry && selectedCountry !== 'all' 
    ? TELEVISION_CHANNELS_BY_COUNTRY[selectedCountry as Country] || []
    : [];

  const handleDownload = (format: 'excel' | 'word' | 'text') => {
    if (!stats) return;

    const data = filterMode === 'channel' 
      ? stats.channelStats.map(item => ({
          Item: item._id,
          Type: 'TV Channel',
          Count: item.count,
          Filters: `Gender: ${selectedGender}, Age: ${selectedAge}, Country: ${selectedCountry}, Channel: ${selectedChannel}`
        }))
      : stats.contentTypeStats.map(item => ({
          Item: item._id,
          Type: 'Content Type',
          Count: item.count,
          Filters: `Gender: ${selectedGender}, Age: ${selectedAge}, Country: ${selectedCountry}, Channel: ${selectedChannel}`
        }));

    if (format === 'excel') {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Television Stats");
      XLSX.writeFile(workbook, `TelevisionStats_${filterMode}.xlsx`);
      
      toast({
        title: "Download successful",
        description: `Television stats exported to Excel format.`,
      });
    } else if (format === 'word') {
      let html = '<table border="1" cellpadding="5" cellspacing="0">';
      html += '<tr><th>Item</th><th>Type</th><th>Count</th><th>Filters</th></tr>';
      
      data.forEach(row => {
        html += `<tr><td>${row.Item}</td><td>${row.Type}</td><td>${row.Count}</td><td>${row.Filters}</td></tr>`;
      });
      html += '</table>';
      
      const blob = new Blob([html], { type: 'application/msword' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `TelevisionStats_${filterMode}.doc`;
      link.click();
      
      toast({
        title: "Download successful",
        description: `Television stats exported to Word format.`,
      });
    } else if (format === 'text') {
      let text = `Television Statistics - ${filterMode}\n\n`;
      text += "Item\tType\tCount\tFilters\n";
      
      data.forEach(row => {
        text += `${row.Item}\t${row.Type}\t${row.Count}\t${row.Filters}\n`;
      });
      
      const blob = new Blob([text], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `TelevisionStats_${filterMode}.txt`;
      link.click();
      
      toast({
        title: "Download successful",
        description: `Television stats exported to text format.`,
      });
    }
  };

  if (statsLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-48 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const transformDataForChart = (data: Array<{ _id: string; count: number }>) => {
    return data.map(item => ({
      name: item._id || 'Unknown',
      value: item.count,
      percentage: 0
    }));
  };

  const channelData = transformDataForChart(stats?.channelStats || []);
  const contentTypeData = transformDataForChart(stats?.contentTypeStats || []);
  const countryData = transformDataForChart(stats?.countryStats || []);

  const totalVotes = channelData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Tabs defaultValue="statistics" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="statistics">Statistics</TabsTrigger>
        <TabsTrigger value="notes">Audience Notes</TabsTrigger>
      </TabsList>

      <TabsContent value="statistics" className="space-y-6">
        {/* Filters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-card rounded-lg border">
          <div>
            <Label htmlFor="gender-filter" className="text-sm font-medium">
              Gender
            </Label>
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
            <Label htmlFor="age-filter" className="text-sm font-medium">
              Age Group
            </Label>
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

          <div>
            <Label htmlFor="country-filter" className="text-sm font-medium">
              Country
            </Label>
            <Select value={selectedCountry} onValueChange={(value) => {
              setSelectedCountry(value);
              setSelectedChannel('all'); // Reset channel when country changes
            }}>
              <SelectTrigger>
                <SelectValue placeholder="All Countries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {COUNTRIES.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="channel-filter" className="text-sm font-medium">
              TV Channel
            </Label>
            <Select value={selectedChannel} onValueChange={setSelectedChannel}>
              <SelectTrigger>
                <SelectValue placeholder="All Channels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Channels</SelectItem>
                {availableChannels.map((channel) => (
                  <SelectItem key={channel} value={channel}>
                    {channel}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Filter Mode Toggle */}
        <div className="flex justify-center gap-2 p-4 bg-card rounded-lg border">
          <button
            onClick={() => setFilterMode('channel')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filterMode === 'channel' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            By Channel
          </button>
          <button
            onClick={() => setFilterMode('contentType')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filterMode === 'contentType' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            By Content Type
          </button>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total TV Opinions</CardTitle>
              <Tv className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalVotes.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Television preferences shared
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unique Channels</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{channelData.length}</div>
              <p className="text-xs text-muted-foreground">
                Different TV channels voted for
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Content Types</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contentTypeData.length}</div>
              <p className="text-xs text-muted-foreground">
                Different content types
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Countries</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{countryData.length}</div>
              <p className="text-xs text-muted-foreground">
                Countries represented
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Chart */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Tv className="w-5 h-5" />
                {filterMode === 'channel' ? 'Most Popular TV Channels' : 'Popular Content Types'}
              </CardTitle>
              <CardDescription>
                {filterMode === 'channel' 
                  ? 'Top television channels by viewer preferences' 
                  : 'Preferred television content categories'}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <button
                className="px-3 py-2 bg-secondary text-secondary-foreground rounded-lg flex items-center gap-2 hover:bg-secondary/80 transition-all text-sm"
                onClick={() => handleDownload('excel')}
              >
                <FileSpreadsheet className="w-4 h-4" />
                Excel
              </button>
              <button
                className="px-3 py-2 bg-secondary text-secondary-foreground rounded-lg flex items-center gap-2 hover:bg-secondary/80 transition-all text-sm"
                onClick={() => handleDownload('word')}
              >
                <FileText className="w-4 h-4" />
                Word
              </button>
              <button
                className="px-3 py-2 bg-secondary text-secondary-foreground rounded-lg flex items-center gap-2 hover:bg-secondary/80 transition-all text-sm"
                onClick={() => handleDownload('text')}
              >
                <Download className="w-4 h-4" />
                Text
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <AdaptivePieChart 
              data={filterMode === 'channel' ? channelData : contentTypeData} 
              height={400}
            />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notes" className="space-y-6">
        {/* Same filters for notes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-card rounded-lg border">
          <div>
            <Label htmlFor="notes-gender-filter" className="text-sm font-medium">
              Gender
            </Label>
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
            <Label htmlFor="notes-age-filter" className="text-sm font-medium">
              Age Group
            </Label>
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

          <div>
            <Label htmlFor="notes-country-filter" className="text-sm font-medium">
              Country
            </Label>
            <Select value={selectedCountry} onValueChange={(value) => {
              setSelectedCountry(value);
              setSelectedChannel('all');
            }}>
              <SelectTrigger>
                <SelectValue placeholder="All Countries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {COUNTRIES.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="notes-channel-filter" className="text-sm font-medium">
              TV Channel
            </Label>
            <Select value={selectedChannel} onValueChange={setSelectedChannel}>
              <SelectTrigger>
                <SelectValue placeholder="All Channels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Channels</SelectItem>
                {availableChannels.map((channel) => (
                  <SelectItem key={channel} value={channel}>
                    {channel}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Notes Display */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Audience Notes & Insights
            </CardTitle>
            <CardDescription>
              What viewers are saying about their television preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            {notesLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-16 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            ) : notes && notes.length > 0 ? (
              <div className="space-y-4 max-h-[500px] overflow-y-auto">
                {notes.map((note) => (
                  <div key={note.id} className="p-4 rounded-lg border bg-card/50">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span>{note.country}</span>
                        <span className="text-muted-foreground">•</span>
                        <span>{note.televisionChannel}</span>
                        <span className="text-muted-foreground">•</span>
                        <span>{note.televisionContentType}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(note.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{note.notes}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No audience notes available for the selected filters.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default TelevisionStats;
