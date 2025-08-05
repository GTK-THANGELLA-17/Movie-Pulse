
import * as XLSX from 'xlsx';
import { ProcessedStats } from "@/types/stats";

// Helper function to safely convert unknown values to numbers
const toNumber = (value: unknown): number => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};

export const exportToExcel = (stats: ProcessedStats, sectionName: string = 'Stats') => {
  const workbook = XLSX.utils.book_new();
  
  // Enhanced Summary sheet with more details
  const summaryData = [
    ['Metric', 'Value', 'Description'],
    ['Total Opinions', stats.total, 'Total number of opinions collected'],
    ['Recent Opinions', stats.recent, 'Opinions from last 7 days'],
    ['Total Categories', Object.keys(stats.byProjectType || {}).length, 'Number of different project types'],
    ['Countries Covered', Object.keys(stats.byCountry || {}).length, 'Geographic coverage'],
    ['User Notes', stats.userNotes?.length || 0, 'Number of user notes with opinions'],
    ['Genres Available', Object.keys(stats.byGenre || {}).length, 'Number of different genres'],
    ['OTT Platforms', Object.keys(stats.byOttPlatform || {}).length, 'Number of OTT platforms'],
    ['Film Industries', Object.keys(stats.byFilmIndustry || {}).length, 'Number of film industries'],
    ['TV Channels', Object.keys(stats.byTvChannel || {}).length, 'Number of TV channels'],
    ['Music Genres', Object.keys(stats.byMusicGenre || {}).length, 'Number of music genres'],
    ['YouTube Categories', Object.keys(stats.byYoutubeCategory || {}).length, 'Number of YouTube categories']
  ];
  
  const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(workbook, summarySheet, 'Executive Summary');
  
  // Helper function to create enhanced data sheets
  const createEnhancedDataSheet = (data: Record<string, number>, sheetName: string, categoryName: string) => {
    if (data && Object.keys(data).length > 0) {
      const total = Object.values(data).reduce((sum, count) => sum + toNumber(count), 0);
      const sheetData = [
        [categoryName, 'Count', 'Percentage', 'Rank'],
        ...Object.entries(data)
          .sort(([,a], [,b]) => toNumber(b) - toNumber(a))
          .map(([name, count], index) => [
            name, 
            toNumber(count), 
            ((toNumber(count) / total) * 100).toFixed(2) + '%',
            index + 1
          ])
      ];
      
      // Add totals row
      sheetData.push(['TOTAL', total, '100.00%', '']);
      
      const sheet = XLSX.utils.aoa_to_sheet(sheetData);
      
      // Add some styling information
      const range = XLSX.utils.decode_range(sheet['!ref'] || 'A1');
      sheet['!autofilter'] = { ref: `A1:D${range.e.r + 1}` };
      
      XLSX.utils.book_append_sheet(workbook, sheet, sheetName);
    }
  };

  // Create comprehensive sheets for all available data
  createEnhancedDataSheet(stats.byProjectType, 'Project Types', 'Project Type');
  createEnhancedDataSheet(stats.byCountry, 'Countries', 'Country');
  createEnhancedDataSheet(stats.byGenre, 'Genres', 'Genre');
  createEnhancedDataSheet(stats.byYoutubeCategory, 'YouTube Categories', 'Category');
  createEnhancedDataSheet(stats.byOttPlatform, 'OTT Platforms', 'Platform');
  createEnhancedDataSheet(stats.byFilmIndustry, 'Film Industries', 'Industry');
  createEnhancedDataSheet(stats.byTvChannel, 'TV Channels', 'Channel');
  createEnhancedDataSheet(stats.byMusicGenre, 'Music Genres', 'Genre');
  createEnhancedDataSheet(stats.byMusicMood, 'Music Moods', 'Mood');
  createEnhancedDataSheet(stats.byMusicLanguage, 'Music Languages', 'Language');
  createEnhancedDataSheet(stats.byTelevisionContentType, 'TV Content Types', 'Content Type');
  createEnhancedDataSheet(stats.byYoutubeChannelType, 'YouTube Channel Types', 'Channel Type');
  createEnhancedDataSheet(stats.byOttSeriesType, 'OTT Series Types', 'Series Type');
  createEnhancedDataSheet(stats.byInstagramCategory, 'Instagram Categories', 'Category');
  
  // Enhanced Demographics sheets
  if (stats.byDemographics) {
    createEnhancedDataSheet(stats.byDemographics.gender, 'Gender Demographics', 'Gender');
    createEnhancedDataSheet(stats.byDemographics.age, 'Age Demographics', 'Age Group');
    createEnhancedDataSheet(stats.byDemographics.region, 'Regional Demographics', 'Region');
  }
  
  // Enhanced User Notes with more details
  if (stats.userNotes && stats.userNotes.length > 0) {
    const notesData = [
      ['Date', 'Project Type', 'Genre', 'Country', 'Rating', 'Notes', 'Word Count'],
      ...stats.userNotes.map((note: any) => [
        note.createdAt ? new Date(note.createdAt).toLocaleDateString() : 'N/A',
        note.projectType || 'N/A',
        note.genre || 'N/A',
        note.country || 'N/A',
        note.rating || 'N/A',
        note.notes || '',
        note.notes ? note.notes.split(' ').length : 0
      ])
    ];
    
    const notesSheet = XLSX.utils.aoa_to_sheet(notesData);
    XLSX.utils.book_append_sheet(workbook, notesSheet, 'User Notes');
  }
  
  // Add metadata sheet
  const metadataData = [
    ['Report Information', 'Value'],
    ['Generated On', new Date().toLocaleString()],
    ['Section', sectionName],
    ['Total Records', stats.total],
    ['Export Format', 'Microsoft Excel'],
    ['Data Completeness', `${Object.keys(stats.byProjectType || {}).length > 0 ? 'Complete' : 'Partial'}`]
  ];
  
  const metadataSheet = XLSX.utils.aoa_to_sheet(metadataData);
  XLSX.utils.book_append_sheet(workbook, metadataSheet, 'Report Info');
  
  // Export with timestamp
  const timestamp = new Date().toISOString().split('T')[0];
  XLSX.writeFile(workbook, `${sectionName}_Detailed_Statistics_${timestamp}.xlsx`);
};

