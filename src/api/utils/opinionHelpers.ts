
import { OpinionData } from '../types/opinionTypes';

export function generateAnswerFromOpinionData(data: OpinionData): string {
  const parts = [];
  if (data.country) parts.push(`Country: ${data.country}`);
  if (data.filmIndustry) parts.push(`Film Industry: ${data.filmIndustry}`);
  if (data.genre) parts.push(`Genre: ${data.genre}`);
  if (data.ottPlatform) parts.push(`OTT Platform: ${data.ottPlatform}`);
  if (data.televisionChannel) parts.push(`TV Channel: ${data.televisionChannel}`);
  if (data.televisionContentType) parts.push(`Content Type: ${data.televisionContentType}`);
  if (data.youtubeContentCategory) parts.push(`YouTube Category: ${data.youtubeContentCategory}`);
  if (data.instagramContentType) parts.push(`Instagram Content: ${data.instagramContentType}`);
  if (data.notes) parts.push(`Notes: ${data.notes}`);
  return parts.join(', ') || 'User preference submitted';
}

export function updateEnhancedVotesTracker(projectType: string, response: any) {
  try {
    const votesData = localStorage.getItem('Audience-Pulse-votes-enhanced') || '{}';
    const votes = JSON.parse(votesData);
    
    if (!votes.categories) votes.categories = {};
    
    votes.categories[projectType] = {
      voted: true,
      timestamp: new Date().toISOString(),
      voteRecordId: response.voteRecord,
      enhanced: true,
      preventionActive: response.preventionActive
    };
    
    if (!votes.votingPeriodEnd) {
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 30);
      votes.votingPeriodEnd = endDate.toISOString();
    }
    
    localStorage.setItem('Audience-Pulse-votes-enhanced', JSON.stringify(votes));
    console.log('✅ Enhanced votes tracker updated');
  } catch (error) {
    console.error('❌ Enhanced vote tracker error:', error);
  }
}
