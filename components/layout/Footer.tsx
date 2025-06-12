// components/layout/Footer.tsx
'use client';

import { motion } from 'framer-motion';
import { ArrowUp, Heart, Code, Coffee } from 'lucide-react';

const socialLinks = [
  { name: 'Telegram', href: 'https://t.me/nurkhatq', icon: '✈️' },
  { name: 'WhatsApp', href: 'https://wa.me/77761667329', icon: '💬' },
  { name: 'GitHub', href: 'https://github.com/nurkhatq', icon: '💻' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/nurkhat', icon: '💼' },
];

const services = [
  'WhatsApp боты',
  'Excel автоматизация',
  'Kaspi парсеры',
  '1С интеграция',
  'AI ассистенты',
  'Автопостинг'
];

const technologies = [
  'Python',
  'JavaScript/TypeScript',
  'React/Next.js',
  'Node.js',
  'PostgreSQL',
  'MongoDB',
  'Docker',
  'AWS'
];

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-cyber-grid bg-cyber-grid-size" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main Footer Content */}
        <div className="py-16 grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
                <div>
                  <div className="font-display font-bold text-xl">
                    NURKHAT<span className="text-primary-500">TECH</span>
                  </div>
                  <div className="text-xs text-gray-400 font-mono tracking-wider">
                    AI AUTOMATION
                  </div>
                </div>
              </div>
            </motion.div>

            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Автоматизирую бизнес-процессы в Казахстане с помощью современных технологий. 
              Превращаю рутинные задачи в умные системы.
            </p>

            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-primary-500 rounded-lg flex items-center justify-center text-lg transition-colors duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-primary-400">Услуги</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <a 
                    href="#services"
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-secondary-400">Технологии</h3>
            <ul className="space-y-3">
              {technologies.map((tech) => (
                <li key={tech} className="text-gray-400 text-sm flex items-center space-x-2">
                  <Code className="w-3 h-3 text-primary-500" />
                  <span>{tech}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-accent-400">Контакты</h3>
            <div className="space-y-4">
              <div className="text-sm">
                <div className="text-gray-400 mb-1">📍 Местоположение</div>
                <div className="text-white">Астана, Казахстан</div>
              </div>
              
              <div className="text-sm">
                <div className="text-gray-400 mb-1">📧 Email</div>
                <a 
                  href="mailto:nurkhat@techautomation.kz"
                  className="text-white hover:text-primary-400 transition-colors"
                >
                  duzelbaevnurkhat@gmail.com
                </a>
              </div>
              
              <div className="text-sm">
                <div className="text-gray-400 mb-1">📱 Телефон</div>
                <a 
                  href="tel:+77761667329"
                  className="text-white hover:text-primary-400 transition-colors"
                >
                  +7 776 166 73 29
                </a>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center space-x-2 text-green-400 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>Онлайн сейчас</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>© 2024 NURKHATTech. Все права защищены.</span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center space-x-1">
                <span>Сделано с</span>
                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                <span>и</span>
                <Coffee className="w-4 h-4 text-amber-500" />
                <span>в Астане</span>
              </span>
            </div>

            <motion.button
              onClick={scrollToTop}
              className="flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors duration-300 text-sm"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowUp className="w-4 h-4" />
              <span>Наверх</span>
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};