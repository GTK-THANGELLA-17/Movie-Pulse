const BaseAnalytics = require('./analytics/baseAnalytics');
const TimeSeriesAnalytics = require('./analytics/timeSeriesAnalytics');
const DemographicAnalytics = require('./analytics/demographicAnalytics');
const PlatformAnalytics = require('./analytics/platformAnalytics');
const VotingAnalytics = require('./analytics/votingAnalytics');

class StatisticsService {
  // Enhanced analytics with comprehensive opinion data processing
  static async getAnalytics(includeRemoteData = true) {
    try {
      console.log('📊 Generating enhanced analytics with comprehensive data processing...');
      
      if (!includeRemoteData) {
        return this.getLocalOnlyAnalytics();
      }

      const [
        totalStats,
        categoryBreakdown,
        sentimentAnalysis,
        regionalDistribution,
        timeSeriesData,
        categoryTrends,
        demographicBreakdown,
        deviceStats,
        platformStats,
        userNotes
      ] = await Promise.all([
        BaseAnalytics.getTotalStats(),
        BaseAnalytics.getCategoryBreakdown(),
        BaseAnalytics.getSentimentAnalysis(),
        BaseAnalytics.getRegionalDistribution(),
        TimeSeriesAnalytics.getTimeSeriesData(),
        TimeSeriesAnalytics.getCategoryTrends(),
        DemographicAnalytics.getDemographicBreakdown(),
        DemographicAnalytics.getDeviceStats(),
        PlatformAnalytics.getPlatformSpecificStats(),
        this.getUserNotes()
      ]);

      return {
        totalOpinions: totalStats.total || 0,
        categoryBreakdown,
        sentimentAnalysis,
        regionalDistribution,
        timeData: timeSeriesData,
        categoryTrends,
        demographicBreakdown,
        deviceStats,
        platformStats: {
          ...platformStats,
          byTelevisionContentType: platformStats.byTelevisionContentType || {},
          byYoutubeChannelType: platformStats.byYoutubeChannelType || {},
          byOttSeriesType: platformStats.byOttSeriesType || {},
          byInstagramCategory: platformStats.byInstagramCategory || {},
          byMusicGenre: platformStats.byMusicGenre || {},
          byMusicMood: platformStats.byMusicMood || {},
          byMusicLanguage: platformStats.byMusicLanguage || {}
        },
        userNotes: userNotes || [],
        metadata: {
          includesRemoteData: true,
          generatedAt: new Date().toISOString(),
          dataSource: 'combined',
          lastUpdated: totalStats.lastUpdated,
          userNotesCount: userNotes?.length || 0
        }
      };
    } catch (error) {
      console.error('❌ Analytics generation error:', error);
      return this.getLocalOnlyAnalytics();
    }
  }

  // Enhanced section-specific analytics with comprehensive field mapping
  static async getSectionAnalytics(sectionType) {
    try {
      console.log(`📊 Generating comprehensive section analytics for: ${sectionType}`);
      
      const Opinion = require('../models/Opinion');
      
      // Define section-specific project types with exact mapping
      const sectionProjectTypeMap = {
        music: ['MusicContent'],
        films: ['Films'],
        'youtube-films': ['YouTubeFilm'],
        'youtube-content': ['YouTubeContent'],
        'instagram-content': ['InstagramContent'],
        ott: ['OTTPlatform'],
        television: ['Television']
      };

      const relevantProjectTypes = sectionProjectTypeMap[sectionType];
      if (!relevantProjectTypes) {
        throw new Error(`Invalid section type: ${sectionType}`);
      }

      const matchFilter = {
        projectType: { $in: relevantProjectTypes }
      };

      // Get raw opinions for comprehensive processing
      const rawOpinions = await Opinion.find(matchFilter).lean();
      console.log(`Found ${rawOpinions.length} opinions for section ${sectionType}`);

      // Process opinions to extract all fields
      const stats = this.processOpinionsComprehensively(rawOpinions);
      
      // Get user notes for this section
      const userNotes = await this.getUserNotes(sectionType);
      
      return {
        ...stats,
        userNotes: userNotes,
        metadata: {
          sectionType,
          generatedAt: new Date().toISOString(),
          userNotesCount: userNotes.length,
          projectTypes: relevantProjectTypes,
          totalOpinions: rawOpinions.length
        }
      };
    } catch (error) {
      console.error(`❌ Error generating section analytics for ${sectionType}:`, error);
      throw error;
    }
  }

