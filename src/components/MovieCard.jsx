import React, { useState } from 'react'

const MovieCard = ({movie:{id, title, vote_average, poster_path, original_language, release_date}}) => {
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };

  const getImageSrc = () => {
    if (imageError || !poster_path) {
      return '/No-Poster.png';
    }
    return `https://image.tmdb.org/t/p/w500${poster_path}`;
  };

  return (
    <div className='movie-card'>
        <img 
          src={getImageSrc()} 
          alt={title} 
          onError={handleImageError}
          loading="lazy"
        />
        <div className='mt-4'>
            <h3>{title}</h3>
            <div className='content'>
                <div className='rating'>
                    <img src="/star.svg" alt="star" />
                    <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                </div>
                <span>•</span>
                <p className='lang'>{original_language}</p>
                <span>•</span>
                <p className='year'>{release_date ? release_date.split('-')[0] : 'N/A'}</p>
            </div>
        </div>
    </div>
  )
}

export default MovieCard
