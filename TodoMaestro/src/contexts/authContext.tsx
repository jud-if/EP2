import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
//@ts-ignore
import api from '../services/api';

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  userId: string | null;
  checkAuthStatus: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
  }

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = async () => {
    try {
      const response = await api.get('/auth/status');
      setIsAuthenticated(response.data.isAuthenticated);
      setUserId(response.data.userId);
    } catch {
      setIsAuthenticated(false);
      setUserId(null);
    } finally {
      setLoading(false); // Cambia el estado de carga
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, loading, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
