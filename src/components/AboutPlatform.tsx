
import { motion } from "framer-motion";
import { 
  Film, 
  BarChart2, 
  Users, 
  Globe, 
  TrendingUp, 
  Zap,
  Target,
  Award,
  Brain,
  Lightbulb,
  Database,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AboutPlatform = () => {
  const navigate = useNavigate();

  const capabilities = [
    {
      icon: <Film className="w-8 h-8 text-blue-500" />,
      title: "Multi-Platform Coverage",
      description: "Collect opinions across Films, OTT platforms, Television, and YouTube content"
    },
    {
      icon: <Globe className="w-8 h-8 text-green-500" />,
      title: "Global Audience Insights",
      description: "Gather preferences from viewers worldwide across different regions and cultures"
    },
    {
      icon: <BarChart2 className="w-8 h-8 text-purple-500" />,
      title: "Advanced Analytics",
      description: "Real-time data visualization with comprehensive demographic breakdowns"
    },
    {
      icon: <Users className="w-8 h-8 text-orange-500" />,
      title: "Demographic Analysis",
      description: "Track preferences by age groups, gender, and geographical locations"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-red-500" />,
      title: "Trend Prediction",
      description: "Identify emerging content trends before they become mainstream"
    },
    {
      icon: <Database className="w-8 h-8 text-indigo-500" />,
      title: "Export Capabilities",
      description: "Download data in multiple formats (Excel, Word, Text) for further analysis"
    }
  ];

  const benefits = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Informed Decision Making",
      description: "Help content creators make data-driven decisions based on real audience preferences"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Content Quality Improvement",
      description: "Understand what audiences value most to create better, more engaging content"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Market Intelligence",
      description: "Gain deep insights into market demands across different entertainment sectors"
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Innovation Catalyst",
      description: "Inspire new content ideas and formats based on audience feedback and preferences"
    }
  ];

  const impacts = [
    "Reduced content production risks through data-backed insights",
    "Improved audience satisfaction and engagement rates", 
    "Enhanced ROI for content investments and marketing campaigns",
    "Better understanding of cultural preferences across different regions",
    "Faster identification of emerging market opportunities",
    "More personalized content recommendations and targeting"
  ];

  const technicalSpecs = [
    {
      category: "Current Technology Stack",
      items: [
        "React 18+ with TypeScript for scalable frontend development",
        "Node.js + Express.js backend with MongoDB for data management",
        "Advanced analytics with Recharts and real-time visualization",
        "Enhanced security with rate limiting and fingerprinting",
        "Multi-format data export (Excel, Word, Text) capabilities",
        "Responsive design with Tailwind CSS and Framer Motion"
      ]
    },
    {
      category: "Industry-Standard Features Needed",
      items: [
        "AI/ML integration for predictive analytics and trend forecasting",
        "Advanced authentication and role-based access control",
        "Enterprise-grade API with comprehensive documentation",
        "Real-time collaboration tools for content teams",
        "Integration with major industry platforms and tools",
        "Blockchain-based verification for data authenticity"
      ]
    },
    {
      category: "Scalability Requirements",
      items: [
        "Microservices architecture for handling millions of users",
        "Cloud infrastructure with auto-scaling capabilities",
        "CDN integration for global content delivery",
        "Advanced caching and database optimization",
        "Load balancing and fault-tolerant systems",
        "Mobile applications for iOS and Android platforms"
      ]
    }
  ];

  const investmentBreakdown = {
    teamStructure: {
      "Technical Team": "₹2.5-4 Crores annually",
      "Product & Design": "₹1.5-2.5 Crores annually", 
      "Data Scientists": "₹2-3 Crores annually",
      "Marketing & Sales": "₹3-5 Crores annually",
      "Operations & Support": "₹1-2 Crores annually"
    },
    infrastructure: {
      "Cloud Infrastructure": "₹50 Lakhs - 1 Crore annually",
      "Security & Compliance": "₹30-50 Lakhs annually",
      "Third-party Integrations": "₹20-40 Lakhs annually",
      "Data Storage & Processing": "₹40-80 Lakhs annually"
    },
    development: {
      "Platform Development": "₹5-8 Crores (18-24 months)",
      "Mobile Applications": "₹2-3 Crores (12-18 months)",
      "AI/ML Implementation": "₹3-5 Crores (24-36 months)",
      "Enterprise Features": "₹2-4 Crores (18-24 months)"
    }
  };


  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
      <div className="container mx-auto px-4">
        {/* Main Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            About <span className="text-primary">MoviePulse</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            MoviePulse is a comprehensive entertainment intelligence platform that bridges the gap between 
            content creators and global audiences. We collect, analyze, and visualize audience preferences 
            across all major entertainment platforms to help shape the future of content creation.
          </p>
        </motion.div>

        {/* What MoviePulse Is */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h3 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
              What is MoviePulse?
            </h3>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                  MoviePulse is an advanced audience intelligence platform specifically designed for the 
                  entertainment industry. It serves as a centralized hub where viewers from around the 
                  world can share their content preferences across multiple entertainment formats.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Our platform covers everything from traditional cinema and television to modern OTT 
                  platforms and YouTube content, providing unprecedented insights into global entertainment 
                  consumption patterns.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-64 h-64 bg-gradient-to-r from-primary to-primary/60 rounded-full flex items-center justify-center">
                    <Film className="w-24 h-24 text-white" />
                  </div>
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                    <BarChart2 className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Platform Capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
            Platform Capabilities
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg w-fit">
                  {capability.icon}
                </div>
                <h4 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {capability.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {capability.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Importance & Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                Why MoviePulse Matters
              </h3>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
                  >
                    <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg text-primary">
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                        {benefit.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                Real-World Impact
              </h3>
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 p-6 rounded-xl">
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  MoviePulse transforms how the entertainment industry understands and responds to 
                  audience preferences, creating measurable benefits across the entire content ecosystem:
                </p>
                <ul className="space-y-3">
                  {impacts.map((impact, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 dark:text-gray-300">{impact}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Section for Investors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 p-8 rounded-2xl border border-primary/20">
            <h3 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
              🤝 Investment & Collaboration Opportunities
            </h3>
            <div className="text-center space-y-4">
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                Looking to invest in the future of entertainment analytics? Want to collaborate on bringing 
                data-driven insights to the global entertainment industry?
              </p>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-2xl mx-auto">
                <h4 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  For Investors & Partners Only
                </h4>
                <div className="space-y-3">
                  <p className="text-gray-700 dark:text-gray-300">
                    📧 Email: <a href="mailto:imgtk17@gmail.com" className="text-primary font-semibold hover:underline">imgtk17@gmail.com</a>
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    📞 Phone: <a href="tel:+918008133117" className="text-primary font-semibold hover:underline">+91 8008133117</a>
                  </p>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 italic">
                  Serious investment inquiries and partnership proposals only
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center bg-gradient-to-r from-primary to-primary/80 p-8 rounded-2xl text-white"
        >
          <h3 className="text-3xl font-bold mb-4">Ready to Shape the Future?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of viewers worldwide in creating the entertainment landscape of tomorrow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/vote')}
              className="bg-white text-primary hover:bg-white/90 px-8 py-3"
              size="lg"
            >
              Cast Your Opinion
            </Button>
            <Button
              onClick={() => navigate('/stats')}
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-8 py-3"
              size="lg"
            >
              View Live Statistics
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPlatform;
