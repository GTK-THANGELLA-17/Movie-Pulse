import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Film, Music, Tv, Youtube, Instagram, Monitor, Star } from "lucide-react";
import { ProcessedStats } from "@/types/stats";

interface ContentSpecificStatsProps {
  stats: ProcessedStats;
  sectionType: string;
}

const ContentSpecificStats = ({ stats, sectionType }: ContentSpecificStatsProps) => {
  const totalOpinions = stats.total;

  // Helper function to create stat cards
  const createStatCard = (title: string, data: Record<string, number>, icon: React.ReactNode, color: string) => {
    if (!data || Object.keys(data).length === 0) return null;

    const sortedData = Object.entries(data)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10);

    return (
      <Card key={title} className="h-full">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            {icon}
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {sortedData.map(([item, count], index) => {
            const percentage = totalOpinions > 0 ? (count / totalOpinions) * 100 : 0;
            return (
              <div key={item} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      #{index + 1}
                    </Badge>
                    <span className="font-medium text-sm">{item}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-sm">{count}</span>
                    <span className="text-xs text-gray-500 ml-1">
                      ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                </div>
                <Progress 
                  value={percentage} 
                  className={`h-2 ${color}`}
                />
              </div>
            );
          })}
        </CardContent>
      </Card>
    );
  };

  // Films specific content
  const renderFilmsContent = () => {
    const cards = [];
    
    if (stats.byFilmIndustry && Object.keys(stats.byFilmIndustry).length > 0) {
      cards.push(createStatCard(
        "Film Industries", 
        stats.byFilmIndustry, 
        <Film className="w-5 h-5 text-blue-500" />,
        "bg-blue-500"
      ));
    }
    
    if (stats.byGenre && Object.keys(stats.byGenre).length > 0) {
      cards.push(createStatCard(
        "Popular Genres", 
        stats.byGenre, 
        <Star className="w-5 h-5 text-purple-500" />,
        "bg-purple-500"
      ));
    }

    return cards;
  };

  // Television specific content
  const renderTelevisionContent = () => {
    const cards = [];
    
    if (stats.byTvChannel && Object.keys(stats.byTvChannel).length > 0) {
      cards.push(createStatCard(
        "TV Channels", 
        stats.byTvChannel, 
        <Tv className="w-5 h-5 text-green-500" />,
        "bg-green-500"
      ));
    }
    
    if (stats.byTelevisionContentType && Object.keys(stats.byTelevisionContentType).length > 0) {
      cards.push(createStatCard(
        "Content Types", 
        stats.byTelevisionContentType, 
        <Monitor className="w-5 h-5 text-indigo-500" />,
        "bg-indigo-500"
      ));
    }

    return cards;
  };

  // YouTube specific content
  const renderYouTubeContent = () => {
    const cards = [];
    
    if (stats.byYoutubeCategory && Object.keys(stats.byYoutubeCategory).length > 0) {
      cards.push(createStatCard(
        "YouTube Categories", 
        stats.byYoutubeCategory, 
        <Youtube className="w-5 h-5 text-red-500" />,
        "bg-red-500"
      ));
    }
    
    if (stats.byYoutubeChannelType && Object.keys(stats.byYoutubeChannelType).length > 0) {
      cards.push(createStatCard(
        "Channel Types", 
        stats.byYoutubeChannelType, 
        <Youtube className="w-5 h-5 text-orange-500" />,
        "bg-orange-500"
      ));
    }

    return cards;
  };

  // OTT specific content
  const renderOTTContent = () => {
    const cards = [];
    
    if (stats.byOttPlatform && Object.keys(stats.byOttPlatform).length > 0) {
      cards.push(createStatCard(
        "OTT Platforms", 
        stats.byOttPlatform, 
        <Monitor className="w-5 h-5 text-cyan-500" />,
        "bg-cyan-500"
      ));
    }
    
    if (stats.byOttSeriesType && Object.keys(stats.byOttSeriesType).length > 0) {
      cards.push(createStatCard(
        "Series Types", 
        stats.byOttSeriesType, 
        <Star className="w-5 h-5 text-teal-500" />,
        "bg-teal-500"
      ));
    }

    return cards;
  };

  // Instagram specific content
  const renderInstagramContent = () => {
    const cards = [];
    
    if (stats.byInstagramCategory && Object.keys(stats.byInstagramCategory).length > 0) {
      cards.push(createStatCard(
        "Instagram Categories", 
        stats.byInstagramCategory, 
        <Instagram className="w-5 h-5 text-pink-500" />,
        "bg-pink-500"
      ));
    }

    return cards;
  };

  // Music specific content
  const renderMusicContent = () => {
    const cards = [];
    
    if (stats.byMusicGenre && Object.keys(stats.byMusicGenre).length > 0) {
      cards.push(createStatCard(
        "Music Genres", 
        stats.byMusicGenre, 
        <Music className="w-5 h-5 text-emerald-500" />,
        "bg-emerald-500"
      ));
    }
    
    if (stats.byMusicMood && Object.keys(stats.byMusicMood).length > 0) {
      cards.push(createStatCard(
        "Music Moods", 
        stats.byMusicMood, 
        <Star className="w-5 h-5 text-yellow-500" />,
        "bg-yellow-500"
      ));
    }
    
    if (stats.byMusicLanguage && Object.keys(stats.byMusicLanguage).length > 0) {
      cards.push(createStatCard(
        "Music Languages", 
        stats.byMusicLanguage, 
        <Music className="w-5 h-5 text-violet-500" />,
        "bg-violet-500"
      ));
    }

    return cards;
  };

  // Get content based on section type
  const getContentCards = () => {
    switch (sectionType) {
      case 'films':
        return renderFilmsContent();
      case 'television':
        return renderTelevisionContent();
      case 'youtube-content':
      case 'youtube-films':
        return renderYouTubeContent();
      case 'ott':
        return renderOTTContent();
      case 'instagram-content':
        return renderInstagramContent();
      case 'music':
        return renderMusicContent();
      case 'local':
        // For local, show all available content
        return [
          ...renderFilmsContent(),
          ...renderTelevisionContent(),
          ...renderYouTubeContent(),
          ...renderOTTContent(),
          ...renderInstagramContent(),
          ...renderMusicContent()
        ];
      default:
        return [];
    }
  };

  const contentCards = getContentCards().filter(Boolean);

  if (contentCards.length === 0) {
    return (
      <Card className="col-span-full">
        <CardContent className="text-center py-12">
          <div className="text-6xl mb-4">🎯</div>
          <p className="text-xl text-gray-500 dark:text-gray-400 mb-2">No Content-Specific Data Yet</p>
          <p className="text-gray-400 dark:text-gray-500">
            Content preferences will appear here as users submit opinions with specific choices
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Content Preferences & Choices
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          What your audience specifically wants to see in {sectionType === 'local' ? 'all categories' : sectionType}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contentCards}
      </div>
    </div>
  );
};

export default ContentSpecificStats;