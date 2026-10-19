import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { getWhatsAppUrl } from '../utils/phoneUtils';

export default function WhatsAppFloatingButton({ contactData }) {
  const whatsappNumber = contactData?.whatsappNumber || "+923000000000";
  const defaultMessage = "Hello, Wazir Glass & Aluminium Centre! I'd like to get a quote for my project.";
  const whatsappUrl = getWhatsAppUrl(whatsappNumber, defaultMessage);

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        if (window.fbq) {
          window.fbq('track', 'Contact', { content_name: 'WhatsApp Click', content_category: 'Direct Lead' });
        }
      }}
      className="fixed bottom-6 right-4 sm:right-6 z-40 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-500 hover:bg-emerald-450 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] hover:scale-110 focus:outline-none transition-all duration-300"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        y: [0, -6, 0]
      }}
      transition={{
        scale: { duration: 0.4 },
        opacity: { duration: 0.4 },
        y: {
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut"
        }
      }}
      whileHover={{ y: -8 }}
      aria-label="Contact us on WhatsApp"
    >
      {/* WhatsApp SVG / Lucide Icon */}
      <MessageCircle className="w-8 h-8 fill-white text-emerald-500" />
      
      {/* Dynamic ping effect */}
      <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-25 animate-ping pointer-events-none" />
    </motion.a>
  );
}
