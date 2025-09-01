import React, { useState, useEffect } from 'react'
import { useDebounce } from 'react-use'
import Search from './components/Search'
import Spiner from './components/Spiner'
import MovieCard from './components/MovieCard'


const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

//Debounce the search every 500ms to avoid multiple requests to the API
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query='') => {
    setIsLoading(true);
    setErrorMessage('');
    
    // Check if API key is available
    if (!API_KEY) {
      console.error('TMDB API key is not configured');
      setErrorMessage('API key is not configured. Please check your environment variables.');
      setIsLoading(false);
      return;
    }
    
    try{
      const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      console.log('Fetching from:', endpoint);
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Response Error:', response.status, errorText);
        throw new Error(`Failed to fetch movies: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('API Response:', data);
      
      if (data.response === 'False') {
        setErrorMessage(data.error || 'Error fetching movies from TMDB');
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);

    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage(`Fetching movies failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  },[debouncedSearchTerm]);
  
  return (
    <main>
      <div className='pattern'>
          <div className='wrapper'>
              <header>
                <img src="/hero-img.png" alt="hero-image" />
                <h1>Find <span className='text-gradient'>Movies</span> you'll love to watch</h1>
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
              </header>

              <section className="trending">
                <h2>Trending Movies</h2>
                
                <ul>
                  <li>
                    <p>1</p>
                    <img src="/movie1.jpeg" alt="Movie Title" />
                  </li>
                  <li>
                    <p>2</p>
                    <img src="/movie2.jpeg" alt="Movie Title" />
                  </li>
                  <li>
                    <p>3</p>
                    <img src="/movie3.jpeg" alt="Movie Title" />
                  </li>
                  <li>
                    <p>3</p>
                    <img src="/movie4.jpeg" alt="Movie Title" />
                  </li>
                  <li>
                    <p>3</p>
                    <img src="/movie5.jpeg" alt="Movie Title" />
                  </li>
                </ul>
              </section>
              <section className='all-movies'>
                <h2 className='mt-10'>All Movies</h2>
                {isLoading ? ( <Spiner /> ) : errorMessage ? (<p className='text-red-500 text-base'>{errorMessage}</p>)
                : (
                  <ul>
                    {movieList.map((movie) => (
                      <MovieCard key={movie.id} movie={movie} />
                    ))}
                  </ul>
                )}
              </section>
          </div>
      </div>
    </main>
  )
}

export default App