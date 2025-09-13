// src/router/PageRouter.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage, RegisterPage, HomePage } from '../pages';
import ProtectedRoute from '../components/ProtectedRoute';
import {MovieDetailsPage} from '../pages';

const PageRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/movie/:imdbID" element={<MovieDetailsPage />} />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};


export default PageRouter;
