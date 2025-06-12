// components/ui/Button.tsx
'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

import type { MotionProps } from 'framer-motion';

type ButtonProps = React.ComponentPropsWithoutRef<'button'> & MotionProps & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  glow?: boolean;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'right',
      glow = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = cn(
      'relative inline-flex items-center justify-center font-semibold rounded-xl',
      'transition-all duration-300 ease-out transform',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
      'overflow-hidden group'
    );

    const variants = {
      primary: cn(
        'bg-gradient-to-r from-primary-500 to-secondary-500',
        'text-white shadow-lg hover:shadow-xl',
        'hover:-translate-y-1 focus:ring-primary-500',
        glow && 'hover:shadow-primary-500/50'
      ),
      secondary: cn(
        'bg-gradient-to-r from-accent-500 to-primary-500',
        'text-white shadow-lg hover:shadow-xl',
        'hover:-translate-y-1 focus:ring-accent-500'
      ),
      ghost: cn(
        'bg-transparent text-gray-700 dark:text-gray-300',
        'border border-gray-200 dark:border-gray-700',
        'hover:bg-gray-50 dark:hover:bg-gray-800',
        'focus:ring-gray-500'
      ),
      outline: cn(
        'bg-transparent border-2 border-primary-500',
        'text-primary-500 hover:bg-primary-500 hover:text-white',
        'focus:ring-primary-500'
      ),
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm min-h-[36px]',
      md: 'px-6 py-3 text-base min-h-[44px]',
      lg: 'px-8 py-4 text-lg min-h-[52px]',
      xl: 'px-10 py-5 text-xl min-h-[60px]',
    };

    return (
      <motion.button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        {...props}
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <span className="relative flex items-center gap-2">
          {loading && (
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          )}
          {icon && iconPosition === 'left' && !loading && icon}
          {children}
          {icon && iconPosition === 'right' && !loading && icon}
        </span>
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
export { Button };
