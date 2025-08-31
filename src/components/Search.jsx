import React from 'react'

const Search = ({searchTerm, setSearchTerm}) => {
  return (
    <div className='search'>
        <div className='search-bar'>
            <img src="search.svg" alt="" />
            <input type="text" placeholder='Search movie or tv show...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            
        </div> 
    </div>
  )
}

export default Search