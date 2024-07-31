// src/Movie.js
import React from 'react';

const Movie = ({ movie, onClick }) => {
  return (
    <div className="movie" tabIndex="0" onClick={() => onClick(movie)}>
      <h2>{movie.title}</h2>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <p>{movie.overview}</p>
      <p><strong>Release Date:</strong> {movie.release_date}</p>
      <p><strong>Popularity:</strong> {movie.popularity}</p>
      <p><strong>Rating:</strong> {movie.vote_average} ({movie.vote_count} votes)</p>
    </div>
  );
};

export default Movie;
