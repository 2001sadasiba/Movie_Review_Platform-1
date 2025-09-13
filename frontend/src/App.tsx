// import React, { useState } from 'react';
// import './App.css';

// interface Movie {
//   id: number;
//   title: string;
//   year: number;
//   poster: string;
//   rating: number;
//   genre: string;
// }

// const App: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   // Sample movie data
//   const movies: Movie[] = [
//     {
//       id: 1,
//       title: "The Shawshank Redemption",
//       year: 1994,
//       poster: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=300",
//       rating: 9.3,
//       genre: "Drama"
//     },
//     {
//       id: 2,
//       title: "The Godfather",
//       year: 1972,
//       poster: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=300",
//       rating: 9.2,
//       genre: "Crime"
//     },
//     {
//       id: 3,
//       title: "The Dark Knight",
//       year: 2008,
//       poster: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=300",
//       rating: 9.0,
//       genre: "Action"
//     },
//     {
//       id: 4,
//       title: "Pulp Fiction",
//       year: 1994,
//       poster: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=300",
//       rating: 8.9,
//       genre: "Crime"
//     },
//     {
//       id: 5,
//       title: "Forrest Gump",
//       year: 1994,
//       poster: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=300",
//       rating: 8.8,
//       genre: "Drama"
//     },
//     {
//       id: 6,
//       title: "Inception",
//       year: 2010,
//       poster: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=300",
//       rating: 8.7,
//       genre: "Sci-Fi"
//     }
//   ];

//   const filteredMovies = movies.filter(movie =>
//     movie.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleMovieClick = (movie: Movie) => {
//     console.log('Movie clicked:', movie.title);
//     // Here you would navigate to movie details or open a modal
//   };

//   const renderStars = (rating: number) => {
//     const stars = Math.round(rating / 2);
//     return '★'.repeat(stars) + '☆'.repeat(5 - stars);
//   };

//   return (
//     <div className="app">
//       {/* Header */}
//       <header className="header">
//         <div className="container">
//           <div className="logo">MovieReview</div>
//           <nav className="nav">
//             <a href="#home">Home</a>
//             <a href="#movies">Movies</a>
//             <a href="#reviews">Reviews</a>
//             <a href="#profile">Profile</a>
//           </nav>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="main">
//         <div className="container">
//           <h1 className="text-center mb-4">Discover Amazing Movies</h1>

//           {/* Search Bar */}
//           <div className="search-container">
//             <div className="search-icon">🔍</div>
//             <input
//               type="text"
//               className="search-input"
//               placeholder="Search for movies..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           {/* Loading Spinner */}
//           {isLoading && (
//             <div className="loading">
//               <div className="spinner"></div>
//             </div>
//           )}

//           {/* Movies Grid */}
//           {!isLoading && (
//             <div className="movie-grid">
//               {filteredMovies.map((movie) => (
//                 <div
//                   key={movie.id}
//                   className="movie-card"
//                   onClick={() => handleMovieClick(movie)}
//                 >
//                   <img
//                     src={movie.poster}
//                     alt={movie.title}
//                     className="movie-poster"
//                   />
//                   <div className="movie-info">
//                     <h3 className="movie-title">{movie.title}</h3>
//                     <p className="movie-year">{movie.year} • {movie.genre}</p>
//                     <div className="movie-rating">
//                       <span className="rating-stars">
//                         {renderStars(movie.rating)}
//                       </span>
//                       <span className="rating-value">{movie.rating}</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* No Results */}
//           {!isLoading && filteredMovies.length === 0 && searchTerm && (
//             <div className="text-center mt-5">
//               <h3>No movies found</h3>
//               <p>Try searching with different keywords</p>
//             </div>
//           )}

//           {/* Action Buttons */}
//           <div className="text-center mt-5">
//             <button
//               className="btn btn-primary"
//               onClick={() => setIsLoading(!isLoading)}
//             >
//               {isLoading ? 'Stop Loading' : 'Load More Movies'}
//             </button>
//             <button className="btn btn-secondary" style={{ marginLeft: '1rem' }}>
//               Add New Review
//             </button>
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="footer">
//         <div className="container">
//           <p>&copy; 2025 MovieReview Platform. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default App;

import PageRouter from './router/PageRouter';


const App = () => {
    return <PageRouter />;
};

export default App;
