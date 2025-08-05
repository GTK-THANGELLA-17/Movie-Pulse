
import { motion } from "framer-motion";
import { Target, Zap, Heart } from "lucide-react";

const CTAContentCards = () => {
  const cards = [
    {
      icon: Target,
      title: "🎯 What We Do",
      points: [
        "We collect real opinions, not after release — but before stories are made.",
        "We reveal hidden demand for fresh, unique ideas.",
        "We help creators see what people actually want — beyond trends."
      ],
      gradient: "from-blue-400/20 to-cyan-400/20"
    },
    {
      icon: Zap,
      title: "✨ What This Means",
      points: [
        "Amazing stories get rejected because \"experts\" think audiences won't watch.",
        "Creators lose confidence in bold, new ideas.",
        "Viewers waste time on repetitive content.",
        "Audience Pulse changes this."
      ],
      gradient: "from-yellow-400/20 to-orange-400/20"
    },
    {
      icon: Heart,
      title: "💡 In Simple Words",
      points: [
        "We don't kill creativity — we free it.",
        "Your voice shows creators what's worth fighting for.",
        "Your taste helps new stories rise from darkness to light."
      ],
      gradient: "from-pink-400/20 to-red-400/20"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 + index * 0.15 }}
          whileHover={{ 
            scale: 1.02, 
            y: -10,
            transition: { duration: 0.3 }
          }}
          className="group"
        >
          <div className={`bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-500 shadow-2xl hover:shadow-3xl bg-gradient-to-br ${card.gradient}`}>
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-white/30 to-white/10 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-500"
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.6 }}
            >
              <card.icon className="w-8 h-8 text-white" />
            </motion.div>
            
            <h3 className="text-xl font-bold mb-6 text-white group-hover:text-gray-100 transition-colors">
              {card.title}
            </h3>
            
            <div className="space-y-3 text-left">
              {card.points.map((point, pointIndex) => (
                <motion.div
                  key={pointIndex}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + index * 0.1 + pointIndex * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-2 h-2 bg-white/60 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-white/90 group-hover:text-white transition-colors leading-relaxed">
                    {point}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CTAContentCards;
