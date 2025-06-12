// components/demo/CodeDemo.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Maximize2, Minimize2, RotateCcw } from 'lucide-react';

const codeLines = [
  { line: 1, content: "import automation_magic as am", type: "import" },
  { line: 2, content: "from kazakh_business import profit", type: "import" },
  { line: 3, content: "", type: "empty" },
  { line: 4, content: "def automate_business():", type: "function" },
  { line: 5, content: "    # Экономим часы работы", type: "comment" },
  { line: 6, content: "    savings = calculate_profit()", type: "code" },
  { line: 7, content: "    return 'Миллионы тенге!'", type: "return" },
  { line: 8, content: "", type: "empty" },
  { line: 9, content: "# Результат: +847% прибыли! 🚀", type: "result" },
];

export const CodeDemo = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [activeLines, setActiveLines] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const runDemo = () => {
    setIsRunning(true);
    setActiveLines([]);
    setShowResult(false);

    // Simulate code execution
    codeLines.forEach((_, index) => {
      setTimeout(() => {
        setActiveLines(prev => [...prev, index]);
        
        if (index === codeLines.length - 1) {
          setTimeout(() => {
            setShowResult(true);
            setIsRunning(false);
          }, 500);
        }
      }, index * 200);
    });
  };

  const resetDemo = () => {
    setActiveLines([]);
    setShowResult(false);
    setIsRunning(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      runDemo();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative max-w-lg mx-auto">
      {/* Device Frame */}
      <div className="relative bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <div className="w-3 h-3 bg-green-500 rounded-full" />
          </div>
          <span className="text-sm text-gray-400 font-mono">automation.py</span>
          <div className="flex space-x-2">
            <button
              onClick={runDemo}
              disabled={isRunning}
              className="p-1 text-gray-400 hover:text-green-400 disabled:opacity-50 transition-colors"
            >
              <Play className="w-4 h-4" />
            </button>
            <button
              onClick={resetDemo}
              className="p-1 text-gray-400 hover:text-blue-400 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-4 font-mono text-sm leading-relaxed h-80 overflow-y-auto">
          {codeLines.map((codeLine, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0.3 }}
              animate={{ 
                opacity: activeLines.includes(index) ? 1 : 0.3,
                backgroundColor: activeLines.includes(index) ? 'rgba(59, 130, 246, 0.1)' : 'transparent'
              }}
              className="flex items-center py-1 px-2 rounded transition-all duration-200"
            >
              <span className="text-gray-500 w-8 text-right mr-4 select-none">
                {codeLine.line}
              </span>
              <span className={getLineColor(codeLine.type)}>
                {codeLine.content}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Results Panel */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="border-t border-gray-700 bg-gray-800 p-4"
            >
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-green-400 font-bold text-lg">+847%</div>
                  <div className="text-gray-400 text-xs">Прибыль</div>
                </div>
                <div>
                  <div className="text-blue-400 font-bold text-lg">24/7</div>
                  <div className="text-gray-400 text-xs">Работа</div>
                </div>
                <div>
                  <div className="text-purple-400 font-bold text-lg">AI</div>
                  <div className="text-gray-400 text-xs">Умный</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 blur-3xl opacity-30 animate-pulse -z-10" />
    </div>
  );
};

const getLineColor = (type: string): string => {
  switch (type) {
    case 'import': return 'text-purple-400';
    case 'function': return 'text-blue-400';
    case 'comment': return 'text-green-400';
    case 'code': return 'text-yellow-400';
    case 'return': return 'text-pink-400';
    case 'result': return 'text-green-300';
    default: return 'text-gray-300';
  }
};