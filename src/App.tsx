import './App.css';
import { lazy, Suspense, type ReactNode } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppNavbar from './components/layout/AppNavbar';
import FooterSection from './components/layout/FooterSectionClean';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import { AdminProvider } from './admin/AdminContext';
import { ToastProvider } from './context/ToastContext';
import { LanguageProvider } from './context/LanguageContext';
import RequireAuth from './admin/RequireAuth';
import NotFoundPage from './pages/NotFoundPage';

const AdminAccessPage = lazy(() => import('./admin/AdminAccessPage'));
const AdminRecoveryPage = lazy(() => import('./admin/AdminRecoveryPage'));
const AdminEmergencyResetPage = lazy(() => import('./admin/AdminEmergencyResetPage'));
const AdminResetPasswordPage = lazy(() => import('./admin/AdminResetPasswordPage'));
const AdminDashboard = lazy(() => import('./admin/AdminDashboard'));

const loadingFallback = (
  <div className="flex min-h-screen items-center justify-center bg-ark-purple px-4 text-center text-white">
    Se incarca...
  </div>
);

function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AppNavbar />
      <main>{children}</main>
      <FooterSection />
    </>
  );
}

function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminProvider>
      <Suspense fallback={loadingFallback}>{children}</Suspense>
    </AdminProvider>
  );
}

function App() {
  return (
    <ToastProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-gradient-to-b from-ark-purple to-ark-purple-light font-sans text-white">
          <Routes>
            <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
            <Route path="/categorie/:slug" element={<PublicLayout><CategoryPage /></PublicLayout>} />
            <Route path="/categorii/:slug" element={<PublicLayout><CategoryPage /></PublicLayout>} />
            <Route path="/admin" element={<AdminLayout><AdminAccessPage /></AdminLayout>} />
            <Route path="/admin/register" element={<AdminLayout><AdminAccessPage initialMode="register" /></AdminLayout>} />
            <Route path="/admin/recovery" element={<AdminLayout><AdminRecoveryPage /></AdminLayout>} />
            <Route path="/admin/reset-password" element={<AdminLayout><AdminResetPasswordPage /></AdminLayout>} />
            <Route path="/admin/emergency" element={<AdminLayout><AdminEmergencyResetPage /></AdminLayout>} />
            <Route path="/admin/emergency-reset" element={<AdminLayout><AdminEmergencyResetPage /></AdminLayout>} />
            <Route
              path="/admin/dashboard"
              element={
                <AdminLayout>
                  <RequireAuth>
                    <AdminDashboard />
                  </RequireAuth>
                </AdminLayout>
              }
            />
            <Route path="*" element={<PublicLayout><NotFoundPage /></PublicLayout>} />
          </Routes>
        </div>
      </LanguageProvider>
    </ToastProvider>
  );
}

export default App;