  // Comprehensive opinion processing to extract all data fields
  static processOpinionsComprehensively(opinions) {
    const stats = {
      total: opinions.length,
      recent: 0,
      byGenre: {},
      byCountry: {},
      byProjectType: {},
      byFilmIndustry: {},
      byTelevisionChannel: {},
      byTelevisionContentType: {},
      byYoutubeCategory: {},
      byYoutubeChannelType: {},
      byOttPlatform: {},
      byOttSeriesType: {},
      byInstagramCategory: {},
      byMusicGenre: {},
      byMusicMood: {},
      byMusicLanguage: {},
      byDemographics: { gender: {}, age: {}, region: {} }
    };

    // Calculate recent opinions (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Safe increment function
    const safeIncrement = (obj, key) => {
      if (key && typeof key === 'string' && key.trim() !== '') {
        obj[key] = (obj[key] || 0) + 1;
      }
    };

    opinions.forEach(op => {
      if (!op) return;

      // Check if recent
      const timestamp = op.createdAt || op.timestamp || op.submittedAt;
      if (timestamp && new Date(timestamp) > sevenDaysAgo) {
        stats.recent++;
      }

      // Core fields
      safeIncrement(stats.byProjectType, op.projectType);
      safeIncrement(stats.byCountry, op.country);
      safeIncrement(stats.byGenre, op.genre);

      // Project-specific fields
      if (op.projectType === 'Films') {
        safeIncrement(stats.byFilmIndustry, op.filmIndustry);
      }
      
      if (op.projectType === 'Television') {
        safeIncrement(stats.byTelevisionChannel, op.televisionChannel);
        safeIncrement(stats.byTelevisionContentType, op.televisionContentType);
      }
      
      if (op.projectType === 'YouTubeContent' || op.projectType === 'YouTubeFilm') {
        safeIncrement(stats.byYoutubeCategory, op.youtubeContentCategory);
        safeIncrement(stats.byYoutubeChannelType, op.youtubeChannelType);
      }
      
      if (op.projectType === 'OTTPlatform') {
        safeIncrement(stats.byOttPlatform, op.ottPlatform);
        safeIncrement(stats.byOttSeriesType, op.ottSeriesType);
      }
      
      if (op.projectType === 'InstagramContent') {
        safeIncrement(stats.byInstagramCategory, op.instagramContentType);
      }
      
      if (op.projectType === 'MusicContent') {
        safeIncrement(stats.byMusicGenre, op.musicGenre);
        safeIncrement(stats.byMusicMood, op.musicMood);
        safeIncrement(stats.byMusicLanguage, op.musicLanguage);
      }

      // Demographics
      if (op.demographics) {
        safeIncrement(stats.byDemographics.gender, op.demographics.gender);
        safeIncrement(stats.byDemographics.age, op.demographics.age);
        safeIncrement(stats.byDemographics.region, op.demographics.region);
      }
    });

    return stats;
  }

