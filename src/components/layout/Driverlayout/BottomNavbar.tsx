import { NavLink, useLocation } from 'react-router-dom';
import { Home, Route, Truck, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/driver/dashboard', label: 'Home', icon: Home },
  { path: '/driver/trips', label: 'Trips', icon: Route },
  { path: '/driver/truck', label: 'Truck', icon: Truck },
  { path: '/driver/profile', label: 'Profile', icon: User },
];


export const BottomNav = () => {
  const location = useLocation();
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border safe-bottom z-50">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path === '/trips' && location.pathname.startsWith('/trips'));
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center py-3 px-6 touch-target transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <item.icon className={cn(
                'w-6 h-6 mb-1 transition-transform',
                isActive && 'scale-110'
              )} />
              <span className={cn(
                'text-xs font-medium',
                isActive && 'font-semibold'
              )}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute bottom-1 w-1 h-1 rounded-full bg-primary" />
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
