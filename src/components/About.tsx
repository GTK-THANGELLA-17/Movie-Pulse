
import { useState, useEffect } from 'react';
import { CheckCircle, Users, TrendingUp, Film } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('about');
      if (element) {
        const rect = element.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.75;
        if (isInView) {
          setIsVisible(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const features = [
    {
      icon: <Users className="w-10 h-10 text-primary" />,
      title: "Global Audience Insights",
      description: "Collect preferences from viewers worldwide to understand diverse cultural tastes."
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-primary" />,
      title: "Real-time Trend Analysis",
      description: "Track emerging audience preferences as they evolve across different regions."
    },
    {
      icon: <Film className="w-10 h-10 text-primary" />,
      title: "Industry-specific Data",
      description: "Compare preferences across Hollywood, Bollywood, and Tollywood to inform production decisions."
    }
  ];
  
  return (
    <section id="about" className="section-container py-20">
      <div className="space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="chip bg-primary/10 text-primary mx-auto">About MoviePulse</div>
          <h2 className="heading-lg">Shaping the Future of Cinema</h2>
          <p className="body-md text-muted-foreground">
            MoviePulse is a platform designed to collect and analyze movie genre preferences from audiences worldwide. 
            Your opinion helps filmmakers make informed decisions and shapes the future of global cinema.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`glass rounded-xl p-6 hover-lift ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="heading-sm mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className={`max-w-3xl mx-auto ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
          <div className="glass rounded-xl p-8">
            <h3 className="heading-md mb-4">How It Works</h3>
            <ul className="space-y-4">
              {[
                "Select your country and the corresponding film industry.",
                "Vote for your favorite movie genre.",
                "View real-time statistics and trends.",
                "Share insights with your network."
              ].map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
