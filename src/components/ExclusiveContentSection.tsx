
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useExclusiveContent } from "@/hooks/useExclusiveContent";
import { Play, Eye, Clock, Star, Film, Tv, Youtube, Monitor } from "lucide-react";
import { LoadingState } from "@/components/stats/StatsLoadingStates";

const ExclusiveContentSection = () => {
  const { content, isLoading, hasAccess, trackView } = useExclusiveContent();

  const getContentIcon = (contentType: string) => {
    switch (contentType) {
      case 'trailer': return <Play className="w-4 h-4" />;
      case 'teaser': return <Film className="w-4 h-4" />;
      case 'behind-the-scenes': return <Eye className="w-4 h-4" />;
      case 'first-look': return <Star className="w-4 h-4" />;
      default: return <Monitor className="w-4 h-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Films': return <Film className="w-4 h-4" />;
      case 'Television': return <Tv className="w-4 h-4" />;
      case 'YouTubeContent': case 'YouTubeFilm': return <Youtube className="w-4 h-4" />;
      default: return <Monitor className="w-4 h-4" />;
    }
  };

  const handleContentView = async (contentId: string, mediaUrl?: string) => {
    await trackView(contentId);
    if (mediaUrl) {
      window.open(mediaUrl, '_blank');
    }
  };

  if (isLoading) {
    return <LoadingState title="Loading Exclusive Content..." description="Fetching personalized content for you" />;
  }

  if (!hasAccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 p-8 rounded-2xl max-w-md mx-auto">
          <Star className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Unlock Exclusive Content!</h3>
          <p className="text-muted-foreground mb-4">
            Vote in any category to get access to exclusive trailers, behind-the-scenes content, and early previews!
          </p>
          <Button onClick={() => window.location.href = '/vote'} className="bg-gradient-to-r from-primary to-purple-500">
            Cast Your Vote Now
          </Button>
        </div>
      </motion.div>
    );
  }

  if (content.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            Exclusive Content
          </CardTitle>
          <CardDescription>New exclusive content coming soon based on your preferences!</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            Exclusive Content For You
          </CardTitle>
          <CardDescription>
            Personalized content based on your voting preferences - {content.length} items available
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4 rounded-lg border hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getContentIcon(item.contentType)}
                    <Badge variant="secondary" className="text-xs">
                      {item.contentType}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Eye className="w-3 h-3" />
                    {item.viewCount}
                  </div>
                </div>
                
                <h4 className="font-semibold mb-2 line-clamp-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
                
                <div className="flex items-center gap-2 mb-3">
                  {getCategoryIcon(item.category)}
                  <span className="text-xs font-medium">{item.category}</span>
                  {item.genre && (
                    <Badge variant="outline" className="text-xs">
                      {item.genre}
                    </Badge>
                  )}
                </div>

                {item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.tags.slice(0, 3).map((tag, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleContentView(item._id, item.mediaUrl)}
                    className="h-7 px-3 text-xs"
                  >
                    {item.mediaUrl ? 'View' : 'Coming Soon'}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExclusiveContentSection;
