
import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const ContactSection = () => {
  return (
    <div>
      <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
        Get In Touch
      </h3>
      <p className="mb-8 text-white/90 text-lg leading-relaxed">
        Ready to collaborate? Contact our team to discuss advertising opportunities 
        and partnership possibilities.
      </p>
      <div className="space-y-6">
        {[
          { icon: Mail, text: "advertise@Audience-Pulse.com" },
          { icon: Phone, text: "+91 8499090369" },
          { icon: MapPin, text: "Hyderabad, Telangana, India" }
        ].map((contact, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <contact.icon className="w-6 h-6 text-white" />
            </div>
            <span className="text-lg">{contact.text}</span>
          </motion.div>
        ))}
      </div>
      
      <motion.a
        href="mailto:imgtk17@gmail.com"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 inline-block bg-white text-[#5b2333] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        Contact Sales Team
      </motion.a>
    </div>
  );
};

export default ContactSection;
