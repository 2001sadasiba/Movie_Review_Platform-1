import { Footer, Header, MovieList } from '../components';

const HomePage = () => {
    return (
        <div>
            <Header />

            <main className="main">
                <div className="container">
                    <MovieList />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default HomePage;
