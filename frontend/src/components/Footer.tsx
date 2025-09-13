import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="app-footer">
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-section">
                        <div className="footer-logo">
                            🎬 CineVerse
                        </div>
                        <p className="footer-description">
                            Your ultimate destination for movie reviews and recommendations.
                            Discover, rate, and share your cinematic experiences.
                        </p>
                    </div>

                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <ul className="footer-links">
                            <li><a href="/">Home</a></li>
                            <li><a href="/movies">Movies</a></li>
                            <li><a href="/reviews">Reviews</a></li>
                            <li><a href="/about">About</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Connect</h4>
                        <div className="social-links">
                            <a href="#" className="social-link" aria-label="Twitter">
                                <span className="social-icon">🐦</span>
                            </a>
                            <a href="#" className="social-link" aria-label="Facebook">
                                <span className="social-icon">📘</span>
                            </a>
                            <a href="#" className="social-link" aria-label="Instagram">
                                <span className="social-icon">📸</span>
                            </a>
                            <a href="#" className="social-link" aria-label="GitHub">
                                <span className="social-icon">💻</span>
                            </a>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h4>Legal</h4>
                        <ul className="footer-links">
                            <li><a href="/privacy">Privacy Policy</a></li>
                            <li><a href="/terms">Terms of Service</a></li>
                            <li><a href="/cookies">Cookie Policy</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-divider"></div>
                    <p className="copyright">
                        © 2025 CineVerse. Made with ❤️ for movie lovers. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;