import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import PlansPage from "./pages/PlansPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import ContactsPage from "./pages/ContactsPage";

const queryClient = new QueryClient();

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'plans':
        return <PlansPage />;
      case 'how-it-works':
        return <HowItWorksPage onNavigate={setCurrentPage} />;
      case 'contacts':
        return <ContactsPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen flex flex-col">
          <Header onNavigate={setCurrentPage} currentPage={currentPage} />
          <main className="flex-1">
            {renderPage()}
          </main>
          <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-2xl font-bold font-heading mb-4">GOODFOOD</h3>
                  <p className="text-gray-400 text-sm">
                    Умное топливо для твоего тела
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-4">Навигация</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>
                      <button onClick={() => setCurrentPage('home')} className="hover:text-white transition-colors">
                        Главная
                      </button>
                    </li>
                    <li>
                      <button onClick={() => setCurrentPage('plans')} className="hover:text-white transition-colors">
                        Рационы
                      </button>
                    </li>
                    <li>
                      <button onClick={() => setCurrentPage('how-it-works')} className="hover:text-white transition-colors">
                        Как это работает
                      </button>
                    </li>
                    <li>
                      <button onClick={() => setCurrentPage('contacts')} className="hover:text-white transition-colors">
                        Контакты
                      </button>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-4">Контакты</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>+7 932 059 87 12</li>
                    <li>info@goodfood.ru</li>
                    <li>г. Москва</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-4">Мы в соцсетях</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>
                      <a href="#" className="hover:text-white transition-colors">Telegram</a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white transition-colors">Instagram</a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white transition-colors">Facebook</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
                © 2024 GOODFOOD. Все права защищены.
              </div>
            </div>
          </footer>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
