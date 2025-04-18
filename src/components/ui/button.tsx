
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  className?: string;
}

export function Button({ 
  children, 
  variant = 'default', 
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyle = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50';
  const variants = {
    default: 'bg-purple-500 text-white hover:bg-purple-600',
    outline: 'border border-purple-500 text-purple-500 hover:bg-purple-500/10',
    ghost: 'text-purple-500 hover:bg-purple-500/10'
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