  // Get user notes with enhanced filtering
  static async getUserNotes(sectionType = null) {
    try {
      const Opinion = require('../models/Opinion');
      
      let matchFilter = {
        notes: { $exists: true, $ne: null, $ne: '' }
      };

      // Add section-specific filtering
      if (sectionType && sectionType !== 'local') {
        const sectionProjectTypeMap = {
          music: ['MusicContent'],
          films: ['Films'],
          'youtube-films': ['YouTubeFilm'],
          'youtube-content': ['YouTubeContent'],
          'instagram-content': ['InstagramContent'],
          ott: ['OTTPlatform'],
          television: ['Television']
        };
        
        const relevantProjectTypes = sectionProjectTypeMap[sectionType];
        if (relevantProjectTypes) {
          matchFilter.projectType = { $in: relevantProjectTypes };
        }
      }

      const userNotes = await Opinion.find(matchFilter)
        .select('notes projectType genre filmIndustry televisionChannel televisionContentType youtubeContentCategory youtubeChannelType ottPlatform ottSeriesType instagramContentType musicGenre musicMood musicLanguage country demographics createdAt')
        .sort({ createdAt: -1 })
        .limit(100)
        .lean();

      console.log(`📝 Retrieved ${userNotes.length} user notes for section: ${sectionType || 'all'}`);
      
      return userNotes.map(note => ({
        notes: note.notes,
        projectType: note.projectType,
        genre: note.genre,
        filmIndustry: note.filmIndustry,
        televisionChannel: note.televisionChannel,
        televisionContentType: note.televisionContentType,
        youtubeContentCategory: note.youtubeContentCategory,
        youtubeChannelType: note.youtubeChannelType,
        ottPlatform: note.ottPlatform,
        ottSeriesType: note.ottSeriesType,
        instagramContentType: note.instagramContentType,
        musicGenre: note.musicGenre,
        musicMood: note.musicMood,
        musicLanguage: note.musicLanguage,
        country: note.country,
        demographics: note.demographics,
        createdAt: note.createdAt
      }));
    } catch (error) {
      console.error('❌ Error fetching user notes:', error);
      return [];
    }
  }

  // Helper function to convert array to count object
  static arrayToCount(arr) {
    return arr.reduce((acc, item) => {
      if (item && typeof item === 'string' && item.trim() !== '') {
        acc[item] = (acc[item] || 0) + 1;
      }
      return acc;
    }, {});
  }

  // Helper function to process demographics
  static processDemographics(demographics) {
    const result = { gender: {}, age: {}, region: {} };
    
    demographics.forEach(demo => {
      if (demo && typeof demo === 'object') {
        if (demo.gender && demo.gender.trim() !== '') result.gender[demo.gender] = (result.gender[demo.gender] || 0) + 1;
        if (demo.age && demo.age.trim() !== '') result.age[demo.age] = (result.age[demo.age] || 0) + 1;
        if (demo.region && demo.region.trim() !== '') result.region[demo.region] = (result.region[demo.region] || 0) + 1;
      }
    });
    
    return result;
  }

  static async getVotingStatistics() {
    return await VotingAnalytics.getVotingStatistics();
  }

  static async getRealTimeStats() {
    return await TimeSeriesAnalytics.getRealTimeStats();
  }

  static getLocalOnlyAnalytics() {
    return {
      totalOpinions: 0,
      categoryBreakdown: [],
      sentimentAnalysis: [],
      regionalDistribution: [],
      timeData: [],
      categoryTrends: [],
      demographicBreakdown: { age: [], gender: [], region: [] },
      deviceStats: [],
      platformStats: { 
        film: [], 
        television: [], 
        streaming: [], 
        youtube: [], 
        instagram: [], 
        music: [],
        ottSeriesType: [], 
        televisionContentType: [], 
        youtubeChannelType: [],
        byTelevisionContentType: {},
        byYoutubeChannelType: {},
        byOttSeriesType: {},
        byInstagramCategory: {},
        byMusicGenre: {},
        byMusicMood: {},
        byMusicLanguage: {}
      },
      userNotes: [],
      metadata: {
        includesRemoteData: false,
        generatedAt: new Date().toISOString(),
        dataSource: 'local-only',
        userNotesCount: 0
      }
    };
  }
}

module.exports = StatisticsService;
