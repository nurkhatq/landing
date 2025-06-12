// components/demo/IntegrationDemo.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, Database, ShoppingCart, Users, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';
import { useDemoStore } from '@/store/useDemoStore';
import { useAppStore } from '@/store/useAppStore';

const systems = [
  {
    id: '1c',
    name: '1С:Предприятие',
    icon: '🏢',
    color: 'bg-blue-600',
    status: 'connected',
    data: 'Товары, клиенты, заказы'
  },
  {
    id: 'website',
    name: 'Интернет-магазин',
    icon: '🛍️',
    color: 'bg-green-600',
    status: 'connected',
    data: 'Каталог, заказы, пользователи'
  },
  {
    id: 'crm',
    name: 'CRM система',
    icon: '👥',
    color: 'bg-purple-600',
    status: 'connected',
    data: 'Клиенты, сделки, задачи'
  },
  {
    id: 'warehouse',
    name: 'Склад',
    icon: '📦',
    color: 'bg-orange-600',
    status: 'connected',
    data: 'Остатки, поставки, резерв'
  }
];

type SyncStatKey = 'products' | 'prices' | 'stock' | 'customers';

const syncOperations: {
  type: SyncStatKey | 'orders';
  name: string;
  fromSystem: string;
  toSystem: string;
}[] = [
  { type: 'products', name: 'Синхронизация товаров', fromSystem: '1С', toSystem: 'Сайт' },
  { type: 'prices', name: 'Обновление цен', fromSystem: '1С', toSystem: 'Сайт' },
  { type: 'stock', name: 'Остатки на складе', fromSystem: 'Склад', toSystem: '1С' },
  { type: 'orders', name: 'Новые заказы', fromSystem: 'Сайт', toSystem: '1С' },
  { type: 'customers', name: 'База клиентов', fromSystem: 'CRM', toSystem: '1С' }
];

