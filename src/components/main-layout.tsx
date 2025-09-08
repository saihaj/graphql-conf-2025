import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { notionistsNeutral } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { Home, LogOut, Moon, Search, Sun, User } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type React from 'react';
import { useAuth } from './auth-provider';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const avatar = createAvatar(notionistsNeutral, {
    seed: user?.id,
  });

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'explore', label: 'Explore', icon: Search, path: '/explore' },
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar */}
        <div className="w-64 border-r border-border p-4 min-h-screen sticky top-0">
          <div className="space-y-4">
            <h1 className="text-xl font-bold">"Y"</h1>

            <nav className="space-y-2">
              {navigationItems.map(item => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    href={item.path}
                    className={cn(
                      buttonVariants({
                        variant: pathname === item.path ? 'default' : 'ghost',
                      }),
                      'w-full justify-start',
                    )}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-border space-y-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-full justify-start"
              >
                {theme === 'dark' ? (
                  <Sun className="mr-2 h-4 w-4" />
                ) : (
                  <Moon className="mr-2 h-4 w-4" />
                )}
                {theme === 'dark' ? 'Light mode' : 'Dark mode'}
              </Button>

              <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <div
                  className="h-8 w-8 rounded-full overflow-hidden"
                  dangerouslySetInnerHTML={{
                    __html: avatar.toString(),
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground truncate">
                    @{user?.username}
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="w-full bg-transparent"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        {children}
      </div>
    </div>
  );
}
