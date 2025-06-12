// components/sections/HeroSection.tsx - ИСПРАВЛЕННАЯ версия с правильным позиционированием
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Rocket, TrendingUp, Users, Clock, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useTypingEffect } from '@/hooks/useTypingEffect';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useCountUp } from '@/hooks/useCountUp';
import { ParticlesBackground } from '@/components/effects/ParticlesBackground';
import { CodeDemo } from '@/components/demo/CodeDemo';
import { ClientOnly } from '@/components/ui/ClientOnly';

const typingWords = [
  'умных ботов для продаж',
  'Excel автоматизацию', 
  'парсеры данных',
  'AI ассистентов',
  'интеграции с 1С',
  'системы автопостинга'
];

const stats = [
  { 
    id: 'hours', 
    value: 1847, 
    suffix: '', 
    label: 'Часов сэкономлено',
    icon: Clock,
    color: 'text-blue-500'
  },
  { 
    id: 'money', 
    value: 234, 
    suffix: 'M ₸', 
    label: 'Сэкономлено клиентам',
    icon: DollarSign,
    color: 'text-green-500'
  },
  { 
    id: 'projects', 
    value: 156, 
    suffix: '', 
    label: 'Проектов завершено',
    icon: TrendingUp,
    color: 'text-purple-500'
  },
  { 
    id: 'satisfaction', 
    value: 99, 
    suffix: '%', 
    label: 'Довольных клиентов',
    icon: Users,
    color: 'text-orange-500'
  },
];

export const HeroSection = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const typingText = useTypingEffect({ words: typingWords });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home"
      ref={ref}
      className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20"
    >
      {/* Background Effects */}
      <ParticlesBackground />
      
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-accent-500/10 to-primary-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <Badge 
                variant="primary" 
                size="lg" 
                className="inline-flex items-center space-x-2 animate-pulse"
              >
                <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                <span>🚀 Автоматизация будущего</span>
              </Badge>
            </motion.div>

            {/* Main Title */}
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-black leading-tight mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              <span className="block text-gray-900 dark:text-white">
                АВТОМАТИЗИРУЮ
              </span>
              <span className="block bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-text text-transparent animate-gradient">
                БУДУЩЕЕ
              </span>
              <span className="block text-gray-900 dark:text-white">
                СЕГОДНЯ
              </span>
            </motion.h1>

            {/* Typing Effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <div className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                <span>Я создаю </span>
                <ClientOnly fallback={<span className="text-primary-500 font-display">умных ботов</span>}>
                  <span className="text-primary-500 font-display">
                    {typingText}
                    <span className="animate-pulse">|</span>
                  </span>
                </ClientOnly>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Превращаю рутинные задачи в автоматические процессы, которые работают 24/7 
                и экономят миллионы тенге для бизнеса в Казахстане
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <Button
                size="xl"
                onClick={() => scrollToSection('#demos')}
                icon={<Play className="w-5 h-5" />}
                glow
              >
                Смотреть демо
              </Button>
              <Button
                size="xl"
                variant="outline"
                onClick={() => scrollToSection('#contact')}
                icon={<Rocket className="w-5 h-5" />}
              >
                Заказать автоматизацию
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="mb-8"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">
                Доверяют компании:
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                {['TechnoMart', 'LogiTrans', 'Digital Astana', 'KazBusiness'].map((company) => (
                  <div
                    key={company}
                    className="px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-200/50 dark:border-gray-700/50 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all"
                  >
                    {company}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Interactive Demo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <CodeDemo />
          </motion.div>
        </div>
      </div>

      {/* Stats Section - ИСПРАВЛЕНО: убран absolute позиционирование */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8 }}
        className="relative z-30 pb-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={stat.id} stat={stat} index={index} trigger={isVisible} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator - ИСПРАВЛЕНО: правильный z-index и позиционирование */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center space-y-2 text-gray-500 dark:text-gray-400 cursor-pointer"
          onClick={() => scrollToSection('#problems')}
        >
          <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center hover:border-primary-500 transition-colors">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-current rounded-full mt-2"
            />
          </div>
          <span className="text-xs font-medium">Прокрутите</span>
        </motion.div>
      </motion.div>
    </section>
  );
};

// StatCard component остается без изменений
interface StatCardProps {
  stat: typeof stats[0];
  index: number;
  trigger: boolean;
}

const StatCard = ({ stat, index, trigger }: StatCardProps) => {
  const [mounted, setMounted] = useState(false);
  const count = useCountUp({ 
    end: stat.value, 
    duration: 2000,
    trigger: trigger && mounted
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 group relative z-40"
    >
      <div className="flex items-center justify-between mb-4">
        <stat.icon className={`w-8 h-8 ${stat.color}`} />
        <div className="w-12 h-12 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
          <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full animate-pulse" />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-baseline space-x-1">
          <ClientOnly fallback={<span className="text-2xl sm:text-3xl font-bold font-mono text-gray-900 dark:text-white">0</span>}>
            <span className="text-2xl sm:text-3xl font-bold font-mono text-gray-900 dark:text-white">
              {Math.floor(count).toLocaleString()}
            </span>
          </ClientOnly>
          {stat.suffix && (
            <span className="text-lg font-semibold text-primary-500">
              {stat.suffix}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
          {stat.label}
        </p>
      </div>
    </motion.div>
  );
};