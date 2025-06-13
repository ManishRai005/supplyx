import React from 'react';
import { Sprout, Shield } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface LogoProps {
  variant?: 'full' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ variant = 'full', size = 'md', className = '' }) => {
  const { theme } = useTheme();
  
  const sizeMap = {
    sm: { icon: 'h-6 w-6', text: 'text-lg' },
    md: { icon: 'h-8 w-8', text: 'text-xl' },
    lg: { icon: 'h-10 w-10', text: 'text-2xl' },
  };
  
  const iconSize = sizeMap[size].icon;
  const textSize = sizeMap[size].text;
  
  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative">
        <Sprout className={`${iconSize} text-primary animate-pulse-slow`} />
        <Shield className={`${iconSize} absolute top-0 left-0 text-secondary opacity-70`} />
      </div>
      
      {variant === 'full' && (
        <div className="ml-2 flex flex-col">
          <span className={`font-bold tracking-tight ${textSize} text-foreground`}>
            SupplyX
          </span>
          <span className="text-xs text-muted-foreground">
            Ethical Supply Tracking
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;