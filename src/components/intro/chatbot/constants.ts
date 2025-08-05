
import { QuickQuestion, Category } from './types';

export const categories: Category[] = [
  { id: "basics", name: "Basics", icon: "🎬" },
  { id: "features", name: "Features", icon: "⚡" },
  { id: "advanced", name: "Advanced", icon: "🚀" },
  { id: "premium", name: "Premium", icon: "⭐" },
  { id: "technical", name: "Technical", icon: "🔧" },
  { id: "impact", name: "Impact", icon: "🏆" }
];

export const quickQuestions: QuickQuestion[] = [
  // Basics Category - Essential Information
  {
    id: "what-is-audiencepulse",
    question: "What is AUDIENCE PULSE?",
    answer: "🎬 AUDIENCE PULSE is a revolutionary platform where YOUR voice shapes tomorrow's entertainment! We're not just another voting app - we're the bridge between audiences and creators, giving you the power to influence what gets made BEFORE it's produced. 🚀✨ Join millions of viewers worldwide in creating the future of entertainment!",
    icon: "🎬",
    category: "basics"
  },
  {
    id: "how-it-works",
    question: "How does it work?",
    answer: "🎯 Simple magic! Cast your opinions on upcoming projects across Films, TV, OTT, YouTube, Instagram, and Music. Your preferences get aggregated with thousands of other viewers to create powerful insights that creators actually use! 📊 Navigate through our intuitive sections: Vote → Stats → Insights → Impact! 🌟",
    icon: "⚡",
    category: "basics"
  },
  {
    id: "platform-features",
    question: "What features does this app have?",
    answer: "🚀 Our app is packed with features! 📊 Real-time statistics, 📈 trending insights, 🎯 demographic breakdowns, 🌍 global analytics, 📱 mobile-optimized interface, 🔒 secure voting, 💾 data export, 🎪 exclusive content, and 🤖 AI-powered predictions! Everything you need to make your voice heard!",
    icon: "🛠️",
    category: "basics"
  },
  {
    id: "get-started",
    question: "How do I get started?",
    answer: "🎉 Getting started is super easy! 1️⃣ Navigate to the Vote section 2️⃣ Choose your content category (Films, TV, OTT, YouTube, etc.) 3️⃣ Cast your opinions 4️⃣ Check out real-time stats 5️⃣ Explore insights and trends! 🚀 Your entertainment journey starts with one click!",
    icon: "🎯",
    category: "basics"
  },

  // Features Category - Platform Capabilities
  {
    id: "real-time-impact",
    question: "Can I see real-time impact?",
    answer: "⚡ YES! Watch your opinions create waves in real-time! 📊 Our Stats section shows instant impact across demographics and regions. See live charts, trending insights, demographic breakdowns, and global analytics! 🌊 Your voice matters and you can see exactly how! ✨",
    icon: "📈",
    category: "features"
  },
  {
    id: "global-influence",
    question: "How global is the influence?",
    answer: "🌍 Massively global! Your voice joins millions from 50+ countries, creating a truly international perspective! 🌏 Check our regional distribution charts, country-wise trends, and see what's trending in Tokyo, Hollywood, Bollywood, and beyond! 🗺️🚀",
    icon: "🌍",
    category: "features"
  },
  {
    id: "statistics-dashboard",
    question: "What statistics can I view?",
    answer: "📊 Comprehensive analytics at your fingertips! View demographic breakdowns, content-specific stats, regional distributions, trending insights, vote patterns, engagement metrics, and predictive analytics! 📈 Our dashboard transforms data into actionable entertainment insights! 🔍✨",
    icon: "📊",
    category: "features"
  },
  {
    id: "content-categories",
    question: "What content can I vote on?",
    answer: "🎭 EVERYTHING in entertainment! 🎬 Films (Bollywood, Hollywood, Regional), 📺 Television shows, 🎮 OTT platforms, 📱 YouTube content, 📸 Instagram creators, 🎵 Music across all genres, and emerging entertainment formats! Your voice shapes it all! 🌟",
    icon: "🎪",
    category: "features"
  },

  // Advanced Category - Technical Features
  {
    id: "ai-predictions",
    question: "Do you use AI for predictions?",
    answer: "🤖 Absolutely! Our advanced AI analyzes voting patterns, demographic trends, content preferences, and sentiment analysis to predict what will be the next big hit! 📈 Machine learning algorithms identify emerging trends before they go mainstream. It's like having a crystal ball for entertainment! 🔮✨",
    icon: "🤖",
    category: "advanced"
  },
  {
    id: "creator-partnerships",
    question: "Who are your creator partners?",
    answer: "🎭 We partner with major studios, independent filmmakers, streaming platforms, music labels, and content creators globally! 🌍 From Hollywood blockbusters to indie gems, K-pop to Bollywood - our network spans the entire entertainment ecosystem! 🤝 Your votes reach real decision-makers! 🎪🎵",
    icon: "🤝",
    category: "advanced"
  },
  {
    id: "data-analytics",
    question: "How advanced are your analytics?",
    answer: "🔥 Next-level analytics! We use advanced data science, predictive modeling, sentiment analysis, demographic clustering, trend forecasting, and real-time aggregation! 📊 Our algorithms process millions of data points to deliver insights that actually influence entertainment decisions! 🚀🎯",
    icon: "🔥",
    category: "advanced"
  },
  {
    id: "api-integration",
    question: "Do you have API integrations?",
    answer: "⚡ Yes! Our platform integrates with major entertainment databases, social media APIs, streaming platforms, and creator tools! 🔗 This ensures our insights are comprehensive, real-time, and actionable across the entire entertainment ecosystem! 🌐💻",
    icon: "🔗",
    category: "advanced"
  },

  // Premium Category - Exclusive Features
  {
    id: "exclusive-access",
    question: "Do I get exclusive content access?",
    answer: "⭐ Premium voters get EXCLUSIVE early access to trailers, behind-the-scenes content, creator interviews, special screenings, and insider insights! 🎟️ Plus priority voting rights on the most anticipated projects. Your influence grows with engagement! 🚀🎬",
    icon: "🎫",
    category: "premium"
  },
  {
    id: "creator-feedback",
    question: "Do creators see my feedback?",
    answer: "🎯 Creators absolutely see aggregated insights from your feedback! 👥 While individual votes are anonymous, your collective voice reaches directors, producers, and studios through our comprehensive reports. Many successful projects have been shaped by our community insights! 🏆✨",
    icon: "👨‍🎬",
    category: "premium"
  },
  {
    id: "premium-features",
    question: "What are the premium features?",
    answer: "💎 Premium unlocks AMAZING features! 🌟 Advanced analytics, exclusive content previews, direct creator feedback channels, priority voting, custom demographics filters, export capabilities, and special recognition badges! 🏆 Plus early access to new features! ⚡",
    icon: "💎",
    category: "premium"
  },
  {
    id: "influence-metrics",
    question: "How do I track my influence?",
    answer: "📊 Track your entertainment influence with detailed metrics! See how your votes align with trends, your prediction accuracy, engagement impact, and community influence score! 🎯 Watch your entertainment expertise grow and earn recognition! 🏆✨",
    icon: "📊",
    category: "premium"
  },

  // Technical Category - Platform Details
  {
    id: "trending-algorithms",
    question: "How do trending algorithms work?",
    answer: "🔥 Our smart algorithms analyze vote velocity, demographic spreads, engagement patterns, social sentiment, and temporal dynamics! 📊 We use advanced data science to identify what's about to explode in popularity. It's predictive entertainment analytics at its finest! 🚀🎯",
    icon: "🔥",
    category: "technical"
  },
  {
    id: "data-privacy",
    question: "How is my data protected?",
    answer: "🔒 Your privacy is our fortress! Bank-level encryption, anonymous voting, GDPR compliance, zero personal data selling, and secure cloud infrastructure! 🛡️ We only use aggregated, anonymized insights. Your individual preferences stay private while your collective voice shapes the future! 🔐✨",
    icon: "🛡️",
    category: "technical"
  },
  {
    id: "mobile-optimization",
    question: "Is it mobile optimized?",
    answer: "📱 Perfectly optimized for ALL devices! Seamless experience across phones, tablets, desktops, and smart TVs! 💻 Progressive web app technology means lightning-fast loading, offline capabilities, responsive design, and native app-like experience. Vote anywhere, anytime! ⚡🌟",
    icon: "📱",
    category: "technical"
  },
  {
    id: "performance",
    question: "How fast is the platform?",
    answer: "⚡ Lightning-fast performance! Sub-second loading times, real-time updates, optimized databases, CDN delivery, and smart caching! 🚀 Our platform handles millions of votes simultaneously without missing a beat. Speed meets reliability! 💨✨",
    icon: "⚡",
    category: "technical"
  },

  // Impact Category - Real-world Results
  {
    id: "success-stories",
    question: "Any success stories?",
    answer: "🏆 Amazing success stories! Projects greenlit based on our insights, genre shifts influenced by our data, regional content that went global, and streaming decisions shaped by our predictions! 🌟 Recent hits that were predicted by our community include blockbuster films and viral series! 🎭✨",
    icon: "🏆",
    category: "impact"
  },
  {
    id: "industry-impact",
    question: "How do you impact the industry?",
    answer: "🎬 Massive industry impact! Our insights influence content creation decisions, budget allocations, marketing strategies, and distribution plans! 📊 Studios use our data for greenlighting projects, streaming platforms for content acquisition, and creators for audience alignment! 🌟🚀",
    icon: "🎬",
    category: "impact"
  },
  {
    id: "community-power",
    question: "How powerful is our community?",
    answer: "💪 Our community is INCREDIBLY powerful! Millions of active voters, representation from 50+ countries, influence on billion-dollar decisions, and direct impact on entertainment's future! 🌍 Together, we're the most influential entertainment audience in the world! 🚀✨",
    icon: "💪",
    category: "impact"
  },
  {
    id: "future-vision",
    question: "What's the future vision?",
    answer: "🔮 The future is audience-driven entertainment! We're building a world where every movie, show, song, and content piece is created WITH the audience, not just FOR them! 🎯 Imagine entertainment perfectly tailored to what people actually want. That's our vision! 🌟🚀",
    icon: "🔮",
    category: "impact"
  }
];
