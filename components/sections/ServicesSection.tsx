// components/sections/ServicesSection.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  Database, 
  Brain, 
  Link2, 
  MessageSquare, 
  BarChart3, 
  Clock, 
  DollarSign,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useAppStore } from '@/store/useAppStore';

const serviceCategories = [
  { id: 'all', name: 'Все услуги', icon: '🎯' },
  { id: 'bots', name: 'Боты', icon: '🤖' },
  { id: 'integration', name: 'Интеграции', icon: '🔗' },
  { id: 'parsing', name: 'Парсинг', icon: '🕷️' },
  { id: 'ai', name: 'AI решения', icon: '🧠' },
  { id: 'automation', name: 'Автоматизация', icon: '⚡' },
];

const services = [
  {
    id: 'whatsapp-bot',
    category: 'bots',
    name: 'WhatsApp бот для продаж',
    description: 'Умный помощник для автоматической обработки заказов, консультаций и поддержки клиентов 24/7',
    price: 'от 300,000 ₸',
    timeline: '5-7 дней',
    roi: '+340% к конверсии',
    popular: true,
    features: [
      'Прием и обработка заказов',
      'Автоответы на частые вопросы',
      'Интеграция с CRM и 1С',
      'Аналитика и отчеты',
      'Поддержка на казахском и русском'
    ],
    icon: MessageSquare,
    demoType: 'whatsapp'
  },
  {
    id: 'telegram-bot',
    category: 'bots',
    name: 'Telegram бот с AI',
    description: 'Многофункциональный бот с искусственным интеллектом для бизнеса и сообществ',
    price: 'от 250,000 ₸',
    timeline: '4-6 дней',
    roi: '+280% эффективности',
    features: [
      'AI чат с GPT-4',
      'Управление заказами',
      'Системы лояльности',
      'Интеграция с платежами',
      'Административная панель'
    ],
    icon: Bot,
    demoType: 'telegram'
  },
  {
    id: 'excel-automation',
    category: 'automation',
    name: 'Excel автоматизация',
    description: 'Полная автоматизация работы с отчетами, таблицами и данными в Excel',
    price: 'от 150,000 ₸',
    timeline: '3-5 дней',
    roi: '95% экономии времени',
    popular: true,
    features: [
      'Автоматические отчеты',
      'Консолидация данных',
      'Уведомления по email',
      'Интеграция с базами данных',
      'Создание дашбордов'
    ],
    icon: BarChart3,
    demoType: 'excel'
  },
  {
    id: 'kaspi-parser',
    category: 'parsing',
    name: 'Kaspi.kz парсер',
    description: 'Автоматический сбор цен, характеристик и отзывов товаров с Kaspi.kz',
    price: 'от 200,000 ₸',
    timeline: '2-4 дня',
    roi: '+200% скорости анализа',
    features: [
      'Сбор цен конкурентов',
      'Мониторинг остатков',
      'Анализ отзывов',
      'Экспорт в Excel/CSV',
      'Уведомления об изменениях'
    ],
    icon: Database,
    demoType: 'kaspi'
  },
  {
    id: '1c-integration',
    category: 'integration',
    name: '1С интеграция',
    description: 'Синхронизация 1С с сайтом, CRM, складскими системами и другими сервисами',
    price: 'от 500,000 ₸',
    timeline: '7-14 дней',
    roi: '+450% эффективности',
    popular: true,
    features: [
      'Двусторонняя синхронизация',
      'Обмен товарами и заказами',
      'Синхронизация клиентов',
      'Контроль остатков',
      'Отчеты и аналитика'
    ],
    icon: Link2,
    demoType: 'integration'
  },
  {
    id: 'ai-assistant',
    category: 'ai',
    name: 'AI ассистент для бизнеса',
    description: 'Умный помощник на базе GPT для анализа данных и принятия решений',
    price: 'от 400,000 ₸',
    timeline: '5-10 дней',
    roi: '+320% к прибыли',
    features: [
      'Анализ больших данных',
      'Прогнозирование продаж',
      'Рекомендации по развитию',
      'Автоматические инсайты',
      'Интеграция с системами'
    ],
    icon: Brain,
    demoType: 'ai'
  }
];

export const ServicesSection = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const { selectedServiceCategory, setSelectedServiceCategory } = useAppStore();

  const filteredServices = selectedServiceCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedServiceCategory);

  const scrollToDemo = (demoType?: string) => {
    const element = document.querySelector('#demos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // You could also set the active demo here if needed
    }
  };

  return (
    <section 
      id="services"
      ref={ref}
      className="py-20 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-secondary-500/5 to-accent-500/5" />
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
            <span className="mr-2">⚡</span>
            Наши услуги
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-display font-bold mb-6">
            Превращаем <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">идеи</span> в автоматизацию
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Полный спектр услуг по автоматизации бизнеса от простых ботов до сложных AI решений
          </p>
        </motion.div>

        {/* Service Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {serviceCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedServiceCategory(category.id)}
              className={`
                flex items-center space-x-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300
                ${selectedServiceCategory === category.id
                  ? 'bg-primary-500 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105'
                }
              `}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * index }}
            >
              <Card 
                variant="gradient" 
                hover 
                className="h-full p-8 group relative overflow-hidden"
              >
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="warning" size="sm" className="animate-pulse">
                      <Star className="w-3 h-3 mr-1" />
                      ХИТ
                    </Badge>
                  </div>
                )}

                {/* Service Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Service Info */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                    {service.features.length > 3 && (
                      <li className="text-sm text-gray-500 dark:text-gray-500">
                        +{service.features.length - 3} дополнительных возможностей
                      </li>
                    )}
                  </ul>
                </div>

                {/* Pricing and Metrics */}
                <div className="space-y-4 mb-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <DollarSign className="w-4 h-4 text-green-600 mb-1" />
                      <div className="text-sm font-medium text-green-700 dark:text-green-400">{service.price}</div>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <Clock className="w-4 h-4 text-blue-600 mb-1" />
                      <div className="text-sm font-medium text-blue-700 dark:text-blue-400">{service.timeline}</div>
                    </div>
                  </div>

                  <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
                    <div className="text-sm font-medium text-purple-700 dark:text-purple-400">
                      ROI: {service.roi}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {service.demoType && (
                    <Button
                      variant="outline"
                      size="md"
                      className="w-full"
                      onClick={() => scrollToDemo(service.demoType)}
                    >
                      Смотреть демо
                    </Button>
                  )}
                  <Button
                    size="md"
                    className="w-full"
                    icon={<ArrowRight className="w-4 h-4" />}
                    onClick={() => {
                      const element = document.querySelector('#contact');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Заказать услугу
                  </Button>
                </div>

                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <Card className="inline-block p-8 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20">
            <h3 className="text-2xl font-bold mb-4">Не нашли нужную услугу? 🤔</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              Разработаю индивидуальное решение под ваши задачи. Обсудим проект бесплатно!
            </p>
            <Button 
              size="lg" 
              glow
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Обсудить индивидуальный проект
            </Button>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};