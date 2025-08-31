import React, { useState, useEffect } from 'react'
import Search from './components/Search'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=1234567890&query=${searchTerm}`);
      const data = await response.json();
      console.log(data);
    }
  }, [searchTerm])
  return (
    <main>
      <div className='pattern'>
          <div className='wrapper'>
              <header>
                <img src="./hero-img.png" alt="hero-image" />
                <h1>Find <span className='text-gradient'>Movies</span> you'll love to watch</h1>
              </header>
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
          </div>
      </div>
    </main>
  )
}

export default App