
export const getSectionCategory = (sectionType: string): string => {
  const categoryMap: Record<string, string> = {
    'films': 'entertainment',
    'youtube-films': 'entertainment', 
    'youtube-content': 'youtube',
    'instagram-content': 'social',
    'ott': 'streaming',
    'television': 'television',
    'music': 'music',
    'local': 'all'
  };
  
  return categoryMap[sectionType] || 'all';
};

export const getSectionProjectTypes = (sectionType: string): string[] => {
  const projectTypeMap: Record<string, string[]> = {
    'music': ['MusicContent'],
    'films': ['Films'],
    'youtube-films': ['YouTubeFilm'],
    'youtube-content': ['YouTubeContent'],
    'instagram-content': ['InstagramContent'],
    'ott': ['OTTPlatform'],
    'television': ['Television'],
    'local': [] // Empty array means show all
  };
  
  return projectTypeMap[sectionType] || [];
};

export const formatSectionTitle = (sectionType: string): string => {
  const titleMap: Record<string, string> = {
    'local': 'Local Statistics',
    'music': 'Music Statistics',
    'films': 'Films Statistics',
    'youtube-films': 'YouTube Films Statistics',
    'youtube-content': 'YouTube Content Statistics',
    'instagram-content': 'Instagram Content Statistics',
    'ott': 'OTT Platform Statistics',
    'television': 'Television Statistics'
  };
  
  return titleMap[sectionType] || `${sectionType.charAt(0).toUpperCase() + sectionType.slice(1)} Statistics`;
};
