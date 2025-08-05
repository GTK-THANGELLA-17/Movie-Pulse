import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  MessageSquare, 
  User, 
  Calendar, 
  MapPin, 
  Filter,
  TrendingUp,
  Heart,
  Star,
  Quote
} from "lucide-react";
import { useState } from "react";

interface EnhancedUserFeedbackProps {
  userNotes: any[];
  stats: any;
}

const EnhancedUserFeedback = ({ userNotes, stats }: EnhancedUserFeedbackProps) => {
  const [filterBy, setFilterBy] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("recent");

  console.log('EnhancedUserFeedback: Received notes:', userNotes);

  // Process and filter notes
  const processedNotes = userNotes
    .map((note: any, index: number) => {
      let noteContent = '';
      let metadata: any = {};

      if (typeof note === 'string') {
        noteContent = note.trim();
        metadata = { createdAt: new Date().toISOString() };
      } else if (note && typeof note.notes === 'string') {
        noteContent = note.notes.trim();
        metadata = { ...note };
      } else if (note && note.notes) {
        noteContent = String(note.notes).trim();
        metadata = { ...note };
      }

      // Clean quotes and validate
      if (noteContent.startsWith('"') && noteContent.endsWith('"')) {
        noteContent = noteContent.slice(1, -1);
      }

      if (!noteContent || noteContent === '""' || noteContent === 'undefined') {
        return null;
      }

      return {
        id: index,
        content: noteContent,
        ...metadata,
        category: metadata?.projectType || metadata?.genre || 'General',
        demographics: metadata?.demographics || {},
        createdAt: metadata?.createdAt || new Date().toISOString()
      };
    })
    .filter(Boolean);

  // Filter notes based on category
  const filteredNotes = processedNotes.filter(note => 
    filterBy === "all" || note.category.toLowerCase().includes(filterBy.toLowerCase())
  );

  // Sort notes
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return a.content.localeCompare(b.content);
  });

  // Get unique categories for filtering
  const categories = ["all", ...new Set(processedNotes.map(note => note.category))];

  // Calculate insights
  const totalFeedback = processedNotes.length;
  const averageLength = processedNotes.reduce((sum, note) => sum + note.content.length, 0) / totalFeedback || 0;
  const uniqueUsers = new Set(processedNotes.map(note => 
    `${note.demographics?.age || 'unknown'}-${note.demographics?.gender || 'unknown'}-${note.demographics?.region || 'unknown'}`
  )).size;

  if (totalFeedback === 0) {
    return (
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center">
            <MessageSquare className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-xl text-blue-800 dark:text-blue-200">
            No Audience Feedback Yet
          </CardTitle>
          <CardDescription className="text-blue-600 dark:text-blue-300">
            Encourage your audience to share their thoughts and suggestions for better content insights
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
            User feedback helps content creators understand preferences and improve their work
          </p>
          <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
            <p className="text-xs text-muted-foreground">
              💡 Tip: Audience notes appear here when people submit opinions with additional comments
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Feedback Overview */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
            <Heart className="w-5 h-5" />
            Audience Feedback Overview
          </CardTitle>
          <CardDescription className="text-green-600 dark:text-green-300">
            Real insights and suggestions from your audience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                {totalFeedback}
              </div>
              <div className="text-sm text-green-600 dark:text-green-400">
                Total Feedback
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                {uniqueUsers}
              </div>
              <div className="text-sm text-green-600 dark:text-green-400">
                Unique Contributors
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                {Math.round(averageLength)}
              </div>
              <div className="text-sm text-green-600 dark:text-green-400">
                Avg. Length
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                {categories.length - 1}
              </div>
              <div className="text-sm text-green-600 dark:text-green-400">
                Categories
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-purple-500" />
            Detailed Audience Feedback
            <Badge variant="outline" className="ml-auto">
              {sortedNotes.length} comments
            </Badge>
          </CardTitle>
          <CardDescription>
            Filter and explore what your audience is saying about your content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filter by:</span>
              <div className="flex flex-wrap gap-1">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={filterBy === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterBy(category)}
                    className="text-xs"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Sort:</span>
              <Button
                variant={sortBy === "recent" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("recent")}
                className="text-xs"
              >
                Recent
              </Button>
              <Button
                variant={sortBy === "alphabetical" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("alphabetical")}
                className="text-xs"
              >
                A-Z
              </Button>
            </div>
          </div>

          {/* Feedback List */}
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {sortedNotes.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border rounded-lg p-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Quote className="w-5 h-5 text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {note.category}
                      </Badge>
                      {note.filmIndustry && (
                        <Badge variant="secondary" className="text-xs">
                          {note.filmIndustry}
                        </Badge>
                      )}
                      {note.country && (
                        <Badge variant="secondary" className="text-xs flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {note.country}
                        </Badge>
                      )}
                      <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                        <Calendar className="w-3 h-3" />
                        {new Date(note.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <blockquote className="text-sm leading-relaxed text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-600 p-3 rounded border-l-4 border-blue-500 mb-3">
                      "{note.content}"
                    </blockquote>
                    
                    {note.demographics && (note.demographics.age || note.demographics.gender || note.demographics.region) && (
                      <div className="flex flex-wrap gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        {note.demographics.age && (
                          <Badge variant="outline" className="text-xs">
                            Age: {note.demographics.age}
                          </Badge>
                        )}
                        {note.demographics.gender && (
                          <Badge variant="outline" className="text-xs">
                            {note.demographics.gender}
                          </Badge>
                        )}
                        {note.demographics.region && (
                          <Badge variant="outline" className="text-xs">
                            {note.demographics.region}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {sortedNotes.length === 0 && (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                No feedback matches the selected filter "{filterBy}"
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedUserFeedback;