import { fetchPopularMovies, getGeneri, loadMoviesByGenre } from './tmdbService.js';
import { renderGeneri, renderMovies } from './render.js';

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

document.querySelector('#genereSelect').addEventListener('change', async(e) => {
  const selectedGenereId = e.target.value;
  await loadMoviesByGenre(selectedGenereId);
});

async function loadMoviePage(page = 1) {
  const select = document.getElementById('#genereSelect');
  try {
      const data = await fetchPopularMovies(page);
      await renderMovies(data.results);
  } catch (err) {
    console.error('Errore nel caricamento:', err);
  }
}

async function loadGeneri() {
  try{
    const data = await getGeneri();
    await renderGeneri(data);
  }catch(err){
    console.error('errore nel caricamento', err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadMoviePage();
  loadGeneri();
});
