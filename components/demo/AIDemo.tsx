// components/demo/AIDemo.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Upload, BarChart3, Lightbulb, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';
import { useDemoStore } from '@/store/useDemoStore';
import { useAppStore } from '@/store/useAppStore';

const mockInsights = [
  {
    type: 'insight' as const,
    title: 'Тренд продаж',
    description: 'Обнаружен рост продаж на 23% в сегменте электроники за последний месяц',
    priority: 'high' as const,
    impact: '+2.8M ₸ потенциальной прибыли'
  },
  {
    type: 'insight' as const,
    title: 'Поведение клиентов',
    description: '67% покупок совершается в вечернее время (18:00-22:00)',
    priority: 'medium' as const,
    impact: 'Оптимизация рабочего времени'
  },
  {
    type: 'recommendation' as const,
    title: 'Увеличить закупки электроники',
    description: 'Спрос превышает предложение на 45%. Рекомендуется увеличить закупки на 30%',
    priority: 'high' as const,
    impact: '+34% к выручке'
  },
  {
    type: 'recommendation' as const,
    title: 'Добавить вечернюю смену',
    description: 'Пиковая активность клиентов приходится на вечерние часы',
    priority: 'medium' as const,
    impact: '+18% обработанных заказов'
  },
  {
    type: 'metric' as const,
    title: 'Упущенная прибыль',
    description: 'Потенциальная прибыль при оптимизации ассортимента составляет 2.8M ₸',
    priority: 'high' as const,
    impact: '287% ROI за год'
  }
];

export const AIDemo = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { aiAnalysisResults, aiProgress, setAiResults, setAiProgress, resetDemo } = useDemoStore();
  const { addNotification } = useAppStore();

  const analysisSteps = [
    'Загрузка данных...',
    'Анализ паттернов продаж...',
    'Изучение поведения клиентов...',
    'Генерация инсайтов...',
    'Формирование рекомендаций...',
    'Расчет потенциального ROI...'
  ];

  const runAnalysis = async () => {
    if (isAnalyzing) return;
    
    setIsAnalyzing(true);
    setAiProgress(0);
    setCurrentStep(0);
    resetDemo('ai');

    // Simulate AI analysis process
    for (let i = 0; i < analysisSteps.length; i++) {
      setCurrentStep(i);
      const progress = ((i + 1) / analysisSteps.length) * 100;
      setAiProgress(progress);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    // Set final results
    setAiResults(mockInsights);
    setIsAnalyzing(false);
    
    addNotification({
      type: 'success',
      message: 'AI анализ завершен! Найдено 3 возможности для роста бизнеса на 2.8M ₸.'
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'low':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'insight':
        return <BarChart3 className="w-5 h-5" />;
      case 'recommendation':
        return <Lightbulb className="w-5 h-5" />;
      case 'metric':
        return <TrendingUp className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h3 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            AI ассистент для анализа данных
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
            Умный помощник анализирует ваши данные и дает рекомендации для роста бизнеса
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm font-medium animate-pulse">
              🔴 LIVE
            </span>
            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
              🧠 GPT-4 Powered
            </span>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
              💵 400,000 ₸
            </span>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button
            onClick={runAnalysis}
            disabled={isAnalyzing}
            loading={isAnalyzing}
            icon={<Brain className="w-4 h-4" />}
            size="lg"
          >
            {isAnalyzing ? 'Анализирую...' : 'Анализировать данные'}
          </Button>
          <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800">
            <option>Данные продаж</option>
            <option>База клиентов</option>
            <option>Складские остатки</option>
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Data Upload Simulation */}
        <Card className="p-6">
          <h4 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Загрузка данных
          </h4>
          
          <div className="space-y-4">
            {/* Mock uploaded files */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium text-sm">sales_data_2024.xlsx</div>
                    <div className="text-xs text-gray-500">2.4 MB • 15,840 записей</div>
                  </div>
                </div>
                <div className="text-green-600 font-medium text-sm">✓ Загружено</div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium text-sm">customers_database.csv</div>
                    <div className="text-xs text-gray-500">1.8 MB • 8,547 клиентов</div>
                  </div>
                </div>
                <div className="text-green-600 font-medium text-sm">✓ Загружено</div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  <div>
                    <div className="font-medium text-sm">inventory_data.json</div>
                    <div className="text-xs text-gray-500">980 KB • 1,234 товара</div>
                  </div>
                </div>
                <div className="text-blue-600 font-medium text-sm">Обработка...</div>
              </div>
            </div>

            {/* Analysis Progress */}
            {isAnalyzing && (
              <div className="mt-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold">AI анализ данных</span>
                  <span className="text-sm text-gray-500">{Math.round(aiProgress)}%</span>
                </div>
                <Progress value={aiProgress} variant="gradient" size="lg" animated />
                
                <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Brain className="w-4 h-4 text-purple-600 animate-pulse" />
                    <span className="text-sm text-purple-700 dark:text-purple-300">
                      {analysisSteps[currentStep]}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* AI Analysis Results */}
        <Card className="p-6">
          <h4 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Результаты анализа
          </h4>
          
          <div className="space-y-4 max-h-96 overflow-y-auto">
            <AnimatePresence>
              {aiAnalysisResults.length === 0 && !isAnalyzing && (
                <div className="text-center py-8">
                  <Brain className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p className="text-gray-500">Запустите анализ, чтобы увидеть инсайты</p>
                </div>
              )}
              
              {aiAnalysisResults.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(result.type)}
                      <span className="font-medium">{result.title}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(result.priority!)}`}>
                      {result.priority === 'high' ? 'Высокий' : 
                       result.priority === 'medium' ? 'Средний' : 'Низкий'}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {result.description}
                  </p>
                  
                  {result.impact && (
                    <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded text-sm">
                      <span className="font-medium text-green-700 dark:text-green-300">
                        💰 Потенциал: {result.impact}
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </Card>
      </div>

      {/* AI Metrics Dashboard */}
      {aiAnalysisResults.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            <h4 className="text-xl font-semibold mb-6 text-center">📊 Сводка AI анализа</h4>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-1">5</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Инсайтов найдено</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-green-600 mb-1">2.8M ₸</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Потенциальная прибыль</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-purple-600 mb-1">3</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Рекомендации</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <AlertCircle className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-orange-600 mb-1">287%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Прогноз ROI</div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};