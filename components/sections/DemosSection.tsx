// components/sections/DemosSection.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileSpreadsheet, ShoppingCart, MessageCircle, Brain, Share2, Link } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useAppStore } from '@/store/useAppStore';
import { ExcelDemo } from '@/components/demo/ExcelDemo';
import { KaspiDemo } from '@/components/demo/KaspiDemo';
import { WhatsAppDemo } from '@/components/demo/WhatsAppDemo';
import { AIDemo } from '@/components/demo/AIDemo';
import { SocialDemo } from '@/components/demo/SocialDemo';
import { IntegrationDemo } from '@/components/demo/IntegrationDemo';

const demoTabs = [
  {
    id: 'excel',
    name: 'Excel автоматизация',
    icon: FileSpreadsheet,
    description: 'Автоматические отчеты и анализ',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10 hover:bg-green-500/20',
  },
  {
    id: 'kaspi',
    name: 'Kaspi парсер',
    icon: ShoppingCart,
    description: 'Сбор данных о товарах',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10 hover:bg-blue-500/20',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp бот',
    icon: MessageCircle,
    description: 'Умный помощник 24/7',
    color: 'text-green-600',
    bgColor: 'bg-green-600/10 hover:bg-green-600/20',
  },
  {
    id: 'ai',
    name: 'AI ассистент',
    icon: Brain,
    description: 'Анализ и рекомендации',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10 hover:bg-purple-500/20',
  },
  {
    id: 'social',
    name: 'Автопостинг',
    icon: Share2,
    description: 'Управление соцсетями',
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10 hover:bg-pink-500/20',
  },
  {
    id: 'integration',
    name: '1С интеграция',
    icon: Link,
    description: 'Синхронизация систем',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10 hover:bg-orange-500/20',
  },
];

export const DemosSection = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const { activeDemo, setActiveDemo } = useAppStore();

  const renderDemoContent = () => {
    switch (activeDemo) {
      case 'excel':
        return <ExcelDemo />;
      case 'kaspi':
        return <KaspiDemo />;
      case 'whatsapp':
        return <WhatsAppDemo />;
      case 'ai':
        return <AIDemo />;
      case 'social':
        return <SocialDemo />;
      case 'integration':
        return <IntegrationDemo />;
      default:
        return <ExcelDemo />;
    }
  };

  return (
    <section 
      id="demos"
      ref={ref}
      className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-secondary-500/5 to-accent-500/5" />
        <div className="absolute inset-0 bg-cyber-grid bg-cyber-grid-size opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <Badge variant="primary" size="lg" className="mb-6">
            <span className="mr-2">🎯</span>
            Live демонстрации
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-display font-bold mb-6">
            Посмотрите <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">автоматизацию</span> в действии
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Интерактивные демо реальных проектов. Нажимайте кнопки и смотрите на магию!
          </p>
        </motion.div>

        {/* Demo Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {demoTabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * index }}
              onClick={() => setActiveDemo(tab.id)}
              className={`
                group relative flex items-center space-x-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300
                ${activeDemo === tab.id 
                  ? `${tab.bgColor} ${tab.color} shadow-lg scale-105` 
                  : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 hover:scale-105'
                }
              `}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <tab.icon className="w-5 h-5" />
              <div className="text-left">
                <div className="font-semibold">{tab.name}</div>
                <div className="text-xs opacity-70">{tab.description}</div>
              </div>
              
              {/* Active indicator */}
              {activeDemo === tab.id && (
                <motion.div
                  layoutId="activeDemoTab"
                  className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-2xl border-2 border-primary-500/30"
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Demo Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDemo}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderDemoContent()}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <Card className="inline-block p-8 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20">
            <h3 className="text-2xl font-bold mb-4">Впечатлились? 🚀</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              Это лишь малая часть возможностей. Закажите персональную демонстрацию для вашего бизнеса!
            </p>
            <Button 
              size="lg" 
              glow
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Заказать демо для моего бизнеса
            </Button>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};