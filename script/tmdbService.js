// tmdbService.js
import { TMDB_API_KEY as KEY } from '../keys/key.js';

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + KEY
  }
};

export async function fetchPopularMovies(page = 1) {
  const response = await fetch(`${BASE_URL}/movie/popular?page=${page}`, options);
  if (!response.ok) throw new Error('Errore nel recupero dei film popolari');
  return response.json();
}

export async function fetchMovieDetails(id) {
  const response = await fetch(`${BASE_URL}/movie/${id}`, options);
  if (!response.ok) throw new Error(`Errore nel recupero dei dettagli per il film ${id}`);
  return response.json();
}

export function getImageUrl(path) {
  return path ? IMAGE_URL + path : 'https://via.placeholder.com/500x750?text=No+Image';
}