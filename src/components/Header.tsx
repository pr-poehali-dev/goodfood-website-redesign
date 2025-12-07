import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Icon from '@/components/ui/icon';
import AuthModal from './AuthModal';

interface HeaderProps {
  onNavigate: (page: string, planType?: string) => void;
  currentPage: string;
  isAuthenticated: boolean;
  userName: string;
  onAuth: (name: string) => void;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
}

export default function Header({ 
  onNavigate, 
  currentPage, 
  isAuthenticated, 
  userName, 
  onAuth, 
  showAuthModal, 
  setShowAuthModal 
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    window.location.reload();
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
            <button
              onClick={() => onNavigate('home')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                currentPage === 'home' ? 'text-primary' : 'text-gray-700'
              }`}
            >
              Главная
            </button>
            
            <DropdownMenu>
              <DropdownMenuTrigger className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 ${
                currentPage === 'plans' ? 'text-primary' : 'text-gray-700'
              }`}>
                Рационы
                <Icon name="ChevronDown" size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {planTypes.map((plan) => (
                  <DropdownMenuItem
                    key={plan.value}
                    onClick={() => onNavigate('plans', plan.value)}
                  >
                    {plan.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              onClick={() => onNavigate('how-it-works')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                currentPage === 'how-it-works' ? 'text-primary' : 'text-gray-700'
              }`}
            >
              Как это работает?
            </button>

            <button
              onClick={() => onNavigate('contacts')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                currentPage === 'contacts' ? 'text-primary' : 'text-gray-700'
              }`}
            >
              Контакты
            </button>
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
                  <button 
                    onClick={() => onNavigate('account')}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors"
                  >
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
              <Button onClick={() => setShowAuthModal(true)} variant="default">
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
                
                <button
                  onClick={() => {
                    onNavigate('home');
                    setIsMenuOpen(false);
                  }}
                  className={`text-left text-lg font-medium transition-colors hover:text-primary ${
                    currentPage === 'home' ? 'text-primary' : 'text-gray-700'
                  }`}
                >
                  Главная
                </button>

                <div className="space-y-2">
                  <div className="text-lg font-medium text-gray-700">Рационы</div>
                  {planTypes.map((plan) => (
                    <button
                      key={plan.value}
                      onClick={() => {
                        onNavigate('plans', plan.value);
                        setIsMenuOpen(false);
                      }}
                      className="text-left text-base pl-4 text-gray-600 hover:text-primary transition-colors block w-full"
                    >
                      {plan.label}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => {
                    onNavigate('how-it-works');
                    setIsMenuOpen(false);
                  }}
                  className={`text-left text-lg font-medium transition-colors hover:text-primary ${
                    currentPage === 'how-it-works' ? 'text-primary' : 'text-gray-700'
                  }`}
                >
                  Как это работает?
                </button>

                <button
                  onClick={() => {
                    onNavigate('contacts');
                    setIsMenuOpen(false);
                  }}
                  className={`text-left text-lg font-medium transition-colors hover:text-primary ${
                    currentPage === 'contacts' ? 'text-primary' : 'text-gray-700'
                  }`}
                >
                  Контакты
                </button>
                
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
                    <button 
                      onClick={() => {
                        onNavigate('account');
                        setIsMenuOpen(false);
                      }}
                      className="text-left px-4 py-2 text-sm hover:bg-gray-50 rounded transition-colors"
                    >
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
                    setShowAuthModal(true);
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
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        onAuth={onAuth}
      />
    </header>
  );
}