// components/sections/DemosSection.tsx - MOBILE OPTIMIZED
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileSpreadsheet, ShoppingCart, MessageCircle, Brain, Share2, Link, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useMediaQuery } from '@/hooks/useMediaQuery';
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
    name: 'Excel',
    fullName: 'Excel автоматизация',
    icon: FileSpreadsheet,
    description: 'Автоматические отчеты',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10 hover:bg-green-500/20',
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    id: 'kaspi',
    name: 'Kaspi',
    fullName: 'Kaspi парсер',
    icon: ShoppingCart,
    description: 'Сбор данных о товарах',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10 hover:bg-blue-500/20',
    gradient: 'from-blue-500 to-cyan-600',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    fullName: 'WhatsApp бот',
    icon: MessageCircle,
    description: 'Умный помощник 24/7',
    color: 'text-green-600',
    bgColor: 'bg-green-600/10 hover:bg-green-600/20',
    gradient: 'from-green-600 to-emerald-700',
  },
  {
    id: 'ai',
    name: 'AI',
    fullName: 'AI ассистент',
    icon: Brain,
    description: 'Анализ и рекомендации',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10 hover:bg-purple-500/20',
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    id: 'social',
    name: 'Соцсети',
    fullName: 'Автопостинг',
    icon: Share2,
    description: 'Управление соцсетями',
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10 hover:bg-pink-500/20',
    gradient: 'from-pink-500 to-red-600',
  },
  {
    id: 'integration',
    name: '1С',
    fullName: '1С интеграция',
    icon: Link,
    description: 'Синхронизация систем',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10 hover:bg-orange-500/20',
    gradient: 'from-orange-500 to-red-600',
  },
];

export const DemosSection = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const { activeDemo, setActiveDemo } = useAppStore();
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');

  const activeTab = demoTabs.find(tab => tab.id === activeDemo) || demoTabs[0];

  const handlePrevTab = () => {
    const currentIndex = demoTabs.findIndex(tab => tab.id === activeDemo);
    const prevIndex = currentIndex === 0 ? demoTabs.length - 1 : currentIndex - 1;
    setActiveDemo(demoTabs[prevIndex].id);
    setCurrentTabIndex(prevIndex);
  };

  const handleNextTab = () => {
    const currentIndex = demoTabs.findIndex(tab => tab.id === activeDemo);
    const nextIndex = currentIndex === demoTabs.length - 1 ? 0 : currentIndex + 1;
    setActiveDemo(demoTabs[nextIndex].id);
    setCurrentTabIndex(nextIndex);
  };

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
      className="py-12 md:py-20 bg-white dark:bg-gray-900 relative overflow-hidden"
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
          className="text-center mb-8 md:mb-16"
        >
          <Badge variant="primary" size={isMobile ? "md" : "lg"} className="mb-4 md:mb-6">
            <span className="mr-2">🎯</span>
            Live демо
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 md:mb-6 px-2">
            Посмотрите <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">автоматизацию</span> в действии
          </h2>
          <p className="text-base md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-4">
            {isMobile ? 'Интерактивные демо реальных проектов' : 'Интерактивные демо реальных проектов. Нажимайте кнопки и смотрите на магию!'}
          </p>
        </motion.div>

        {/* Mobile Tab Navigation */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            {/* Current Tab Display */}
            <div className={`relative mb-6 p-6 rounded-2xl bg-gradient-to-r ${activeTab.gradient} text-white mx-2`}>
              <div className="flex items-center justify-between">
                <button
                  onClick={handlePrevTab}
                  className="p-2 bg-white/20 rounded-full backdrop-blur-sm"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="text-center flex-1 mx-4">
                  <activeTab.icon className="w-12 h-12 mx-auto mb-3" />
                  <h3 className="text-xl font-bold mb-1">{activeTab.fullName}</h3>
                  <p className="text-sm opacity-90">{activeTab.description}</p>
                </div>
                
                <button
                  onClick={handleNextTab}
                  className="p-2 bg-white/20 rounded-full backdrop-blur-sm"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              
              {/* Progress dots */}
              <div className="flex justify-center space-x-2 mt-4">
                {demoTabs.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === demoTabs.findIndex(tab => tab.id === activeDemo)
                        ? 'bg-white' 
                        : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Tab Slider */}
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex space-x-3 px-2 pb-2">
                {demoTabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveDemo(tab.id)}
                    className={`
                      flex-shrink-0 flex flex-col items-center p-3 rounded-xl font-semibold transition-all duration-300 min-w-[80px]
                      ${activeDemo === tab.id 
                        ? `${tab.bgColor} ${tab.color} shadow-lg scale-105 border-2 border-current` 
                        : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }
                    `}
                    whileTap={{ scale: 0.95 }}
                  >
                    <tab.icon className="w-6 h-6 mb-1" />
                    <span className="text-xs font-medium">{tab.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Desktop/Tablet Navigation */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="mb-12 md:mb-16"
          >
            {isTablet ? (
              // Tablet: 2x3 grid
              <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                {demoTabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveDemo(tab.id)}
                    className={`
                      group relative flex items-center space-x-3 p-4 rounded-2xl font-semibold transition-all duration-300
                      ${activeDemo === tab.id 
                        ? `${tab.bgColor} ${tab.color} shadow-lg scale-105` 
                        : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 hover:scale-105'
                      }
                    `}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <tab.icon className="w-6 h-6 flex-shrink-0" />
                    <div className="text-left min-w-0">
                      <div className="font-semibold text-sm truncate">{tab.fullName}</div>
                      <div className="text-xs opacity-70 truncate">{tab.description}</div>
                    </div>
                    
                    {activeDemo === tab.id && (
                      <motion.div
                        layoutId="activeDemoTabTablet"
                        className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-2xl border-2 border-primary-500/30"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            ) : (
              // Desktop: horizontal flex
              <div className="flex flex-wrap justify-center gap-4">
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
                      <div className="font-semibold">{tab.fullName}</div>
                      <div className="text-xs opacity-70">{tab.description}</div>
                    </div>
                    
                    {activeDemo === tab.id && (
                      <motion.div
                        layoutId="activeDemoTab"
                        className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-2xl border-2 border-primary-500/30"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Demo Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className={`${
            isMobile 
              ? 'bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-4 shadow-xl border border-gray-200 dark:border-gray-700' 
              : 'bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700'
          }`}
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
          className="text-center mt-8 md:mt-16"
        >
          <Card className={`inline-block ${isMobile ? 'p-6 mx-2' : 'p-8'} bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20`}>
            <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-4`}>
              Впечатлились? 🚀
            </h3>
            <p className={`text-gray-600 dark:text-gray-400 mb-6 ${isMobile ? 'text-sm' : ''} max-w-md`}>
              {isMobile 
                ? 'Закажите персональную демонстрацию для вашего бизнеса!' 
                : 'Это лишь малая часть возможностей. Закажите персональную демонстрацию для вашего бизнеса!'
              }
            </p>
            <Button 
              size={isMobile ? "md" : "lg"}
              glow
              className={isMobile ? "w-full" : ""}
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {isMobile ? 'Заказать демо' : 'Заказать демо для моего бизнеса'}
            </Button>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};