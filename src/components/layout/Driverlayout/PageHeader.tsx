import { ReactNode } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  rightAction?: ReactNode;
  className?: string;
}

export const PageHeader = ({ 
  title, 
  subtitle, 
  showBack = false, 
  rightAction,
  className 
}: PageHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <header className={cn(
      'sticky top-0 bg-background/95 backdrop-blur-sm z-40 px-4 py-4 safe-top',
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center touch-target active:scale-95 transition-transform"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <h1 className="text-xl font-bold">{title}</h1>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>
        {rightAction}
      </div>
    </header>
  );
};
