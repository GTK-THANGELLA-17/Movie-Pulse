
export const getAdvancedResponse = (input: string): string => {
  const lowerInput = input.toLowerCase();
  
  // Enhanced responses with comprehensive platform information
  if (lowerInput.includes('platform') || lowerInput.includes('what is') || lowerInput.includes('about')) {
    return "🎬 MoviePulse is the world's most comprehensive entertainment intelligence platform! We collect and analyze audience preferences across Films, Television, OTT platforms, and YouTube content from viewers worldwide. Our mission is to democratize entertainment insights and help creators make data-driven decisions that resonate with global audiences. We're building the future where every voice shapes entertainment! ✨🌍";
  }
  
  if (lowerInput.includes('how') && (lowerInput.includes('work') || lowerInput.includes('use'))) {
    return "📝 Using MoviePulse is incredibly simple and powerful! Step 1: Navigate to 'Cast Your Opinion' → Step 2: Choose your content category (Films, TV, OTT, YouTube) → Step 3: Rate content and share detailed feedback → Step 4: Provide demographic details to enhance insights → Step 5: Submit and instantly see your impact on global entertainment intelligence! Your opinion immediately becomes part of our worldwide analytics that creators and studios use for decision-making! 🚀";
  }
  
  if (lowerInput.includes('stats') || lowerInput.includes('data') || lowerInput.includes('analytics')) {
    return "📊 Our analytics are revolutionary! Experience real-time demographic breakdowns showing what different age groups, genders, and countries prefer. View trending content insights, exportable reports in Excel/Word/Text formats, visual charts and graphs, regional preference mapping, and predictive trend analysis. Every piece of data helps shape the $2.3 trillion global entertainment industry! The insights are updated live and show exactly how different demographics engage with content! 📈✨";
  }
  
  if (lowerInput.includes('benefit') || lowerInput.includes('why') || lowerInput.includes('advantage')) {
    return "💡 The benefits are game-changing! FOR AUDIENCES: Your voice directly influences what gets made, discover content that matches your preferences, connect with like-minded viewers globally. FOR CREATORS: Reduce production risks by 60%, understand exactly what audiences want, make data-backed content decisions, reach global markets effectively. FOR THE INDUSTRY: Better ROI on content investments, reduced flops, more satisfied audiences, cultural bridge-building through entertainment! 🎯🌟";
  }
  
  if (lowerInput.includes('global') || lowerInput.includes('worldwide') || lowerInput.includes('international')) {
    return "🌎 We're proudly building the world's largest entertainment opinion network! Currently collecting insights from 180+ countries, supporting multiple languages, respecting cultural preferences while identifying universal trends. Our global reach helps creators understand how content performs across different markets, what travels well internationally, and how to create universally appealing content while maintaining cultural authenticity! 🌍🎭";
  }
  
  if (lowerInput.includes('free') || lowerInput.includes('cost') || lowerInput.includes('price')) {
    return "🎉 Completely FREE for all audience members! Share unlimited opinions, access community insights, view trending data, download personal analytics - all at zero cost! Our mission is to democratize entertainment intelligence. We believe every voice should be heard regardless of economic status. Premium features for industry professionals help fund the free platform for everyone! 💝🎁";
  }
  
  if (lowerInput.includes('privacy') || lowerInput.includes('safe') || lowerInput.includes('secure')) {
    return "🔐 Your privacy and security are paramount! We use enterprise-grade encryption, never sell personal data, anonymize all analytics, provide granular privacy controls, comply with GDPR/CCPA regulations, and give you complete control over your data. You decide what to share - from basic preferences to detailed demographics. All opinions are aggregated and anonymized for insights while keeping your identity protected! 🛡️✨";
  }
  
  if (lowerInput.includes('creator') || lowerInput.includes('producer') || lowerInput.includes('studio')) {
    return "🎭 A creator's dream platform! Get unprecedented audience insights before, during, and after production. Understand demographic preferences, test concepts with real audiences, identify emerging trends, reduce production risks significantly, optimize marketing strategies, and access exportable data for presentations and decision-making. Major studios are already using similar insights to guide their $200B+ annual content investments! 📈🎬";
  }
  
  if (lowerInput.includes('feature') || lowerInput.includes('functionality') || lowerInput.includes('capabilities')) {
    return "⚡ Packed with cutting-edge features! Multi-platform opinion collection (Films/TV/OTT/YouTube), real-time analytics dashboard, demographic breakdowns, trend analysis, data export (Excel/Word/Text), global insights, sentiment analysis, preference mapping, mobile-responsive design, intelligent chatbot assistance (that's me!), voting period management, and comprehensive reporting tools. Plus exciting features coming soon like AI predictions and mobile apps! 🤖🚀";
  }
  
  if (lowerInput.includes('future') || lowerInput.includes('roadmap') || lowerInput.includes('upcoming') || lowerInput.includes('next')) {
    return "🚀 The future is incredibly exciting! Coming soon: AI-powered trend predictions, mobile apps for iOS/Android, enterprise API integrations, real-time collaboration tools for teams, blockchain verification for data authenticity, personalized recommendation engines, industry partnership integrations, and advanced visualization tools. We're also exploring VR/AR content opinions and social features! Your feedback directly influences our development priorities! 🔮✨";
  }
  
  if (lowerInput.includes('vote') || lowerInput.includes('voting') || lowerInput.includes('opinion') || lowerInput.includes('cast')) {
    return "🗳️ Voting is your superpower on MoviePulse! Head to our 'Cast Your Opinion' section to rate and review Films, TV shows, OTT content, and YouTube videos. Each vote joins a global chorus shaping entertainment's future - your voice influences everything from genre preferences to budget decisions! The current voting period runs until August 15, 2025, with the next period starting September 1-15, 2025! 🌊⚡";
  }
  
  if (lowerInput.includes('period') || lowerInput.includes('deadline') || lowerInput.includes('when')) {
    return "⏰ Current voting period: Active until August 15, 2025! Next voting period: September 1-15, 2025. During active periods, your opinions have maximum impact on entertainment decision-making. Between periods, you can still explore insights and prepare for the next round of influence! Don't miss your chance to shape the future of entertainment! 📅🎬";
  }
  
  if (lowerInput.includes('notes') || lowerInput.includes('feedback') || lowerInput.includes('comment')) {
    return "📝 Your notes and feedback are incredibly valuable! When casting opinions, add detailed notes about what you loved, what could be improved, and your suggestions. These insights appear in our analytics dashboard, helping creators understand exactly what audiences want. Your written feedback often becomes the most quoted insights in industry reports! Every note matters! ✨💬";
  }
  
  if (lowerInput.includes('download') || lowerInput.includes('export') || lowerInput.includes('excel') || lowerInput.includes('word')) {
    return "📊 Export your impact! Our enhanced analytics can be downloaded in multiple formats: Excel spreadsheets with detailed demographic breakdowns, Word documents with comprehensive insights, and text files for quick analysis. See exactly how your opinions and those from your demographic contribute to global entertainment trends! Download and share the data that matters! 📈💾";
  }
  
  // Default comprehensive response
  return "🎬 Welcome to MoviePulse - where every opinion shapes entertainment's future! I'm your AI assistant, ready to help you discover how our platform revolutionizes the entertainment industry through audience intelligence. Ask me about features, voting periods, analytics, privacy, global reach, or anything else about MoviePulse! What aspect interests you most? ✨🎭";
};
