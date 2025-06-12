// components/ui/Card.tsx
'use client';

import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

import { MotionProps } from 'framer-motion';

type CardProps = Omit<MotionProps, 'children'> & React.HTMLAttributes<HTMLDivElement> & {
  variant?: 'default' | 'gradient' | 'glass' | 'bordered';
  hover?: boolean;
  glow?: boolean;
};

export const Card = ({
  className,
  variant = 'default',
  hover = false,
  glow = false,
  children,
  ...props
}: CardProps) => {
  const baseStyles = cn(
    'rounded-2xl p-6 transition-all duration-300',
    hover && 'hover:-translate-y-2 hover:shadow-2xl cursor-pointer'
  );

  const variants = {
    default: 'bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-800',
    gradient: 'bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20',
    glass: 'bg-white/10 backdrop-blur-md border border-white/20 shadow-xl',
    bordered: 'bg-transparent border-2 border-primary-500/20 hover:border-primary-500/40',
  };

  const glowStyles = glow
    ? 'shadow-2xl shadow-primary-500/20 hover:shadow-primary-500/40'
    : '';

  return (
    <motion.div
      className={cn(baseStyles, variants[variant], glowStyles, className)}
      whileHover={hover ? { y: -8, scale: 1.02 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
