import React, { useState } from 'react';
import '../styles/RegisterPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../store/slices/authSlice';
import type { RootState } from '../store/store';
import Loader from '../components/Loader';

const RegisterPage = () => {
    const [form, setForm] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [isFocused, setIsFocused] = useState({
        firstName: false,
        middleName: false,
        lastName: false,
        email: false,
        password: false
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, error } = useSelector((state: RootState) => state.auth);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFocus = (field: string) => setIsFocused(prev => ({ ...prev, [field]: true }));
    const handleBlur = (field: string) => setIsFocused(prev => ({ ...prev, [field]: false }));

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            firstName: form.firstName.trim(),
            middleName: form.middleName.trim(),
            lastName: form.lastName.trim(),
            email: form.email.trim(),
            password: form.password,
        };

        try {
            const resultAction = await dispatch(registerUser(payload) as any);
            if (registerUser.fulfilled.match(resultAction)) {
                navigate('/');
            }
        } catch (err) {
            console.error('Registration Error:', err);
        }
    };

    return (
        <div className="register-page">
            {loading && <Loader message="Creating your universe..." />}

            {/* Animated Background */}
            <div className="register-background">
                <div className="gradient-bg">
                    <div className="gradient-1"></div>
                    <div className="gradient-2"></div>
                    <div className="gradient-3"></div>
                </div>
            </div>

            <div className="register-container">
                <div className="register-card">
                    {/* Header with Logo */}
                    <div className="register-header">
                        <div className="logo-container">
                            <div className="logo-icon">🚀</div>
                            <h1 className="logo-text">Join CineVerse</h1>
                        </div>
                        <p className="register-subtitle">Begin your cinematic journey</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="error-message">
                            <span className="error-icon">⚠️</span>
                            {error}
                        </div>
                    )}

                    {/* Registration Form */}
                    <form onSubmit={handleRegister} className="register-form">
                        <div className="form-grid">
                            <div className={`input-group ${isFocused.firstName ? 'focused' : ''} ${form.firstName ? 'has-value' : ''}`}>
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    value={form.firstName}
                                    onChange={handleChange}
                                    onFocus={() => handleFocus('firstName')}
                                    onBlur={() => handleBlur('firstName')}
                                    required
                                    disabled={loading}
                                />
                                <div className="input-border"></div>
                            </div>

                            <div className={`input-group ${isFocused.middleName ? 'focused' : ''} ${form.middleName ? 'has-value' : ''}`}>
                                <label htmlFor="middleName">Middle Name</label>
                                <input
                                    id="middleName"
                                    name="middleName"
                                    type="text"
                                    value={form.middleName}
                                    onChange={handleChange}
                                    onFocus={() => handleFocus('middleName')}
                                    onBlur={() => handleBlur('middleName')}
                                    disabled={loading}
                                />
                                <div className="input-border"></div>
                            </div>

                            <div className={`input-group ${isFocused.lastName ? 'focused' : ''} ${form.lastName ? 'has-value' : ''}`}>
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    value={form.lastName}
                                    onChange={handleChange}
                                    onFocus={() => handleFocus('lastName')}
                                    onBlur={() => handleBlur('lastName')}
                                    required
                                    disabled={loading}
                                />
                                <div className="input-border"></div>
                            </div>

                            <div className={`input-group ${isFocused.email ? 'focused' : ''} ${form.email ? 'has-value' : ''}`}>
                                <label htmlFor="email">Email Address</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    onFocus={() => handleFocus('email')}
                                    onBlur={() => handleBlur('email')}
                                    required
                                    disabled={loading}
                                />
                                <div className="input-border"></div>
                            </div>

                            <div className={`input-group ${isFocused.password ? 'focused' : ''} ${form.password ? 'has-value' : ''}`}>
                                <label htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    onFocus={() => handleFocus('password')}
                                    onBlur={() => handleBlur('password')}
                                    required
                                    disabled={loading}
                                />
                                <div className="input-border"></div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="register-button"
                            disabled={loading}
                        >
                            <span className="button-text">
                                {loading ? 'Creating Portal...' : 'Launch Account'}
                            </span>
                            <span className="button-icon">🚀</span>
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="register-footer">
                        <p className="login-text">
                            Already have a portal? <a href="/login" className="login-link">Access Universe</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;