// src/components/MovieDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = '82ea1981fa2d4f47c692ed7e81dd5a40';
const BASE_URL = 'https://api.themoviedb.org/3';

const MovieDetails = ({ movieName }) => {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                // Search for the movie
                const searchResponse = await axios.get(`${BASE_URL}/search/movie`, {
                    params: {
                        api_key: API_KEY,
                        query: movieName
                    }
                });

                if (searchResponse.data.results.length > 0) {
                    const movieId = searchResponse.data.results[0].id;

                    // Get detailed movie information
                    const detailsResponse = await axios.get(`${BASE_URL}/movie/${movieId}`, {
                        params: {
                            api_key: API_KEY,
                            append_to_response: 'credits,images'
                        }
                    });

                    setMovie(detailsResponse.data);
                } else {
                    setError('Movie not found');
                }
            } catch (err) {
                setError('Error fetching movie details');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [movieName]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    if (!movie) return null;

    return (
        <div>
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
            <p>Rating: {movie.vote_average}</p>
            <h2>Cast:</h2>
            <ul>
                {movie.credits.cast.map((actor) => (
                    <li key={actor.cast_id}>
                        <img 
                            src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} 
                            alt={actor.name} 
                            width="100" 
                        />
                        <p>{actor.name} as {actor.character}</p>
                    </li>
                ))}
            </ul>
            <h2>Crew:</h2>
            <ul>
                {movie.credits.crew.map((member) => (
                    <li key={member.credit_id}>
                        <p>{member.name} ({member.job})</p>
                    </li>
                ))}
            </ul>
            <h2>Images:</h2>
            <div>
                {movie.images.backdrops.map((image) => (
                    <img 
                        key={image.file_path}
                        src={`https://image.tmdb.org/t/p/w500${image.file_path}`} 
                        alt="Backdrop" 
                        width="300" 
                        style={{ margin: '5px' }} 
                    />
                ))}
            </div>
        </div>
    );
};

export default MovieDetails;
