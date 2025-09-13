// renderMovies.js
import { fetchMovieDetails, getImageUrl } from './tmdbService.js';

export async function renderMovies(movies) {
  const container = document.querySelector('.movies');
  container.innerHTML = '';

  const limitedMovies = movies.slice(0, 18);

  for (const movie of limitedMovies) {
    const details = await fetchMovieDetails(movie.id);

    const movieDiv = document.createElement('div');
    movieDiv.classList.add('movie');

    const img = document.createElement('img');
    img.src = getImageUrl(details.poster_path);

    const h3 = document.createElement('h3');
    h3.textContent = details.title;

    movieDiv.appendChild(img);
    movieDiv.appendChild(h3);
    container.appendChild(movieDiv);
  }
}