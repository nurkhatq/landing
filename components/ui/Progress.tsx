// components/ui/Progress.tsx
'use client';

import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  showValue?: boolean;
  variant?: 'default' | 'gradient' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export const Progress = ({
  value,
  max = 100,
  className,
  showValue = false,
  variant = 'default',
  size = 'md',
  animated = true,
}: ProgressProps) => {
  const percentage = Math.min((value / max) * 100, 100);

  const baseStyles = cn(
    'w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden'
  );

  const variants = {
    default: 'bg-primary-500',
    gradient: 'bg-gradient-to-r from-primary-500 to-secondary-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
  };

  const sizes = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className={cn(baseStyles, sizes[size])}>
        <motion.div
          className={cn('h-full rounded-full', variants[variant])}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{
            duration: animated ? 1.5 : 0,
            ease: 'easeOut',
          }}
        />
      </div>
      {showValue && (
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400 min-w-[3rem]">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
};