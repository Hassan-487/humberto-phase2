import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SummaryCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  variant?: 'default' | 'primary' | 'success' | 'warning';
}

const variantStyles = {
  default: 'bg-card border-border',
  primary: 'bg-primary/5 border-primary/20',
  success: 'bg-success/10 border-success/20',
  warning: 'bg-warning/10 border-warning/20',
};

const iconStyles = {
  default: 'bg-muted text-muted-foreground',
  primary: 'bg-primary/10 text-primary',
  success: 'bg-success/20 text-success',
  warning: 'bg-warning/20 text-warning-foreground',
};

export const SummaryCard = ({ title, value, icon: Icon, variant = 'default' }: SummaryCardProps) => {
  return (
    <div className={cn(
      'rounded-xl p-4 border transition-all',
      variantStyles[variant]
    )}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={cn(
          'w-12 h-12 rounded-xl flex items-center justify-center',
          iconStyles[variant]
        )}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
