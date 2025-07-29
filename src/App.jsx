import React, { useState } from 'react'
import Search from './components/Search'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('Batman');
  return (
    <main>
      <div className='pattern'>
          <div className='wrapper'>
              <header>
                <img src="./hero-img.png" alt="hero-image" />
                <h1>Find <span className='text-gradient'>Movies</span> you'll love to watch</h1>
              </header>
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
      </div>
    </main>
  )
}

export default App