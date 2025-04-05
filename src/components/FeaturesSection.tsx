
import { motion } from "framer-motion";
import { Film, BarChart2, Users, Globe, TrendingUp, Zap } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Film className="w-10 h-10 text-primary" />,
      title: "Film Analysis",
      description: "Track audience preferences across various film genres, directors, and storylines."
    },
    {
      icon: <BarChart2 className="w-10 h-10 text-primary" />,
      title: "Data Visualization",
      description: "Interactive charts and graphs that make complex audience data easy to understand."
    },
    {
      icon: <Users className="w-10 h-10 text-primary" />,
      title: "Audience Insights",
      description: "Gain deep insights into viewer demographics, preferences, and viewing habits."
    },
    {
      icon: <Globe className="w-10 h-10 text-primary" />,
      title: "Global Reach",
      description: "Collect and analyze data from viewers across different regions and cultures."
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-primary" />,
      title: "Trend Analysis",
      description: "Stay ahead of changing viewer preferences and emerging content trends."
    },
    {
      icon: <Zap className="w-10 h-10 text-primary" />,
      title: "Real-time Updates",
      description: "Get instant feedback and continuously updated analytics on audience opinions."
    }
  ];

  // Custom animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
    hover: { 
      scale: 1.1, 
      rotate: [0, -5, 5, -5, 0],
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="features" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Platform Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            MoviePulse offers a comprehensive set of tools to help content creators 
            understand and respond to audience preferences across all forms of media.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <motion.div 
                className="mb-4 bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center"
                variants={iconVariants}
                whileHover="hover"
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
