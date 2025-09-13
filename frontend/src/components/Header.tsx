import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../store/store';
import { logout } from '../store/slices/authSlice';
import { logoutUser } from '../services/authService';
import '../styles/Header.css';

const Header = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state: RootState) => state.auth.token);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    const toggleMenu = () => {
        setMobileMenuOpen(prev => !prev);
    };

    const handleLogout = async () => {
        try {
            if (token) {
                await logoutUser(token);
            }
        } catch (error) {
            console.error('Logout API error:', error);
        } finally {
            dispatch(logout());
            localStorage.removeItem('authToken');
            setMobileMenuOpen(false);
            navigate('/login');
        }
    };

    return (
        <header className="app-header">
            <div className="header-container">
                <div className="logo" onClick={() => navigate('/')}>
                    🎬 CineVerse
                </div>

                <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <nav className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
                    {isAuthenticated ? (
                        <button className="logout-btn" onClick={handleLogout}>
                            🚪 Logout
                        </button>
                    ) : (
                        <a href="/login" className="login-btn">🔐 Login</a>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;