export const exportToWord = (stats: ProcessedStats, sectionName: string = 'Stats') => {
  let content = `# ${sectionName} - Comprehensive Statistics Report\n\n`;
  content += `**Generated on:** ${new Date().toLocaleString()}\n`;
  content += `**Report Type:** Detailed Analysis\n\n`;
  
  // Enhanced Summary
  content += `## Executive Summary\n`;
  content += `- **Total Opinions:** ${stats.total.toLocaleString()}\n`;
  content += `- **Recent Opinions (7 days):** ${stats.recent.toLocaleString()}\n`;
  content += `- **Project Categories:** ${Object.keys(stats.byProjectType || {}).length}\n`;
  content += `- **Geographic Coverage:** ${Object.keys(stats.byCountry || {}).length} countries\n`;
  content += `- **User Notes:** ${(stats.userNotes?.length || 0).toLocaleString()}\n`;
  content += `- **Data Quality:** ${stats.total > 0 ? 'Complete Dataset' : 'Limited Dataset'}\n\n`;
  
  // Helper function to add enhanced sections
  const addEnhancedSection = (data: Record<string, number>, title: string, description?: string) => {
    if (data && Object.keys(data).length > 0) {
      const total = Object.values(data).reduce((sum, count) => sum + toNumber(count), 0);
      const entries = Object.entries(data).sort(([,a], [,b]) => toNumber(b) - toNumber(a));
      
      content += `## ${title}\n`;
      if (description) content += `*${description}*\n\n`;
      
      content += `**Total Entries:** ${total.toLocaleString()}\n`;
      content += `**Categories:** ${entries.length}\n\n`;
      
      entries.forEach(([name, count], index) => {
        const percentage = ((toNumber(count) / total) * 100).toFixed(1);
        content += `${index + 1}. **${name}:** ${toNumber(count).toLocaleString()} (${percentage}%)\n`;
      });
      content += '\n';
    }
  };

  // Add all sections with descriptions
  addEnhancedSection(stats.byProjectType, 'Project Type Distribution', 'Breakdown of content by project categories');
  addEnhancedSection(stats.byCountry, 'Geographic Distribution', 'Opinions by country of origin');
  addEnhancedSection(stats.byGenre, 'Genre Analysis', 'Popular genres across all content types');
  addEnhancedSection(stats.byYoutubeCategory, 'YouTube Content Categories', 'Distribution of YouTube content preferences');
  addEnhancedSection(stats.byOttPlatform, 'OTT Platform Preferences', 'Streaming platform popularity analysis');
  addEnhancedSection(stats.byFilmIndustry, 'Film Industry Distribution', 'Regional film industry representation');
  addEnhancedSection(stats.byTvChannel, 'Television Channel Analysis', 'TV channel preference patterns');
  addEnhancedSection(stats.byMusicGenre, 'Music Genre Preferences', 'Musical taste distribution');
  addEnhancedSection(stats.byMusicMood, 'Music Mood Analysis', 'Emotional preferences in music');
  addEnhancedSection(stats.byMusicLanguage, 'Music Language Distribution', 'Language preferences in music content');
  
  // Demographics with enhanced analysis
  if (stats.byDemographics) {
    content += `## Demographic Analysis\n`;
    addEnhancedSection(stats.byDemographics.gender, 'Gender Distribution', 'Gender-based participation patterns');
    addEnhancedSection(stats.byDemographics.age, 'Age Group Analysis', 'Age-based content preferences');
    addEnhancedSection(stats.byDemographics.region, 'Regional Distribution', 'Geographic participation patterns');
  }
  
  // User engagement section
  if (stats.userNotes && stats.userNotes.length > 0) {
    content += `## User Engagement Analysis\n`;
    content += `**Total User Notes:** ${stats.userNotes.length.toLocaleString()}\n`;
    content += `**Engagement Rate:** ${((stats.userNotes.length / stats.total) * 100).toFixed(1)}%\n\n`;
    
    // Sample notes (first 5)
    const sampleNotes = stats.userNotes.slice(0, 5);
    content += `### Sample User Notes:\n`;
    sampleNotes.forEach((note: any, index: number) => {
      content += `${index + 1}. **${note.projectType || 'Unknown'}** - ${note.genre || 'No Genre'}\n`;
      content += `   *"${(note.notes || 'No notes').substring(0, 100)}${(note.notes || '').length > 100 ? '...' : ''}"*\n\n`;
    });
  }
  
  // Footer
  content += `---\n`;
  content += `**Report Generated:** ${new Date().toLocaleString()}\n`;
  content += `**Data Period:** All available data\n`;
  content += `**Export Format:** Microsoft Word Document\n`;
  
  const blob = new Blob([content], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${sectionName}_Detailed_Report_${new Date().toISOString().split('T')[0]}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const exportToText = (stats: ProcessedStats, sectionName: string = 'Stats') => {
  let content = `${sectionName.toUpperCase()} - COMPREHENSIVE STATISTICS REPORT\n`;
  content += `${'='.repeat(sectionName.length + 40)}\n\n`;
  content += `Generated on: ${new Date().toLocaleString()}\n`;
  content += `Report Type: Detailed Analysis\n\n`;
  
  // Enhanced Summary
  content += `EXECUTIVE SUMMARY\n`;
  content += `${'-'.repeat(17)}\n`;
  content += `Total Opinions: ${stats.total.toLocaleString()}\n`;
  content += `Recent Opinions (7 days): ${stats.recent.toLocaleString()}\n`;
  content += `Project Categories: ${Object.keys(stats.byProjectType || {}).length}\n`;
  content += `Geographic Coverage: ${Object.keys(stats.byCountry || {}).length} countries\n`;
  content += `User Notes: ${(stats.userNotes?.length || 0).toLocaleString()}\n`;
  content += `Data Completeness: ${stats.total > 0 ? 'COMPLETE' : 'LIMITED'}\n\n`;
  
  // Helper function to add enhanced sections
  const addEnhancedSection = (data: Record<string, number>, title: string) => {
    if (data && Object.keys(data).length > 0) {
      const total = Object.values(data).reduce((sum, count) => sum + toNumber(count), 0);
      const entries = Object.entries(data).sort(([,a], [,b]) => toNumber(b) - toNumber(a));
      
      content += `${title.toUpperCase()}\n`;
      content += `${'-'.repeat(title.length)}\n`;
      content += `Total Entries: ${total.toLocaleString()}\n`;
      content += `Categories: ${entries.length}\n\n`;
      
      entries.forEach(([name, count], index) => {
        const percentage = ((toNumber(count) / total) * 100).toFixed(1);
        const rank = `#${(index + 1).toString().padStart(2, '0')}`;
        content += `${rank} ${name.padEnd(25, '.')}: ${toNumber(count).toLocaleString().padStart(8)} (${percentage.padStart(5)}%)\n`;
      });
      content += `\nTOTAL${' '.repeat(20)}: ${total.toLocaleString().padStart(8)} (100.0%)\n\n`;
    }
  };

  // Add all sections
  addEnhancedSection(stats.byProjectType, 'Project Type Distribution');
  addEnhancedSection(stats.byCountry, 'Geographic Distribution');
  addEnhancedSection(stats.byGenre, 'Genre Analysis');
  addEnhancedSection(stats.byYoutubeCategory, 'YouTube Categories');
  addEnhancedSection(stats.byOttPlatform, 'OTT Platforms');
  addEnhancedSection(stats.byFilmIndustry, 'Film Industries');
  addEnhancedSection(stats.byTvChannel, 'TV Channels');
  addEnhancedSection(stats.byMusicGenre, 'Music Genres');
  addEnhancedSection(stats.byMusicMood, 'Music Moods');
  addEnhancedSection(stats.byMusicLanguage, 'Music Languages');
  
  // Demographics
  if (stats.byDemographics) {
    content += `DEMOGRAPHIC ANALYSIS\n`;
    content += `${'-'.repeat(19)}\n\n`;
    addEnhancedSection(stats.byDemographics.gender, 'Gender Distribution');
    addEnhancedSection(stats.byDemographics.age, 'Age Groups');
    addEnhancedSection(stats.byDemographics.region, 'Regional Analysis');
  }
  
  // User engagement
  if (stats.userNotes && stats.userNotes.length > 0) {
    content += `USER ENGAGEMENT METRICS\n`;
    content += `${'-'.repeat(23)}\n`;
    content += `Total Notes: ${stats.userNotes.length.toLocaleString()}\n`;
    content += `Engagement Rate: ${((stats.userNotes.length / stats.total) * 100).toFixed(1)}%\n`;
    content += `Average Note Length: ${Math.round(stats.userNotes.reduce((sum, note: any) => sum + ((note.notes || '').length || 0), 0) / stats.userNotes.length)} characters\n\n`;
  }
  
  // Footer
  content += `${'='.repeat(60)}\n`;
  content += `REPORT METADATA\n`;
  content += `Generated: ${new Date().toLocaleString()}\n`;
  content += `Format: Plain Text\n`;
  content += `Data Period: All Available\n`;
  content += `${'='.repeat(60)}\n`;
  
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${sectionName}_Comprehensive_Report_${new Date().toISOString().split('T')[0]}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
