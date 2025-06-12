// components/demo/ExcelDemo.tsx - MOBILE OPTIMIZED
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Download, Mail, BarChart3, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { Card } from '@/components/ui/Card';
import { useDemoStore } from '@/store/useDemoStore';
import { useAppStore } from '@/store/useAppStore';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export const ExcelDemo = () => {
  const [isRunning, setIsRunning] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { 
    excelData, 
    excelProgress, 
    excelLogs, 
    updateExcelData, 
    setExcelProgress, 
    addExcelLog,
    resetDemo 
  } = useDemoStore();
  const { addNotification } = useAppStore();

  const runDemo = async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setExcelProgress(0);
    addExcelLog({ message: '🚀 Запуск автоматизации Excel...', type: 'info' });

    const mockData = [
      { branch: 'Алматы', jan: 5234000, feb: 1245000, mar: 3989000 },
      { branch: 'Астана', jan: 4567000, feb: 1123000, mar: 3444000 },
      { branch: 'Шымкент', jan: 2345000, feb: 567000, mar: 1778000 },
    ];

    for (let i = 0; i < mockData.length; i++) {
      const row = mockData[i];
      const total = row.jan + row.feb + row.mar;
      const percentage = ((total / 15000000) * 100);
      
      const updatedRow = { ...row, total, percentage };
      const progress = ((i + 1) / mockData.length) * 100;
      setExcelProgress(progress);
      
      addExcelLog({
        message: `📊 ${row.branch}: ${total.toLocaleString()} ₸`,
        type: 'success'
      });
      
      const newData = [...excelData];
      newData[i] = updatedRow;
      updateExcelData(newData);
      
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    addExcelLog({ message: '✅ Автоматизация завершена!', type: 'success' });
    addExcelLog({ message: '📈 ROI: +485% за первый год', type: 'info' });
    addExcelLog({ message: '💰 Экономия: 120 часов/месяц', type: 'success' });
    
    setIsRunning(false);
    addNotification({
      type: 'success',
      message: 'Excel автоматизация завершена! Сэкономлено 95% времени на отчетах.'
    });
  };

  const resetExcelDemo = () => {
    resetDemo('excel');
    setIsRunning(false);
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div className={`${isMobile ? 'space-y-4' : 'flex justify-between items-start gap-6'}`}>
        <div className="flex-1">
          <h3 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold mb-2 flex items-center gap-3`}>
            <div className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center`}>
              <BarChart3 className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} text-white`} />
            </div>
            {isMobile ? 'Excel автоматизация' : 'Excel автоматизация отчетов'}
          </h3>
          <p className={`text-gray-600 dark:text-gray-400 ${isMobile ? 'text-sm mb-3' : 'text-lg mb-4'}`}>
            {isMobile 
              ? 'Автоматические отчеты и email рассылка'
              : 'Автоматическое создание сводных отчетов, графиков и отправка по email'
            }
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-xs font-medium animate-pulse">
              🔴 LIVE
            </span>
            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
              💰 Экономия: {isMobile ? '40ч/нед' : '40 ч/неделю'}
            </span>
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
              💵 150,000 ₸
            </span>
          </div>
        </div>
        
        <div className={`flex ${isMobile ? 'w-full space-x-2' : 'gap-3'}`}>
          <Button
            onClick={runDemo}
            disabled={isRunning}
            loading={isRunning}
            icon={<Play className="w-4 h-4" />}
            size={isMobile ? "sm" : "lg"}
            className={isMobile ? "flex-1" : ""}
          >
            {isRunning ? 'Обработка...' : isMobile ? 'Запустить' : 'Запустить автоматизацию'}
          </Button>
          <Button
            onClick={resetExcelDemo}
            variant="outline"
            icon={<RotateCcw className="w-4 h-4" />}
            size={isMobile ? "sm" : "lg"}
          >
            {isMobile ? '' : 'Сброс'}
          </Button>
        </div>
      </div>

      {/* Progress */}
      {excelProgress > 0 && (
        <Card className={`${isMobile ? 'p-4' : 'p-6'}`}>
          <div className="flex items-center justify-between mb-3">
            <h4 className={`font-semibold ${isMobile ? 'text-sm' : ''}`}>Прогресс автоматизации</h4>
            <span className={`text-gray-500 ${isMobile ? 'text-xs' : 'text-sm'}`}>{Math.round(excelProgress)}%</span>
          </div>
          <Progress value={excelProgress} variant="gradient" size={isMobile ? "md" : "lg"} animated />
        </Card>
      )}

      {/* Demo Content */}
      <div className={`${isMobile ? 'space-y-6' : 'grid lg:grid-cols-2 gap-8'}`}>
        {/* Excel Table */}
        <Card className={`${isMobile ? 'p-4' : 'p-6'}`}>
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h4 className={`font-semibold flex items-center gap-2 ${isMobile ? 'text-sm' : 'text-xl'}`}>
              📊 {isMobile ? 'Данные' : 'Исходные данные'}
            </h4>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className={`w-full ${isMobile ? 'text-xs' : 'text-sm'}`}>
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="text-left p-2 md:p-3 font-semibold">Филиал</th>
                  <th className="text-right p-2 md:p-3 font-semibold">{isMobile ? 'Янв' : 'Янв'}</th>
                  <th className="text-right p-2 md:p-3 font-semibold">{isMobile ? 'Фев' : 'Фев'}</th>
                  <th className="text-right p-2 md:p-3 font-semibold">{isMobile ? 'Мар' : 'Мар'}</th>
                  <th className="text-right p-2 md:p-3 font-semibold">Итого</th>
                  <th className="text-right p-2 md:p-3 font-semibold">%</th>
                </tr>
              </thead>
              <tbody>
                {excelData.map((row, index) => (
                  <motion.tr
                    key={row.branch}
                    className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    animate={{
                      backgroundColor: row.total > 0 ? 'rgba(34, 197, 94, 0.1)' : 'transparent'
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <td className="p-2 md:p-3 font-medium">{row.branch}</td>
                    <td className="p-2 md:p-3 text-right font-mono">
                      {row.jan > 0 ? (isMobile ? `${Math.floor(row.jan/1000)}К` : row.jan.toLocaleString()) : '0'}
                    </td>
                    <td className="p-2 md:p-3 text-right font-mono">
                      {row.feb > 0 ? (isMobile ? `${Math.floor(row.feb/1000)}К` : row.feb.toLocaleString()) : '0'}
                    </td>
                    <td className="p-2 md:p-3 text-right font-mono">
                      {row.mar > 0 ? (isMobile ? `${Math.floor(row.mar/1000)}К` : row.mar.toLocaleString()) : '0'}
                    </td>
                    <td className="p-2 md:p-3 text-right font-mono font-bold text-primary-600">
                      {row.total > 0 ? (isMobile ? `${Math.floor(row.total/1000)}К` : row.total.toLocaleString()) : '0'}
                    </td>
                    <td className="p-2 md:p-3 text-right font-mono text-green-600">
                      {row.percentage > 0 ? `${row.percentage.toFixed(1)}%` : '0%'}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Terminal Log */}
        <Card className={`${isMobile ? 'p-4' : 'p-6'}`}>
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h4 className={`font-semibold flex items-center gap-2 ${isMobile ? 'text-sm' : 'text-xl'}`}>
              💻 {isMobile ? 'Лог' : 'Лог автоматизации'}
            </h4>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
          
          <div className={`bg-gray-900 rounded-lg p-3 md:p-4 font-mono overflow-y-auto ${isMobile ? 'h-48 text-xs' : 'h-80 text-sm'}`}>
            {excelLogs.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`mb-2 flex items-start gap-2 ${
                  log.type === 'success' ? 'text-green-400' :
                  log.type === 'error' ? 'text-red-400' :
                  'text-blue-400'
                }`}
              >
                <span className="text-gray-500 text-xs flex-shrink-0">[{log.timestamp}]</span>
                <span className="break-words">{log.message}</span>
              </motion.div>
            ))}
            {isRunning && (
              <motion.div
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-yellow-400"
              >
                <span className="text-gray-500 text-xs">[{new Date().toLocaleTimeString('ru-RU')}]</span>
                <span className="ml-2">⚡ Обработка данных...</span>
              </motion.div>
            )}
          </div>
        </Card>
      </div>

      {/* Results */}
      {excelProgress === 100 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`grid ${isMobile ? 'grid-cols-2 gap-3' : 'md:grid-cols-3 gap-6'}`}
        >
          <Card className={`${isMobile ? 'p-3' : 'p-6'} text-center bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20`}>
            <div className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4`}>
              <BarChart3 className={`${isMobile ? 'w-4 h-4' : 'w-6 h-6'} text-white`} />
            </div>
            <div className={`font-bold text-green-600 mb-1 ${isMobile ? 'text-lg' : 'text-2xl'}`}>
              {isMobile ? '12.3M ₸' : '12,346,000 ₸'}
            </div>
            <div className={`text-gray-600 dark:text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>
              {isMobile ? 'Продажи Q1' : 'Общие продажи Q1'}
            </div>
          </Card>
          
          <Card className={`${isMobile ? 'p-3' : 'p-6'} text-center bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20`}>
            <div className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4`}>
              <Mail className={`${isMobile ? 'w-4 h-4' : 'w-6 h-6'} text-white`} />
            </div>
            <div className={`font-bold text-blue-600 mb-1 ${isMobile ? 'text-lg' : 'text-2xl'}`}>2.8 сек</div>
            <div className={`text-gray-600 dark:text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>
              {isMobile ? 'Отправка' : 'Время отправки отчета'}
            </div>
          </Card>
          
          <Card className={`${isMobile ? 'p-3 col-span-2' : 'p-6'} text-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20`}>
            <div className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4`}>
              <Download className={`${isMobile ? 'w-4 h-4' : 'w-6 h-6'} text-white`} />
            </div>
            <div className={`font-bold text-purple-600 mb-1 ${isMobile ? 'text-lg' : 'text-2xl'}`}>95%</div>
            <div className={`text-gray-600 dark:text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>Экономия времени</div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};