export const IntegrationDemo = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStep, setSyncStep] = useState(0);
  const { integrationProgress, syncStats, setIntegrationProgress, updateSyncStats, resetDemo } = useDemoStore();
  const { addNotification } = useAppStore();

  const startSync = async () => {
    if (isSyncing) return;
    
    setIsSyncing(true);
    setIntegrationProgress(0);
    resetDemo('integration');

    for (let i = 0; i < syncOperations.length; i++) {
      setSyncStep(i);
      const progress = ((i + 1) / syncOperations.length) * 100;
      setIntegrationProgress(progress);
      
      // Simulate data sync
      const operation = syncOperations[i];
      const randomCount = Math.floor(Math.random() * 500) + 100;
      
      updateSyncStats({
        [operation.type]: randomCount
      });
      
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    setIsSyncing(false);
    addNotification({
      type: 'success',
      message: 'Интеграция завершена! Синхронизировано 2,847 записей между системами.'
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h3 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
              <Link className="w-6 h-6 text-white" />
            </div>
            Интеграция с 1С и другими системами
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
            Автоматическая синхронизация данных между всеми системами вашего бизнеса
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm font-medium animate-pulse">
              🔴 LIVE
            </span>
            <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium">
              🔄 Реальное время
            </span>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
              💵 500,000 ₸
            </span>
          </div>
        </div>
        
        <Button
          onClick={startSync}
          disabled={isSyncing}
          loading={isSyncing}
          icon={<RefreshCw className="w-4 h-4" />}
          size="lg"
        >
          {isSyncing ? 'Синхронизация...' : 'Запустить синхронизацию'}
        </Button>
      </div>

      {/* Systems Architecture */}
      <Card className="p-8">
        <h4 className="text-xl font-semibold mb-6 text-center">🏗️ Архитектура интеграции</h4>
        
        <div className="relative">
          {/* Systems Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {systems.map((system, index) => (
              <motion.div
                key={system.id}
                className={`relative p-6 rounded-xl text-white text-center ${system.color} shadow-lg`}
                animate={isSyncing ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
              >
                <div className="text-4xl mb-3">{system.icon}</div>
                <div className="font-semibold mb-2">{system.name}</div>
                <div className="text-xs opacity-90 mb-3">{system.data}</div>
                
                <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
                  system.status === 'connected' 
                    ? 'bg-green-500 bg-opacity-80' 
                    : 'bg-red-500 bg-opacity-80'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    system.status === 'connected' ? 'bg-green-200' : 'bg-red-200'
                  } ${isSyncing ? 'animate-pulse' : ''}`} />
                  <span>{system.status === 'connected' ? 'Подключен' : 'Ошибка'}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
            {/* Horizontal connections */}
            <motion.line
              x1="25%" y1="50%" x2="75%" y2="50%"
              stroke="url(#gradient)" strokeWidth="3" strokeOpacity="0.6"
              strokeDasharray="10,5"
              animate={isSyncing ? { strokeDashoffset: [0, -15] } : {}}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Vertical connections */}
            <motion.line
              x1="50%" y1="25%" x2="50%" y2="75%"
              stroke="url(#gradient)" strokeWidth="3" strokeOpacity="0.6"
              strokeDasharray="10,5"
              animate={isSyncing ? { strokeDashoffset: [0, -15] } : {}}
              transition={{ duration: 1, repeat: Infinity, ease: "linear", delay: 0.5 }}
            />
            
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(59, 130, 246)" />
                <stop offset="50%" stopColor="rgb(168, 85, 247)" />
                <stop offset="100%" stopColor="rgb(239, 68, 68)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Sync Operations */}
        <Card className="p-6">
          <h4 className="text-xl font-semibold mb-6 flex items-center gap-2">
            🔄 Операции синхронизации
          </h4>
          
          <div className="space-y-4">
            {syncOperations.map((operation, index) => (
              <motion.div
                key={operation.type}
                className={`p-4 rounded-lg border-2 transition-all ${
                  isSyncing && index === syncStep
                    ? 'border-blue-300 bg-blue-50 dark:bg-blue-900/20'
                    : index < syncStep && integrationProgress > 0
                    ? 'border-green-300 bg-green-50 dark:bg-green-900/20'
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
                }`}
                animate={isSyncing && index === syncStep ? { scale: [1, 1.02, 1] } : {}}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index < syncStep && integrationProgress > 0
                        ? 'bg-green-500'
                        : isSyncing && index === syncStep
                        ? 'bg-blue-500'
                        : 'bg-gray-400'
                    }`}>
                      {index < syncStep && integrationProgress > 0 ? (
                        <CheckCircle className="w-4 h-4 text-white" />
                      ) : isSyncing && index === syncStep ? (
                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <RefreshCw className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{operation.name}</div>
                      <div className="text-xs text-gray-500">
                        {operation.fromSystem} → {operation.toSystem}
                      </div>
                    </div>
                  </div>
                  
                  {operation.type in syncStats && typeof syncStats[operation.type as SyncStatKey] === 'number' && syncStats[operation.type as SyncStatKey] > 0 && (
                    <div className="text-right">
                      <div className="font-bold text-green-600 text-sm">
                        {syncStats[operation.type as SyncStatKey].toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">записей</div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Progress Bar */}
          {isSyncing && (
            <div className="mt-6">
              <Progress value={integrationProgress} variant="gradient" size="lg" animated />
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
                {Math.round(integrationProgress)}% завершено
              </div>
            </div>
          )}
        </Card>

        {/* Sync Statistics */}
        <Card className="p-6">
          <h4 className="text-xl font-semibold mb-6 flex items-center gap-2">
            📊 Статистика синхронизации
          </h4>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <Database className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">{syncStats.products}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Товаров</div>
              </div>
              
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <ShoppingCart className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">{syncStats.stock}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Остатков</div>
              </div>
              
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <Users className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-600">{syncStats.customers}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Клиентов</div>
              </div>
              
              <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                <CheckCircle className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-600">{syncStats.prices}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Цен</div>
              </div>
            </div>

            {/* Integration Benefits */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-4 rounded-xl">
              <h5 className="font-semibold mb-3 text-green-700 dark:text-green-300">💰 Преимущества интеграции</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Экономия времени на ввод данных:</span>
                  <span className="font-bold">40 ч/неделю</span>
                </div>
                <div className="flex justify-between">
                  <span>Снижение ошибок:</span>
                  <span className="font-bold">95%</span>
                </div>
                <div className="flex justify-between">
                  <span>Скорость обновления данных:</span>
                  <span className="font-bold">Реальное время</span>
                </div>
                <div className="flex justify-between border-t pt-2 font-bold">
                  <span>Общая экономия в год:</span>
                  <span className="text-green-600">1.8M ₸</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};