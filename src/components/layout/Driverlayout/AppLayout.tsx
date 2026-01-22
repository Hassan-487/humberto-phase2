import { ReactNode } from 'react';
import { BottomNav } from './BottomNavbar';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-lg mx-auto">
        {children}
      </div>
      <BottomNav />
    </div>
  );
};
