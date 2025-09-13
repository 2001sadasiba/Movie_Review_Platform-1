import { useEffect } from 'react';
import type{ ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticateUser } from '../services/authService';
import { logout } from '../store/slices/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const token = useSelector((state: any) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Public routes that do not require auth
  const publicPaths = ['/login', '/register'];

  useEffect(() => {
    const checkAuth = async () => {
      if (publicPaths.includes(location.pathname)) return;

      if (!token) {
        navigate('/login');
        return;
      }

      try {
        await authenticateUser(token);
        // Authorized
      } catch (err) {
        dispatch(logout());
        navigate('/login');
      }
    };

    checkAuth();
  }, [token, dispatch, navigate, location.pathname]);

  return <>{children}</>;
};

export default AuthProvider;
