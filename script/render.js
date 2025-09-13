// renderMovies.js

//RENDER PER LA GENERAZIONE DEGLI ELEMENTI NELLA PAGINA
import { fetchMovieDetails, getImageUrl } from './tmdbService.js';

export async function renderMovies(movies, options = {}) {
  const {
    containerSelector = '.movies',
    titleTag = 'h3',
    movieClass = 'movie'
  } = options;

  const container = document.querySelector(containerSelector);
  if (!container) {
    console.warn(`Contenitore "${containerSelector}" non trovato`);
    return;
  }

  container.innerHTML = '';

  const limitedMovies = movies.slice(0, 18);

  for (const movie of limitedMovies) {
    const details = await fetchMovieDetails(movie.id);

    const movieDiv = document.createElement('div');
    if (movieClass) movieDiv.classList.add(movieClass);

    const img = document.createElement('img');
    img.src = getImageUrl(details.poster_path);

    const titleElement = document.createElement(titleTag);
    titleElement.textContent = details.title;

    movieDiv.appendChild(img);
    movieDiv.appendChild(titleElement);
    container.appendChild(movieDiv);
  }
}


export async function renderGeneri(generi) {
    const container = document.querySelector('#genereSelect');
    container.innerHTML = "";

    generi.forEach(genere => {
        const options = document.createElement('option');
        options.value = genere.id;
        options.textContent = genere.name;
        container.appendChild(options);
    });
}
