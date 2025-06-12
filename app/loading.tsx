// app/loading.tsx
'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center">
        {/* Neural Network Animation */}
        <div className="relative w-48 h-32 mx-auto mb-8">
          {/* Nodes */}
          {[
            { x: 20, y: 20, delay: 0 },
            { x: 160, y: 20, delay: 0.5 },
            { x: 60, y: 80, delay: 1 },
            { x: 120, y: 80, delay: 1.5 },
          ].map((node, index) => (
            <motion.div
              key={index}
              className="absolute w-3 h-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
              style={{ left: node.x, top: node.y }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: node.delay,
              }}
            />
          ))}
          
          {/* Connections */}
          <svg className="absolute inset-0 w-full h-full">
            {[
              { x1: 32, y1: 26, x2: 160, y2: 26 },
              { x1: 26, y1: 32, x2: 66, y2: 74 },
              { x1: 166, y1: 32, x2: 126, y2: 74 },
              { x1: 72, y1: 86, x2: 114, y2: 86 },
            ].map((line, index) => (
              <motion.line
                key={index}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="url(#gradient)"
                strokeWidth="2"
                strokeOpacity="0.6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              />
            ))}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(0, 212, 255)" />
                <stop offset="100%" stopColor="rgb(255, 0, 128)" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <motion.div
            className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Инициализация AI систем...
          </motion.div>
          
          <div className="flex justify-center space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-primary-500 rounded-full"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}