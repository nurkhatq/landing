// components/sections/ProblemsSection.tsx
'use client';

import { motion } from 'framer-motion';
import { FileSpreadsheet, MessageCircle, Search, Puzzle, Calculator, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const problems = [
  {
    id: 'excel',
    icon: FileSpreadsheet,
    title: 'Ручные отчеты в Excel',
    description: 'Тратите 5+ часов в день на создание отчетов, копирование данных между таблицами',
    stats: {
      loss: '500,000 ₸/месяц',
      time: '150 часов/месяц'
    },
    solution: 'Автоматизация за 3 дня',
    solutionIcon: '🔮'
  },
  {
    id: 'support',
    icon: MessageCircle,
    title: 'Обработка клиентов 24/7',
    description: 'Клиенты пишут в любое время, а менеджеры не могут отвечать ночью и в выходные',
    stats: {
      loss: '30% продаж',
      time: '8+ часов ответа'
    },
    solution: 'Чат-бот за 5 дней',
    solutionIcon: '🤖'
  },
  {
    id: 'data',
    icon: Search,
    title: 'Сбор данных вручную',
    description: 'Мониторинг цен конкурентов, сбор контактов, обновление каталогов - все вручную',
    stats: {
      time: '3+ часа/день',
      accuracy: '70% точность'
    },
    solution: 'Парсер за 2 дня',
    solutionIcon: '🕷️'
  },
  {
    id: 'integration',
    icon: Puzzle,
    title: 'Разрозненные системы',
    description: '1С, сайт, CRM, склад работают отдельно. Данные не синхронизируются',
    stats: {
      errors: '15% заказов с ошибками',
      duplication: '40% дублирование работы'
    },
    solution: 'Интеграция за 7 дней',
    solutionIcon: '🔗'
  }
];

export const ProblemsSection = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section 
      id="problems"
      ref={ref}
      className="py-20 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-cyber-grid bg-cyber-grid-size" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <Badge variant="warning" size="lg" className="mb-6">
            <span className="mr-2">😩</span>
            Боль бизнеса
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-display font-bold mb-6">
            Что <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">отнимает</span> ваше время?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Ежедневные рутинные задачи, которые можно автоматизировать уже сегодня
          </p>
        </motion.div>

        {/* Problems Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                variant="gradient" 
                hover 
                className="h-full p-8 group relative overflow-hidden"
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <problem.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    {problem.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    {problem.description}
                  </p>

                  {/* Stats */}
                  <div className="space-y-3 mb-6">
                    {Object.entries(problem.stats).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                          {key === 'loss' ? 'Потери' : key === 'time' ? 'Время' : key === 'errors' ? 'Ошибки' : key === 'accuracy' ? 'Точность' : key === 'duplication' ? 'Дублирование' : key}:
                        </span>
                        <span className="font-mono font-bold text-red-600 dark:text-red-400">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Solution */}
                <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{problem.solutionIcon}</span>
                    <span className="font-semibold text-green-700 dark:text-green-400">
                      {problem.solution}
                    </span>
                  </div>
                </div>

                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-8 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 border-red-200 dark:border-red-800">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                <Calculator className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                  Итого потери без автоматизации:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                    <div className="text-3xl font-mono font-bold text-red-600 dark:text-red-400">
                      2.8M ₸
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">в год</div>
                  </div>
                  <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                    <div className="text-3xl font-mono font-bold text-red-600 dark:text-red-400">
                      1,200
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">часов</div>
                  </div>
                  <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                    <div className="text-3xl font-mono font-bold text-red-600 dark:text-red-400">
                      45%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">эффективности</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                icon={<TrendingUp className="w-5 h-5" />}
                glow
              >
                Начать экономить
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};