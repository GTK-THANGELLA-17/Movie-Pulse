
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Film, Youtube, Tv, Play, Monitor, Instagram, Music } from "lucide-react";
import VotingForm from "./VotingForm";
import { ProjectType } from "@/lib/types";

interface VotingFormTabsProps {
  onSubmit?: (data: any) => Promise<void>;
  isSubmitted?: boolean;
}

const VotingFormTabs = ({ onSubmit, isSubmitted = false }: VotingFormTabsProps) => {
  const [activeTab, setActiveTab] = useState<ProjectType>("Films");

  const trackVote = (projectType: ProjectType) => {
    console.log(`Vote tracked for ${projectType}`);
  };

  const contentTypes = [
    {
      id: "Films" as ProjectType,
      label: "Films",
      icon: Film,
      description: "Share your preferences for cinema and film industry",
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    },
    {
      id: "YouTubeFilm" as ProjectType,
      label: "YouTube Films",
      icon: Youtube,
      description: "Rate films and documentaries on YouTube",
      color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    },
    {
      id: "YouTubeContent" as ProjectType,
      label: "YouTube Content",
      icon: Play,
      description: "Vote on YouTube videos and content creators",
      color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
    },
    {
      id: "InstagramContent" as ProjectType,
      label: "Instagram Content",
      icon: Instagram,
      description: "Share opinions on Instagram posts, reels, and stories",
      color: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300"
    },
    {
      id: "OTTPlatform" as ProjectType,
      label: "OTT Platforms",
      icon: Monitor,
      description: "Share opinions on streaming services and shows",
      color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
    },
    {
      id: "Television" as ProjectType,
      label: "Television",
      icon: Tv,
      description: "Rate TV channels and television programming",
      color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    },
    {
      id: "MusicContent" as ProjectType,
      label: "Music",
      icon: Music,
      description: "Share your music preferences, genres, and moods",
      color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Enhanced Content Type Selection */}
      <Card className="mb-8 border-2 border-primary/20 shadow-lg">
        <CardHeader className="text-center bg-gradient-to-r from-primary/5 to-primary/10">
          <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
            <span className="text-2xl">🎬</span>
            Select Content Type
          </CardTitle>
          <CardDescription className="text-lg">
            Choose the entertainment category you want to share your opinion about
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 mb-6">
            {contentTypes.map((type) => {
              const Icon = type.icon;
              const isActive = activeTab === type.id;
              
              return (
                <motion.div
                  key={type.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(type.id)}
                  className={`
                    cursor-pointer p-4 rounded-xl border-2 transition-all duration-200
                    ${isActive 
                      ? 'border-primary bg-primary/10 shadow-lg' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:bg-primary/5'
                    }
                  `}
                >
                  <div className="text-center space-y-3">
                    <div className={`
                      w-12 h-12 mx-auto rounded-full flex items-center justify-center
                      ${isActive ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800'}
                    `}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className={`font-semibold text-sm ${isActive ? 'text-primary' : ''}`}>
                        {type.label}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {type.description}
                      </p>
                    </div>
                    {isActive && (
                      <Badge className={type.color}>
                        Selected
                      </Badge>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Active Selection Indicator */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20"
          >
            <div className="flex items-center justify-center gap-2 text-primary font-medium">
              {(() => {
                const activeType = contentTypes.find(t => t.id === activeTab);
                const Icon = activeType?.icon || Film;
                return (
                  <>
                    <Icon className="h-5 w-5" />
                    <span>Now sharing opinion for: {activeType?.label}</span>
                  </>
                );
              })()}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Traditional Tabs for Form Content */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ProjectType)}>
        <TabsList className="hidden">
          {contentTypes.map((type) => (
            <TabsTrigger key={type.id} value={type.id}>
              {type.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <AnimatePresence mode="wait">
          {contentTypes.map((type) => (
            <TabsContent key={type.id} value={type.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <type.icon className="h-5 w-5" />
                      {type.label} Opinion Form
                    </CardTitle>
                    <CardDescription>
                      {type.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <VotingForm 
                      projectType={type.id} 
                      trackVote={trackVote}
                      onSubmit={onSubmit}
                      isSubmitted={isSubmitted}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          ))}
        </AnimatePresence>
      </Tabs>
    </div>
  );
};

export default VotingFormTabs;
