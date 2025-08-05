
import * as XLSX from 'xlsx';
import { ProcessedStats } from '@/types/stats';

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const calculatePercentage = (value: number, total: number) => {
  return total > 0 ? ((value / total) * 100).toFixed(1) : '0.0';
};

const formatDataForExport = (data: Record<string, number>, title: string, total: number) => {
  return Object.entries(data)
    .filter(([_, value]) => value > 0)
    .sort(([, a], [, b]) => b - a)
    .map(([name, value]) => ({
      [title]: name,
      Count: value,
      Percentage: `${calculatePercentage(value, total)}%`
    }));
};

export const exportSectionToExcel = (stats: ProcessedStats, filename: string, sectionType: string) => {
  const workbook = XLSX.utils.book_new();
  
  // Summary sheet
  const summaryData = [
    ['Section', sectionType.charAt(0).toUpperCase() + sectionType.slice(1)],
    ['Total Opinions', stats.total],
    ['Recent Opinions (7 days)', stats.recent],
    ['Export Date', formatDate(new Date())],
    [''],
    ['Summary Statistics', ''],
    ['Total Countries', Object.keys(stats.byCountry || {}).length],
    ['Total Project Types', Object.keys(stats.byProjectType || {}).length]
  ];

  const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');

  // Project Types sheet
  if (Object.keys(stats.byProjectType || {}).length > 0) {
    const projectTypeData = formatDataForExport(stats.byProjectType, 'Project Type', stats.total);
    const projectTypeSheet = XLSX.utils.json_to_sheet(projectTypeData);
    XLSX.utils.book_append_sheet(workbook, projectTypeSheet, 'Project Types');
  }

  // Countries sheet
  if (Object.keys(stats.byCountry || {}).length > 0) {
    const countryData = formatDataForExport(stats.byCountry, 'Country', stats.total);
    const countrySheet = XLSX.utils.json_to_sheet(countryData);
    XLSX.utils.book_append_sheet(workbook, countrySheet, 'Countries');
  }

  // Section-specific sheets
  switch (sectionType) {
    case 'films':
      if (Object.keys(stats.byGenre || {}).length > 0) {
        const genreData = formatDataForExport(stats.byGenre, 'Genre', stats.total);
        const genreSheet = XLSX.utils.json_to_sheet(genreData);
        XLSX.utils.book_append_sheet(workbook, genreSheet, 'Film Genres');
      }
      if (Object.keys(stats.byFilmIndustry || {}).length > 0) {
        const industryData = formatDataForExport(stats.byFilmIndustry, 'Film Industry', stats.total);
        const industrySheet = XLSX.utils.json_to_sheet(industryData);
        XLSX.utils.book_append_sheet(workbook, industrySheet, 'Film Industries');
      }
      break;
      
    case 'music':
      if (Object.keys(stats.byMusicGenre || {}).length > 0) {
        const musicGenreData = formatDataForExport(stats.byMusicGenre, 'Music Genre', stats.total);
        const musicGenreSheet = XLSX.utils.json_to_sheet(musicGenreData);
        XLSX.utils.book_append_sheet(workbook, musicGenreSheet, 'Music Genres');
      }
      if (Object.keys(stats.byMusicMood || {}).length > 0) {
        const moodData = formatDataForExport(stats.byMusicMood, 'Music Mood', stats.total);
        const moodSheet = XLSX.utils.json_to_sheet(moodData);
        XLSX.utils.book_append_sheet(workbook, moodSheet, 'Music Moods');
      }
      if (Object.keys(stats.byMusicLanguage || {}).length > 0) {
        const languageData = formatDataForExport(stats.byMusicLanguage, 'Music Language', stats.total);
        const languageSheet = XLSX.utils.json_to_sheet(languageData);
        XLSX.utils.book_append_sheet(workbook, languageSheet, 'Music Languages');
      }
      break;

    case 'youtube-content':
      if (Object.keys(stats.byYoutubeCategory || {}).length > 0) {
        const categoryData = formatDataForExport(stats.byYoutubeCategory, 'YouTube Category', stats.total);
        const categorySheet = XLSX.utils.json_to_sheet(categoryData);
        XLSX.utils.book_append_sheet(workbook, categorySheet, 'YouTube Categories');
      }
      if (Object.keys(stats.byYoutubeChannelType || {}).length > 0) {
        const channelData = formatDataForExport(stats.byYoutubeChannelType, 'Channel Type', stats.total);
        const channelSheet = XLSX.utils.json_to_sheet(channelData);
        XLSX.utils.book_append_sheet(workbook, channelSheet, 'Channel Types');
      }
      break;

    case 'ott':
      if (Object.keys(stats.byOttPlatform || {}).length > 0) {
        const platformData = formatDataForExport(stats.byOttPlatform, 'OTT Platform', stats.total);
        const platformSheet = XLSX.utils.json_to_sheet(platformData);
        XLSX.utils.book_append_sheet(workbook, platformSheet, 'OTT Platforms');
      }
      if (Object.keys(stats.byOttSeriesType || {}).length > 0) {
        const seriesData = formatDataForExport(stats.byOttSeriesType, 'Series Type', stats.total);
        const seriesSheet = XLSX.utils.json_to_sheet(seriesData);
        XLSX.utils.book_append_sheet(workbook, seriesSheet, 'Series Types');
      }
      break;

    case 'television':
      if (Object.keys(stats.byTvChannel || {}).length > 0) {
        const channelData = formatDataForExport(stats.byTvChannel, 'TV Channel', stats.total);
        const channelSheet = XLSX.utils.json_to_sheet(channelData);
        XLSX.utils.book_append_sheet(workbook, channelSheet, 'TV Channels');
      }
      if (Object.keys(stats.byTelevisionContentType || {}).length > 0) {
        const contentData = formatDataForExport(stats.byTelevisionContentType, 'Content Type', stats.total);
        const contentSheet = XLSX.utils.json_to_sheet(contentData);
        XLSX.utils.book_append_sheet(workbook, contentSheet, 'Content Types');
      }
      break;

    case 'instagram-content':
      if (Object.keys(stats.byInstagramCategory || {}).length > 0) {
        const instagramData = formatDataForExport(stats.byInstagramCategory, 'Instagram Category', stats.total);
        const instagramSheet = XLSX.utils.json_to_sheet(instagramData);
        XLSX.utils.book_append_sheet(workbook, instagramSheet, 'Instagram Categories');
      }
      break;
  }

  // Demographics sheet
  if (stats.byDemographics) {
    const demographicsData = [];
    
    if (stats.byDemographics.gender && Object.keys(stats.byDemographics.gender).length > 0) {
      demographicsData.push(['Gender Distribution', '', '']);
      Object.entries(stats.byDemographics.gender).forEach(([gender, count]) => {
        demographicsData.push([gender, count, `${calculatePercentage(count, stats.total)}%`]);
      });
      demographicsData.push(['', '', '']);
    }
    
    if (stats.byDemographics.age && Object.keys(stats.byDemographics.age).length > 0) {
      demographicsData.push(['Age Distribution', '', '']);
      Object.entries(stats.byDemographics.age).forEach(([age, count]) => {
        demographicsData.push([age, count, `${calculatePercentage(count, stats.total)}%`]);
      });
      demographicsData.push(['', '', '']);
    }
    
    if (stats.byDemographics.region && Object.keys(stats.byDemographics.region).length > 0) {
      demographicsData.push(['Regional Distribution', '', '']);
      Object.entries(stats.byDemographics.region).forEach(([region, count]) => {
        demographicsData.push([region, count, `${calculatePercentage(count, stats.total)}%`]);
      });
    }

    if (demographicsData.length > 0) {
      const demographicsSheet = XLSX.utils.aoa_to_sheet([
        ['Category', 'Count', 'Percentage'],
        ...demographicsData
      ]);
      XLSX.utils.book_append_sheet(workbook, demographicsSheet, 'Demographics');
    }
  }

  // User Notes sheet
  if (stats.userNotes && stats.userNotes.length > 0) {
    const notesData = stats.userNotes.map((note: any, index: number) => ({
      '#': index + 1,
      'Note': typeof note === 'string' ? note : note.notes || '',
      'Genre': typeof note === 'object' ? (note.genre || 'Unknown') : 'Unknown',
      'Country': typeof note === 'object' ? (note.country || 'Unknown') : 'Unknown',
      'Date': typeof note === 'object' ? (note.createdAt ? new Date(note.createdAt).toLocaleDateString() : 'Unknown') : 'Unknown'
    }));
    
    const notesSheet = XLSX.utils.json_to_sheet(notesData);
    XLSX.utils.book_append_sheet(workbook, notesSheet, 'User Notes');
  }

  XLSX.writeFile(workbook, `${filename}.xlsx`);
};

