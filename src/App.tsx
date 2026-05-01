import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import AppNavbar from './components/layout/AppNavbar';
import FooterSection from './components/layout/FooterSectionClean';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import AdminAccessPage from './admin/AdminAccessPage';
import AdminRegisterPage from './admin/AdminRegisterPage';
import AdminRecoveryPage from './admin/AdminRecoveryPage';
import AdminEmergencyResetPage from './admin/AdminEmergencyResetPage';
import AdminResetPasswordPage from './admin/AdminResetPasswordPage';
import { AdminProvider } from './admin/AdminContext';
import FloatingAdminButton from './components/ui/FloatingAdminButton';
import { ToastProvider } from './context/ToastContext';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname === '/admin' || location.pathname.startsWith('/admin/');

  return (
    <AdminProvider>
      <ToastProvider>
        <div className="min-h-screen bg-gradient-to-b from-ark-purple to-ark-purple-light text-white font-sans overflow-x-hidden">
          {!isAdminRoute && <AppNavbar />}
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/categorie/:slug" element={<CategoryPage />} />
              <Route path="/admin" element={<AdminAccessPage />} />
              <Route path="/admin/register" element={<AdminRegisterPage />} />
              <Route path="/admin/recovery" element={<AdminRecoveryPage />} />
              <Route path="/admin/emergency-reset" element={<AdminEmergencyResetPage />} />
              <Route path="/admin/reset-password" element={<AdminResetPasswordPage />} />
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
