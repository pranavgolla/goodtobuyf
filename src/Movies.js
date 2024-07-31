// src/Movies.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Movie from './Movie';
import Modal from './Modal';
import './modal.css'
// import './movies.css'; // Assuming you have a CSS file for Movies component

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=82ea1981fa2d4f47c692ed7e81dd5a40');
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching the movies:', error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    setFilteredMovies(movies.filter(movie => 
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  }, [movies, searchTerm]);

  const handleMovieClick = async (movie) => {
    try {
      const [creditsResponse, detailsResponse] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=82ea1981fa2d4f47c692ed7e81dd5a40`),
        axios.get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=82ea1981fa2d4f47c692ed7e81dd5a40`),
      ]);
      const updatedMovie = {
        ...movie,
        credits: creditsResponse.data,
        details: detailsResponse.data,
      };
      setSelectedMovie(updatedMovie);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div>
      <h1>Movies</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-box" // Ensure CSS for the search box is applied
        style={{marginBottom:'25px',width:'50%',height:'auto',fontSize:'15px',borderRadius:'3px'}}
      />
      <div className="movie-list">
        {filteredMovies.map(movie => (
          <Movie key={movie.id} movie={movie} onClick={() => handleMovieClick(movie)} />
        ))}
      </div>
      <Modal movie={selectedMovie} onClose={handleCloseModal} />
    </div>
  );
};

export default Movies;
