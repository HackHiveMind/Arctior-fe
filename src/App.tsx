import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import AppNavbar from './components/layout/AppNavbar';
import FooterSection from './components/layout/FooterSectionClean';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import AdminAccessPage from './admin/AdminAccessPage';
import { AdminProvider } from './admin/AdminContext';
import FloatingAdminButton from './components/ui/FloatingAdminButton';
import { ToastProvider } from './context/ToastContext';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname === '/admin' || location.pathname === '/admin/register';

  return (
    <AdminProvider>
      <ToastProvider>
        <LanguageProvider>
          <div className="min-h-screen bg-gradient-to-b from-ark-purple to-ark-purple-light text-white font-sans overflow-x-hidden">
            {!isAdminRoute && <AppNavbar />}
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/categorie/:slug" element={<CategoryPage />} />
                <Route path="/admin" element={<AdminAccessPage />} />
                <Route path="/admin/register" element={<AdminAccessPage initialMode="register" />} />
              </Routes>
              <FooterSection />
            </main>
            {!isAdminRoute && <FloatingAdminButton />}
          </div>
        </LanguageProvider>
      </ToastProvider>
    </AdminProvider>
  );
}

export default App;
