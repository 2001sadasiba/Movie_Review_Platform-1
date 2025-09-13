export interface OMDBSearchResponse {
  Search?: OMDBMovieSearchResult[];
  totalResults?: string;
  Response: 'True' | 'False';
  Error?: string;
}

// Interface for the simplified movie data we get from a search
export interface OMDBMovieSearchResult {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

// Interface for the API's single movie response
export interface OMDBSingleMovieResponse {
  Response: 'True' | 'False';
  Error?: string;
}

// Interface for the full movie details (extends the single movie response)
export interface OMDBSingleMovieResult extends OMDBSingleMovieResponse {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Ratings: { Source: string; Value: string }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
}