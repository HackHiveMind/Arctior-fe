import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import AppNavbar from './AppNavbar';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import PortfolioSection from './PortfolioSection';
import FooterSection from './FooterSectionClean';
import CategoryPage from './CategoryPage';
import AdminAccessPage from './AdminAccessPage';
import { AdminProvider } from './AdminContext';
import FloatingAdminButton from './FloatingAdminButton';
import { ToastProvider } from './ToastContext';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname === '/admin' || location.pathname === '/admin/register';

  return (
    <AdminProvider>
      <ToastProvider>
        <div className="min-h-screen bg-gradient-to-b from-ark-purple to-ark-purple-light text-white font-sans overflow-x-hidden">
          {!isAdminRoute && <AppNavbar />}
          <main>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <HeroSection />
                    <FeaturesSection />
                    <PortfolioSection />
                  </>
                }
              />
              <Route path="/categorie/:slug" element={<CategoryPage />} />
              <Route path="/admin" element={<AdminAccessPage />} />
              <Route path="/admin/register" element={<AdminAccessPage initialMode="register" />} />
            </Routes>
            <FooterSection />
          </main>
          {!isAdminRoute && <FloatingAdminButton />}
        </div>
      </ToastProvider>
    </AdminProvider>
  );
}

export default App;
