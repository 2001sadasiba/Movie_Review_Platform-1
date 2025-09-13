import React, { useState } from 'react';
import '../styles/LoginPage.css';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/slices/authSlice';
import type { RootState } from '../store/store';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isFocused, setIsFocused] = useState({ email: false, password: false });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, error } = useSelector((state: RootState) => state.auth);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            email: email.trim(),
            password,
        };

        try {
            const resultAction = await dispatch(loginUser(payload) as any);
            if (loginUser.fulfilled.match(resultAction)) {
                navigate('/');
            }
        } catch (err) {
            console.error('Login Error:', err);
        }
    };

    const handleFocus = (field: string) => setIsFocused(prev => ({ ...prev, [field]: true }));
    const handleBlur = (field: string) => setIsFocused(prev => ({ ...prev, [field]: false }));

    return (
        <div className="login-page">
            {loading && <Loader message="Logging in..." />}

            {/* Animated Background */}
            <div className="login-background">
                <div className="gradient-bg">
                    <div className="gradient-1"></div>
                    <div className="gradient-2"></div>
                    <div className="gradient-3"></div>
                </div>
            </div>

            <div className="login-container">
                <div className="login-card">
                    {/* Header with Logo */}
                    <div className="login-header">
                        <div className="logo-container">
                            <div className="logo-icon">🎬</div>
                            <h1 className="logo-text">CineVerse</h1>
                        </div>
                        <p className="login-subtitle">Enter your cinematic universe</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="error-message">
                            <span className="error-icon">⚠️</span>
                            {error}
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="login-form">
                        <div className={`input-group ${isFocused.email ? 'focused' : ''} ${email ? 'has-value' : ''}`}>
                            <label htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                onFocus={() => handleFocus('email')}
                                onBlur={() => handleBlur('email')}
                                required
                                disabled={loading}
                            />
                            <div className="input-border"></div>
                        </div>

                        <div className={`input-group ${isFocused.password ? 'focused' : ''} ${password ? 'has-value' : ''}`}>
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                onFocus={() => handleFocus('password')}
                                onBlur={() => handleBlur('password')}
                                required
                                disabled={loading}
                            />
                            <div className="input-border"></div>
                        </div>

                        <button
                            type="submit"
                            className="login-button"
                            disabled={loading}
                        >
                            <span className="button-text">
                                {loading ? 'Authenticating...' : 'Access Universe'}
                            </span>
                            <span className="button-icon">→</span>
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="login-footer">
                        <p className="signup-text">
                            New to the universe? <a href="/register" className="signup-link">Create Portal</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;