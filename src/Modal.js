// src/Modal.js
import React, { useEffect } from 'react';
import './modal.css'; // Ensure styles are imported

const Modal = ({ movie, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = movie ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [movie]);

  if (!movie) return null;

  const { credits } = movie;

  const getDirector = () => {
    const director = credits.crew.find(member => member.job === 'Director');
    return director ? director.name : 'Unknown';
  };

  const getCast = () => {
    return credits.cast.slice(0, 5).map((cast, index) => (
      <li key={index}>{cast.name} as {cast.character}</li>
    ));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-image">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        </div>
        <div className="modal-details">
          <h2>{movie.title}</h2>
          <p><strong>Overview:</strong> {movie.overview}</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Popularity:</strong> {movie.popularity}</p>
          <p><strong>Rating:</strong> {movie.vote_average} ({movie.vote_count} votes)</p>
          <p><strong>Director:</strong> {getDirector()}</p>
          <p><strong>Cast:</strong></p>
          <ul>{getCast()}</ul>
        </div>
      </div>
    </div>
  );
};

export default Modal;
