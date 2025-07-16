// src/components/PrivateRoute.tsx
import React, { ReactNode, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps): ReactElement | null => {
  const auth = useAuth();

  // If AuthContext is not initialized
  if (!auth) return null;

  const { user, loading } = auth;

  // While checking auth state
  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;

  // Redirect to login if not authenticated
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
