
function determineCategory(projectType) {
  switch (projectType) {
    case 'Television': return 'television';
    case 'OTTPlatform': return 'streaming';
    case 'YouTubeContent':
    case 'YouTubeFilm': return 'youtube';
    default: return 'film';
  }
}

function generateAnswerFromData(data) {
  const parts = [];
  if (data.country) parts.push(`Country: ${data.country}`);
  if (data.filmIndustry) parts.push(`Film Industry: ${data.filmIndustry}`);
  if (data.genre) parts.push(`Genre: ${data.genre}`);
  if (data.ottPlatform) parts.push(`OTT Platform: ${data.ottPlatform}`);
  if (data.televisionChannel) parts.push(`TV Channel: ${data.televisionChannel}`);
  if (data.televisionContentType) parts.push(`Content Type: ${data.televisionContentType}`);
  if (data.youtubeContentCategory) parts.push(`YouTube Category: ${data.youtubeContentCategory}`);
  if (data.notes) parts.push(`Notes: ${data.notes}`);
  return parts.join(', ') || 'User preference submitted';
}

function calculateSentiment(answer, notes) {
  const text = [answer, notes].filter(Boolean).join(' ').toLowerCase();
  const positiveWords = ['love', 'great', 'excellent', 'good', 'amazing', 'fantastic', 'awesome', 'like', 'enjoy', 'prefer', 'best'];
  const negativeWords = ['hate', 'terrible', 'bad', 'poor', 'awful', 'horrible', 'disappointing', 'dislike', 'worst'];
  
  let score = 0;
  positiveWords.forEach(word => { if (text.includes(word)) score++; });
  negativeWords.forEach(word => { if (text.includes(word)) score--; });
  
  return score > 0 ? 'positive' : score < 0 ? 'negative' : 'neutral';
}

function createOpinionData(body) {
  return {
    category: body.category || determineCategory(body.projectType),
    projectType: body.projectType,
    question: body.question || `What's your preference for ${body.projectType}?`,
    answer: body.answer || generateAnswerFromData(body),
    userId: body.userId,
    demographics: {
      gender: body.demographics?.gender,
      age: body.demographics?.age,
      region: body.country || body.demographics?.region
    },
    tags: body.tags || [],
    televisionChannel: body.televisionChannel,
    televisionContentType: body.televisionContentType,
    ottPlatform: body.ottPlatform,
    youtubeContentCategory: body.youtubeContentCategory,
    filmIndustry: body.filmIndustry,
    genre: body.genre,
    country: body.country,
    notes: body.notes,
    sentiment: calculateSentiment(body.answer, body.notes)
  };
}

function getCurrentVotingPeriod() {
  return new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
}

module.exports = {
  determineCategory,
  generateAnswerFromData,
  calculateSentiment,
  createOpinionData,
  getCurrentVotingPeriod
};
