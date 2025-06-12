// components/layout/FloatingContacts.tsx
'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Send } from 'lucide-react';

const contacts = [
  {
    name: 'WhatsApp',
    href: 'https://wa.me/77001234567?text=Привет!%20Хочу%20обсудить%20автоматизацию',
    icon: MessageCircle,
    color: 'bg-green-500 hover:bg-green-600',
    delay: 0,
  },
  {
    name: 'Telegram',
    href: 'https://t.me/NURKHAT_tech',
    icon: Send,
    color: 'bg-blue-500 hover:bg-blue-600',
    delay: 0.1,
  },
];

export const FloatingContacts = () => {
  return (
    <div className="fixed bottom-8 left-8 z-50 flex flex-col space-y-3">
      {contacts.map((contact, index) => (
        <motion.a
          key={contact.name}
          href={contact.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: contact.delay }}
          className={`relative p-3 ${contact.color} text-white rounded-full shadow-lg transition-all duration-300 group`}
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <contact.icon className="w-6 h-6" />
          
          {/* Tooltip */}
          <div className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
              {contact.name}
              <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
            </div>
          </div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-current opacity-30 blur animate-pulse" />
        </motion.a>
      ))}
    </div>
  );
};