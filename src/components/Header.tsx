import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import AuthModal from './AuthModal';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export default function Header({ onNavigate, currentPage }: HeaderProps) {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  const navItems = [
    { label: 'Главная', value: 'home' },
    { label: 'Рационы', value: 'plans' },
    { label: 'Как это работает?', value: 'how-it-works' },
    { label: 'Контакты', value: 'contacts' },
  ];

  const handleAuth = (name: string) => {
    setIsAuthenticated(true);
    setUserName(name);
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName('');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="text-2xl font-bold text-primary font-heading hover:opacity-80 transition-opacity"
          >
            GOODFOOD
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => onNavigate(item.value)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  currentPage === item.value ? 'text-primary' : 'text-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+79320598712"
              className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
            >
              +7 932 059 87 12
            </a>
            
            {isAuthenticated ? (
              <div className="relative group">
                <Button variant="default" className="gap-2">
                  <Icon name="User" size={16} />
                  {userName}
                </Button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors">
                    Мои заказы
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors">
                    Настройки
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 transition-colors"
                  >
                    Выйти
                  </button>
                </div>
              </div>
            ) : (
              <Button onClick={() => setIsAuthOpen(true)} variant="default">
                Личный кабинет
              </Button>
            )}
          </div>

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Icon name="Menu" size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col gap-6 mt-8">
                <button
                  onClick={() => onNavigate('home')}
                  className="text-2xl font-bold text-primary font-heading"
                >
                  GOODFOOD
                </button>
                
                {navItems.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => {
                      onNavigate(item.value);
                      setIsMenuOpen(false);
                    }}
                    className={`text-left text-lg font-medium transition-colors hover:text-primary ${
                      currentPage === item.value ? 'text-primary' : 'text-gray-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                
                <a
                  href="tel:+79320598712"
                  className="text-lg font-medium text-gray-700 hover:text-primary transition-colors"
                >
                  +7 932 059 87 12
                </a>
                
                {isAuthenticated ? (
                  <div className="flex flex-col gap-2">
                    <Button variant="default" className="gap-2 justify-start">
                      <Icon name="User" size={16} />
                      {userName}
                    </Button>
                    <button className="text-left px-4 py-2 text-sm hover:bg-gray-50 rounded transition-colors">
                      Мои заказы
                    </button>
                    <button className="text-left px-4 py-2 text-sm hover:bg-gray-50 rounded transition-colors">
                      Настройки
                    </button>
                    <button
                      onClick={handleLogout}
                      className="text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 rounded transition-colors"
                    >
                      Выйти
                    </button>
                  </div>
                ) : (
                  <Button onClick={() => {
                    setIsAuthOpen(true);
                    setIsMenuOpen(false);
                  }} variant="default" className="w-full">
                    Личный кабинет
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onAuth={handleAuth}
      />
    </header>
  );
}
