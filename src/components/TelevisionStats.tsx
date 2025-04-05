
import { useState, useEffect } from "react";
import { COUNTRIES, TELEVISION_CHANNELS_BY_COUNTRY, TELEVISION_CONTENT_TYPES, getCountsByTelevisionChannel, getCountsByTelevisionContentType } from "@/lib/data";
import { TelevisionChannel, TelevisionContentType, Country } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Download, FileText, FileSpreadsheet, FileType } from "lucide-react";
import * as XLSX from 'xlsx';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TelevisionStats = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country>("USA");
  const [selectedChannel, setSelectedChannel] = useState<TelevisionChannel | null>(null);
  const [contentTypeData, setContentTypeData] = useState<any[]>([]);
  const [channelData, setChannelData] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<"channel" | "content">("channel");

  useEffect(() => {
    if (selectedCountry) {
      const channels = TELEVISION_CHANNELS_BY_COUNTRY[selectedCountry];
      if (channels.length > 0 && !selectedChannel) {
        setSelectedChannel(channels[0]);
      }
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedChannel) {
      // Get data for content types for the selected channel
      const countsByContentType = getCountsByTelevisionChannel(selectedChannel);
      const formattedData = Object.entries(countsByContentType)
        .map(([type, count]) => ({
          name: type,
          value: count
        }))
        .filter(item => item.value > 0);
      
      setContentTypeData(formattedData.length > 0 ? formattedData : generateMockData(TELEVISION_CONTENT_TYPES, 5));
    }

    // Get data for all channels in the selected country
    if (selectedCountry) {
      const channels = TELEVISION_CHANNELS_BY_COUNTRY[selectedCountry];
      const channelCounts = channels.map(channel => {
        const countsByContentType = getCountsByTelevisionChannel(channel);
        const totalCount = Object.values(countsByContentType).reduce((sum, count) => sum + count, 0);
        return { name: channel, value: totalCount };
      });
      
      setChannelData(channelCounts.length > 0 && channelCounts.some(item => item.value > 0) 
        ? channelCounts 
        : generateMockData(channels, 8));
    }
  }, [selectedCountry, selectedChannel]);

  // Generate mock data for demo purpose
  const generateMockData = (items: any[], max: number) => {
    return items.slice(0, 10).map(item => ({
      name: typeof item === 'string' ? item : item.toString(),
      value: Math.floor(Math.random() * max) + 1
    }));
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1', '#a4de6c', '#d0ed57'];

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value as Country);
    setSelectedChannel(null);
  };

  const handleChannelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedChannel(event.target.value as TelevisionChannel);
  };

  const downloadCSV = () => {
    const data = viewMode === "channel" ? channelData : contentTypeData;
    const title = viewMode === "channel" 
      ? `TV_Channels_${selectedCountry}` 
      : `Content_Types_${selectedChannel}`;
    
    // Create CSV content
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Name,Value\n";
    data.forEach((item) => {
      csvContent += `${item.name},${item.value}\n`;
    });
    
    // Create download link and trigger click
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${title}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadExcel = () => {
    const data = viewMode === "channel" ? channelData : contentTypeData;
    const title = viewMode === "channel" 
      ? `TV_Channels_${selectedCountry}` 
      : `Content_Types_${selectedChannel}`;
    
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, `${title}.xlsx`);
  };

  const downloadText = () => {
    const data = viewMode === "channel" ? channelData : contentTypeData;
    const title = viewMode === "channel" 
      ? `TV_Channels_${selectedCountry}` 
      : `Content_Types_${selectedChannel}`;
    
    let textContent = "Name\tValue\n";
    data.forEach((item) => {
      textContent += `${item.name}\t${item.value}\n`;
    });
    
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${title}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadWord = () => {
    const data = viewMode === "channel" ? channelData : contentTypeData;
    const title = viewMode === "channel" 
      ? `TV_Channels_${selectedCountry}` 
      : `Content_Types_${selectedChannel}`;
    
    // Create a simple HTML document that can be opened in Word
    let htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word'>
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <style>
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        <table>
          <tr>
            <th>Name</th>
            <th>Value</th>
          </tr>
    `;
    
    data.forEach((item) => {
      htmlContent += `
        <tr>
          <td>${item.name}</td>
          <td>${item.value}</td>
        </tr>
      `;
    });
    
    htmlContent += `
        </table>
      </body>
      </html>
    `;
    
    const blob = new Blob([htmlContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${title}.doc`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <label htmlFor="country-select" className="block text-sm font-medium mb-1">
              Select Country
            </label>
            <select
              id="country-select"
              value={selectedCountry}
              onChange={handleCountryChange}
              className="w-full sm:w-48 px-3 py-2 rounded-md border border-input bg-background"
            >
              {COUNTRIES.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          
          {selectedCountry && (
            <div>
              <label htmlFor="channel-select" className="block text-sm font-medium mb-1">
                Select TV Channel
              </label>
              <select
                id="channel-select"
                value={selectedChannel || ""}
                onChange={handleChannelChange}
                className="w-full sm:w-48 px-3 py-2 rounded-md border border-input bg-background"
              >
                <option value="">Select Channel</option>
                {TELEVISION_CHANNELS_BY_COUNTRY[selectedCountry].map((channel) => (
                  <option key={channel} value={channel}>
                    {channel}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex rounded-lg border bg-card p-1 self-start">
            <button
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                viewMode === "channel" 
                  ? "bg-primary text-white"
                  : "text-muted-foreground hover:bg-muted"
              }`}
              onClick={() => setViewMode("channel")}
            >
              By Channel
            </button>
            <button
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                viewMode === "content" 
                  ? "bg-primary text-white"
                  : "text-muted-foreground hover:bg-muted"
              }`}
              onClick={() => setViewMode("content")}
            >
              By Content Type
            </button>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-1.5 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
              <Download size={16} />
              <span className="hidden sm:inline">Download</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg z-50">
              <DropdownMenuLabel>Export Data</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="flex items-center gap-2 cursor-pointer" 
                onClick={downloadExcel}
              >
                <FileSpreadsheet className="h-4 w-4" />
                Excel Format (.xlsx)
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="flex items-center gap-2 cursor-pointer" 
                onClick={downloadWord}
              >
                <FileText className="h-4 w-4" />
                Word Format (.doc)
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="flex items-center gap-2 cursor-pointer" 
                onClick={downloadText}
              >
                <FileType className="h-4 w-4" />
                Text Format (.txt)
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="flex items-center gap-2 cursor-pointer" 
                onClick={downloadCSV}
              >
                <FileText className="h-4 w-4" />
                CSV Format (.csv)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="border rounded-lg p-4 bg-white/50 dark:bg-gray-800/50">
        <h3 className="font-medium text-lg mb-4">
          {viewMode === "channel" 
            ? `Popular TV Channels in ${selectedCountry}` 
            : `Popular Content on ${selectedChannel} Channel`}
        </h3>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {viewMode === "channel" ? (
              <BarChart
                data={channelData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 60,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#5b2333" animationDuration={1000} />
              </BarChart>
            ) : (
              <PieChart>
                <Pie
                  data={contentTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  animationDuration={1000}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {contentTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>
        
        <p className="text-sm text-muted-foreground mt-4">
          {viewMode === "channel" 
            ? "This graph shows the popularity of different TV channels in the selected country based on user votes."
            : "This graph shows the popularity of different content types on the selected TV channel based on user votes."}
        </p>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        <p>Data is based on user votes for television content preferences.</p>
        <p className="font-medium mt-1">
          {viewMode === "channel" && channelData.length > 0 
            ? `${channelData[0].name} is currently the most popular channel in ${selectedCountry}.`
            : viewMode === "content" && contentTypeData.length > 0
            ? `${contentTypeData[0].name} is currently the most popular content type on ${selectedChannel}.`
            : 'Vote to help us gather more accurate statistics.'}
        </p>
      </div>
    </motion.div>
  );
};

export default TelevisionStats;
