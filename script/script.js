import { fetchPopularMovies } from './tmdbService.js';
import { renderMovies } from './render.js';

const btn1 = document.getElementById("previous");
const btn2 = document.getElementById("next");

let page = 1;

btn1.addEventListener('click', () => {
  if (page > 1) {
    page--;
    loadMoviePage(page);
  }
});

btn2.addEventListener('click', () => {
  page++;
  loadMoviePage(page);
});

async function loadMoviePage(page = 1) {
  try {
    const data = await fetchPopularMovies(page);
    await renderMovies(data.results);
  } catch (err) {
    console.error('Errore nel caricamento:', err);
  }
}

window.onload = () => loadMoviePage();