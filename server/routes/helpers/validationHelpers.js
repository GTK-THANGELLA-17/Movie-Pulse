
function validateProjectSpecificFields(data) {
  const errors = [];
  
  if (data.projectType === 'Television') {
    if (!data.televisionChannel) errors.push("Television channel is required");
    if (!data.televisionContentType) errors.push("Television content type is required");
  }
  
  if (data.projectType === 'OTTPlatform') {
    if (!data.ottPlatform) errors.push("OTT platform is required");
    if (!data.genre) errors.push("Genre is required for OTT opinions");
  }
  
  if (data.projectType === 'YouTubeContent' && !data.youtubeContentCategory) {
    errors.push("YouTube content category is required");
  }
  
  if (['HighBudgetFilm', 'LowBudgetFilm', 'ShortFilm', 'YouTubeFilm'].includes(data.projectType)) {
    if (!data.filmIndustry) errors.push("Film industry is required");
    if (!data.genre) errors.push("Genre is required for film opinions");
  }
  
  return errors;
}

module.exports = {
  validateProjectSpecificFields
};
