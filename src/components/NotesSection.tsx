
import { useState, useEffect } from "react";
import { MessageSquare, Calendar, User, Filter } from "lucide-react";
import { getVotes } from "@/lib/data";
import { PROJECT_TYPE_LABELS } from "@/lib/data";
import { Vote } from "@/lib/types";
import { motion } from "framer-motion";

interface NotesSectionProps {
  projectTypes: string[];
}

const NotesSection = ({ projectTypes }: NotesSectionProps) => {
  const [userNotes, setUserNotes] = useState<Vote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterGenre, setFilterGenre] = useState<string>("");
  
  useEffect(() => {
    loadUserNotes();
  }, [projectTypes, filterGenre]);
  
  const loadUserNotes = () => {
    setIsLoading(true);
    
    // Simulate API call with improved filtering
    setTimeout(() => {
      const allVotes = getVotes();
      let filteredVotes = allVotes.filter(vote => 
        projectTypes.includes(vote.projectType) && 
        vote.notes?.trim()
      );
      
      // Apply genre filter if selected
      if (filterGenre) {
        filteredVotes = filteredVotes.filter(vote => vote.genre === filterGenre);
      }
      
      // Sort by timestamp, most recent first
      filteredVotes.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      
      setUserNotes(filteredVotes);
      setIsLoading(false);
    }, 300);
  };

  // Get unique genres from the filtered votes
  const getUniqueGenres = () => {
    const allVotes = getVotes();
    const filteredVotes = allVotes.filter(vote => 
      projectTypes.includes(vote.projectType) && vote.notes?.trim()
    );
    
    const genres = filteredVotes.map(vote => vote.genre);
    return Array.from(new Set(genres));
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center p-6">
        <div className="animate-pulse space-y-4 w-full max-w-3xl">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-muted rounded-lg h-24 w-full"></div>
          ))}
        </div>
      </div>
    );
  }
  
  if (userNotes.length === 0) {
    return (
      <div className="text-center py-12">
        <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
        <h3 className="mt-4 text-lg font-medium">No Comments Yet</h3>
        <p className="mt-2 text-muted-foreground">
          There are currently no user notes for this section. 
          Notes will appear here once people start sharing their thoughts.
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h3 className="text-lg font-medium">User Comments & Insights</h3>
          <p className="text-sm text-muted-foreground">{userNotes.length} comments</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={filterGenre}
            onChange={(e) => setFilterGenre(e.target.value)}
            className="bg-muted/50 border border-input rounded-md px-3 py-1 text-sm"
          >
            <option value="">All Genres</option>
            {getUniqueGenres().map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="divide-y space-y-1">
        {userNotes.map((vote, index) => (
          <motion.div 
            key={vote.id} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="py-5 first:pt-0"
          >
            <div className="flex flex-wrap justify-between items-start mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                      {vote.genre}
                    </span>
                    <span className="bg-secondary/50 px-2 py-0.5 rounded-full">
                      {vote.filmIndustry}
                    </span>
                    <span className="bg-muted px-2 py-0.5 rounded-full">
                      {PROJECT_TYPE_LABELS[vote.projectType]}
                    </span>
                    {vote.ottPlatform && (
                      <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-0.5 rounded-full">
                        {vote.ottPlatform}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                  <User className="w-3 h-3" /> {vote.country} 
                  <span>•</span> 
                  <Calendar className="w-3 h-3" /> {new Date(vote.timestamp).toLocaleDateString()} at {new Date(vote.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            </div>
            <div className="mt-2 text-muted-foreground border-l-4 border-muted pl-4 italic">
              "{vote.notes}"
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NotesSection;
