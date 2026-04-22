import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAdmin } from './AdminContext';

const FloatingAdminButton: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated } = useAdmin();

  if (location.pathname === '/admin') {
    return null;
  }

  return (
    <Link
      to="/admin"
      className="fixed bottom-4 right-4 z-50 rounded-full border border-ark-gold/30 bg-ark-purple/80 px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-ark-gold opacity-60 shadow-xl shadow-black/30 backdrop-blur transition hover:opacity-100 sm:bottom-5 sm:right-5 sm:px-4 sm:text-xs sm:tracking-[0.25em]"
    >
      {isAuthenticated ? 'Admin' : 'Panel'}
    </Link>
  );
};

export default FloatingAdminButton;
