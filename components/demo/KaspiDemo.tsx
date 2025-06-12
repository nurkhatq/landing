// components/demo/KaspiDemo.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Package, Zap, TrendingUp, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';
import { useDemoStore } from '@/store/useDemoStore';
import { useAppStore } from '@/store/useAppStore';

const mockProducts = [
  { id: '1', name: 'iPhone 15 Pro', price: 649900, rating: 4.8, seller: 'Apple Store KZ' },
  { id: '2', name: 'Samsung Galaxy S24', price: 499900, rating: 4.7, seller: 'Samsung KZ' },
  { id: '3', name: 'Xiaomi 14 Pro', price: 379900, rating: 4.6, seller: 'Mi Store' },
  { id: '4', name: 'MacBook Air M3', price: 749900, rating: 4.9, seller: 'Apple Store KZ' },
  { id: '5', name: 'iPad Pro 2024', price: 549900, rating: 4.8, seller: 'Apple Store KZ' },
  { id: '6', name: 'AirPods Pro 3', price: 149900, rating: 4.7, seller: 'Audio Plus' },
  { id: '7', name: 'Apple Watch 10', price: 249900, rating: 4.6, seller: 'Watch Zone' },
  { id: '8', name: 'Sony WH-1000XM6', price: 189900, rating: 4.8, seller: 'Sony Official' },
];

export const KaspiDemo = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const { kaspiProducts, kaspiStats, addKaspiProduct, updateKaspiStats, resetDemo } = useDemoStore();
  const { addNotification } = useAppStore();

  const runScan = async () => {
    if (isScanning) return;
    
    setIsScanning(true);
    setScanProgress(0);
    resetDemo('kaspi');

    for (let i = 0; i < mockProducts.length; i++) {
      const product = mockProducts[i];
      
      // Add product
      addKaspiProduct(product);
      
      // Update stats
      const found = i + 1;
      const totalPrice = kaspiProducts.concat([product]).reduce((sum, p) => sum + p.price, 0);
      const avgPrice = Math.floor(totalPrice / found);
      
      updateKaspiStats({
        found,
        avgPrice,
        speed: found * 3,
      });
      
      // Update progress
      const progress = ((i + 1) / mockProducts.length) * 100;
      setScanProgress(progress);
      
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setIsScanning(false);
    addNotification({
      type: 'success',
      message: `Kaspi парсинг завершен! Найдено ${mockProducts.length} товаров за ${mockProducts.length * 0.5} секунд.`
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h3 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            Kaspi.kz парсер товаров
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
            Автоматический сбор цен, характеристик и отзывов с Kaspi.kz
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm font-medium animate-pulse">
              🔴 LIVE
            </span>
            <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full text-sm font-medium">
              ⚡ 1000 товаров/мин
            </span>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
              💵 200,000 ₸
            </span>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button
            onClick={runScan}
            disabled={isScanning}
            loading={isScanning}
            icon={<Search className="w-4 h-4" />}
            size="lg"
          >
            {isScanning ? 'Сканирование...' : 'Начать парсинг'}
          </Button>
          <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800">
            <option>Смартфоны</option>
            <option>Ноутбуки</option>
            <option>Наушники</option>
          </select>
        </div>
      </div>

      {/* Scanning Progress */}
      {isScanning && (
        <Card className="p-6">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Сканирование Kaspi.kz</span>
              <span className="text-sm text-gray-500">{Math.round(scanProgress)}%</span>
            </div>
            <Progress value={scanProgress} variant="gradient" size="lg" animated />
          </div>
          
          {/* Scanner Animation */}
          <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </Card>
      )}

      {/* Stats and Results */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Stats Panel */}
        <Card className="p-6">
          <h4 className="text-xl font-semibold mb-6 flex items-center gap-2">
            📊 Статистика парсинга
          </h4>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <Package className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">{kaspiStats.found}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Найдено товаров</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">
                {kaspiStats.avgPrice.toLocaleString()} ₸
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Средняя цена</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
              <Zap className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">{kaspiStats.speed}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Товаров/сек</div>
            </div>
            
            <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
              <Star className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600">99.2%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Точность</div>
            </div>
          </div>
        </Card>

        {/* Products List */}
        <Card className="p-6">
          <h4 className="text-xl font-semibold mb-6 flex items-center gap-2">
            🛍️ Найденные товары
          </h4>
          
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {kaspiProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex-1">
                  <div className="font-medium text-sm">{product.name}</div>
                  <div className="text-xs text-gray-500">{product.seller}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary-600 text-sm">
                    {product.price.toLocaleString()} ₸
                  </div>
                  <div className="flex items-center justify-end gap-1 text-xs">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span>{product.rating}</span>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {kaspiProducts.length === 0 && !isScanning && (
              <div className="text-center py-8 text-gray-500">
                <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Начните парсинг, чтобы увидеть товары</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};