export const exportSectionToWord = (stats: ProcessedStats, filename: string, sectionType: string) => {
  const sectionTitle = sectionType.charAt(0).toUpperCase() + sectionType.slice(1);
  
  let content = `${sectionTitle} Statistics Report\n`;
  content += `Generated on: ${formatDate(new Date())}\n\n`;
  
  content += `SUMMARY\n`;
  content += `Total Opinions: ${stats.total}\n`;
  content += `Recent Opinions (7 days): ${stats.recent}\n`;
  content += `Countries Represented: ${Object.keys(stats.byCountry || {}).length}\n\n`;

  // Project Types
  if (Object.keys(stats.byProjectType || {}).length > 0) {
    content += `PROJECT TYPES\n`;
    Object.entries(stats.byProjectType)
      .sort(([,a], [,b]) => b - a)
      .forEach(([type, count]) => {
        content += `${type}: ${count} (${calculatePercentage(count, stats.total)}%)\n`;
      });
    content += `\n`;
  }

  // Countries
  if (Object.keys(stats.byCountry || {}).length > 0) {
    content += `COUNTRY DISTRIBUTION\n`;
    Object.entries(stats.byCountry)
      .sort(([,a], [,b]) => b - a)
      .forEach(([country, count]) => {
        content += `${country}: ${count} (${calculatePercentage(count, stats.total)}%)\n`;
      });
    content += `\n`;
  }

  // Section-specific content
  switch (sectionType) {
    case 'films':
      if (Object.keys(stats.byGenre || {}).length > 0) {
        content += `FILM GENRES\n`;
        Object.entries(stats.byGenre)
          .sort(([,a], [,b]) => b - a)
          .forEach(([genre, count]) => {
            content += `${genre}: ${count} (${calculatePercentage(count, stats.total)}%)\n`;
          });
        content += `\n`;
      }
      if (Object.keys(stats.byFilmIndustry || {}).length > 0) {
        content += `FILM INDUSTRIES\n`;
        Object.entries(stats.byFilmIndustry)
          .sort(([,a], [,b]) => b - a)
          .forEach(([industry, count]) => {
            content += `${industry}: ${count} (${calculatePercentage(count, stats.total)}%)\n`;
          });
        content += `\n`;
      }
      break;
      
    case 'music':
      if (Object.keys(stats.byMusicGenre || {}).length > 0) {
        content += `MUSIC GENRES\n`;
        Object.entries(stats.byMusicGenre)
          .sort(([,a], [,b]) => b - a)
          .forEach(([genre, count]) => {
            content += `${genre}: ${count} (${calculatePercentage(count, stats.total)}%)\n`;
          });
        content += `\n`;
      }
      if (Object.keys(stats.byMusicMood || {}).length > 0) {
        content += `MUSIC MOODS\n`;
        Object.entries(stats.byMusicMood)
          .sort(([,a], [,b]) => b - a)
          .forEach(([mood, count]) => {
            content += `${mood}: ${count} (${calculatePercentage(count, stats.total)}%)\n`;
          });
        content += `\n`;
      }
      break;
  }

  // Demographics
  if (stats.byDemographics) {
    if (stats.byDemographics.gender && Object.keys(stats.byDemographics.gender).length > 0) {
      content += `GENDER DISTRIBUTION\n`;
      Object.entries(stats.byDemographics.gender)
        .sort(([,a], [,b]) => b - a)
        .forEach(([gender, count]) => {
          content += `${gender}: ${count} (${calculatePercentage(count, stats.total)}%)\n`;
        });
      content += `\n`;
    }
    
    if (stats.byDemographics.age && Object.keys(stats.byDemographics.age).length > 0) {
      content += `AGE DISTRIBUTION\n`;
      Object.entries(stats.byDemographics.age)
        .sort(([,a], [,b]) => b - a)
        .forEach(([age, count]) => {
          content += `${age}: ${count} (${calculatePercentage(count, stats.total)}%)\n`;
        });
      content += `\n`;
    }
  }

  // User Notes
  if (stats.userNotes && stats.userNotes.length > 0) {
    content += `USER FEEDBACK\n`;
    stats.userNotes.forEach((note: any, index: number) => {
      const noteText = typeof note === 'string' ? note : note.notes || '';
      const genre = typeof note === 'object' ? (note.genre || 'Unknown Genre') : 'Unknown Genre';
      content += `${index + 1}. ${noteText} (${genre})\n`;
    });
  }

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const exportSectionToText = (stats: ProcessedStats, filename: string, sectionType: string) => {
  exportSectionToWord(stats, filename, sectionType);
};
