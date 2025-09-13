import React from 'react';
import '../styles/Loader.css'; 

const Loader: React.FC<{ message?: string }> = ({ message = "Loading..." }) => {
    return (
        <div className="loading-overlay">
            <div className="modern-loader">
                <div className="loader-spinner"></div>
                <p className="loader-text">{message}</p>
            </div>
        </div>
    );
};

export default Loader;