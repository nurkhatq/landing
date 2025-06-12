// app/not-found.tsx
'use client';

import { motion } from 'framer-motion';
import { Search, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10">
      <div className="text-center max-w-lg mx-auto px-4">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 10 }}
          className="text-9xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent mb-4"
        >
          404
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
            <Search className="w-12 h-12 text-white" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Страница не найдена
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              К сожалению, запрашиваемая страница не существует или была перемещена.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => window.history.back()}
              icon={<ArrowLeft className="w-4 h-4" />}
              variant="outline"
            >
              Назад
            </Button>
            <Button
              onClick={() => window.location.href = '/'}
              icon={<Home className="w-4 h-4" />}
              variant="primary"
            >
              На главную
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}