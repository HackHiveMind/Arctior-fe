import { Navigate, useLocation } from 'react-router-dom';
import { useAdmin } from './AdminContext';

type RequireAuthProps = {
  children: React.ReactNode;
};

export default function RequireAuth({ children }: RequireAuthProps) {
  const { isAuthenticated, isInitializing } = useAdmin();
  const location = useLocation();

  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ark-purple px-4 text-center text-white">
        Se incarca sesiunea...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
