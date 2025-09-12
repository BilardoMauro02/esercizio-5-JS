import { TMDB_API_KEY } from '../keys/key.js';

const btn1 = document.getElementById("previous");
const btn2 = document.getElementById("next");

let page = 1;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + TMDB_API_KEY
  }
};

btn1.addEventListener('click', () =>{
  if(page > 1){
    page--;
    loadMoviePage(page);
  }
})

btn2.addEventListener('click', () =>{
    page++;
    loadMoviePage(page);
})

//FUNZIONE PER CARICARE LE PAGINE (INIZIALMENTE PARTE DA 1)
function loadMoviePage(page = 1){
  // MANDA LA RICHIETA AL SERVER MOVIE POPULAR CON IL VALORE DELLA PAGINA VARIABILE
  fetch(`https://api.themoviedb.org/3/movie/popular?page=${page}`, options)
  //CONVERTE LA RESPONSE IN UN JSON  
  .then(res => res.json())
  //PER OGNI DATA CHE RIENTRA IN .MOVIES STAMPA 1 ELEMENTO
    .then(data => {
      const container = document.querySelector('.movies');
      container.innerHTML = '';
      //CICLA I RISULTATI LIMITANDO A 10 STAMPE
      data.results.slice(0,10).forEach(movie => {
        fetch(`https://api.themoviedb.org/3/movie/${movie.id}`, options)
          .then(response => response.json())
          .then(details =>{
            //CREA I DIV PER DARGLI LO SPAZIO NECESSARIO
            const movieDiv = document.createElement('div');
            movieDiv.classList.add('movie');

            //RECUPERA L'IMMAGINE DEL FILM E IN ALTERNATIVA STAMPA L'ALT
            const image = details.poster_path
            ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
            : 'https://via.placeholder.com/500x750?text=No+Image';
            
            //NE DEFINISCE I NOMI PRENDENDONE IL TITOLO DA DETAILS
            movieDiv.innerHTML = `
              <img src="${image}" alt="${details.title}" />
              <h3>${details.title}</h3>
            `;
            
            //APPENDE IL RISULTATO DI TUTTO STO MACELLO A movieDiv
            container.appendChild(movieDiv);
          });
      })
    }).catch(err => console.error('Errore nel caricamento:', err));
}

window.onload = loadMoviePage();