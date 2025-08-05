
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, User, Calendar } from "lucide-react";

interface UserNotesSectionProps {
  userNotes: any[];
}

const UserNotesSection = ({ userNotes }: UserNotesSectionProps) => {
  console.log('UserNotesSection: Received notes:', userNotes);

  if (!userNotes || userNotes.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full"
      >
        <Card className="w-full">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="break-words">Audience Suggestions & Creative Feedback</span>
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              No feedback or suggestions available for the current filters. Encourage your audience to share their thoughts!
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="text-center py-6 sm:py-8">
              <MessageSquare className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-sm sm:text-base px-2">
                Be the first to share feedback and suggestions for content creators in this category.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="w-full"
    >
      <Card className="w-full">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span className="break-words">Audience Suggestions & Creative Feedback</span>
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Real insights, suggestions, and feedback from audience members - valuable input for content creators to understand preferences and improve their work
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <div className="space-y-4 max-h-[400px] sm:max-h-[500px] overflow-y-auto">
            {userNotes.map((note: any, index: number) => {
              console.log('UserNotesSection: Processing note:', note);
              
              // Clean and validate the note content
              let noteContent = '';
              if (typeof note === 'string') {
                noteContent = note.trim();
              } else if (note && typeof note.notes === 'string') {
                noteContent = note.notes.trim();
              } else if (note && note.notes) {
                noteContent = String(note.notes).trim();
              }

              // Skip empty notes
              if (!noteContent || noteContent === '""' || noteContent === 'undefined') {
                return null;
              }

              // Clean quotes from content
              if (noteContent.startsWith('"') && noteContent.endsWith('"')) {
                noteContent = noteContent.slice(1, -1);
              }

              return (
                <div key={index} className="p-3 sm:p-4 border rounded-lg bg-gray-50 dark:bg-gray-800/50 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-2">
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                      <User className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="font-medium break-words">
                        {(typeof note === 'object' && note?.genre) || 
                         (typeof note === 'object' && note?.projectType) || 
                         'Content'}
                      </span>
                      {typeof note === 'object' && note?.filmIndustry && (
                        <>
                          <span className="hidden sm:inline">•</span>
                          <span className="break-words">{note.filmIndustry}</span>
                        </>
                      )}
                      {typeof note === 'object' && note?.televisionChannel && (
                        <>
                          <span className="hidden sm:inline">•</span>
                          <span className="break-words">{note.televisionChannel}</span>
                        </>
                      )}
                      {typeof note === 'object' && note?.youtubeContentCategory && (
                        <>
                          <span className="hidden sm:inline">•</span>
                          <span className="break-words">{note.youtubeContentCategory}</span>
                        </>
                      )}
                      {typeof note === 'object' && note?.ottPlatform && (
                        <>
                          <span className="hidden sm:inline">•</span>
                          <span className="break-words">{note.ottPlatform}</span>
                        </>
                      )}
                      {typeof note === 'object' && note?.country && (
                        <>
                          <span className="hidden sm:inline">•</span>
                          <span className="break-words">{note.country}</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {(typeof note === 'object' && note?.createdAt) 
                          ? new Date(note.createdAt).toLocaleDateString()
                          : new Date().toLocaleDateString()
                        }
                      </span>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-700 p-3 rounded border-l-4 border-blue-500">
                    <p className="text-sm leading-relaxed font-medium text-gray-800 dark:text-gray-200 break-words">
                      "{noteContent}"
                    </p>
                  </div>
                  {typeof note === 'object' && note?.demographics && (note.demographics.age || note.demographics.gender || note.demographics.region) && (
                    <div className="mt-2 flex flex-wrap gap-2">
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
              );
            }).filter(Boolean)}
          </div>
          {userNotes.length > 5 && (
            <div className="mt-4 text-center">
              <p className="text-xs sm:text-sm text-muted-foreground px-2">
                Showing latest feedback and suggestions. Use filters above to see specific insights.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UserNotesSection;
