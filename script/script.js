import { TMDB_API_KEY as KEY} from '../keys/key.js';

const URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const btn1 = document.getElementById("previous");
const btn2 = document.getElementById("next");

let page = 1;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + KEY
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

//FUNZIONE ASINCRONA PER CARICARE LE PAGINE (INIZIALMENTE PARTE DA 1)
async function loadMoviePage(page = 1){
  if(!KEY) throw new Error('missing key');
  try{
  // MANDA LA RICHIETA AL SERVER MOVIE POPULAR CON IL VALORE DELLA PAGINA VARIABILE
    const responde = await fetch(URL + `/movie/popular?page=${page}`, options)
    .then(res => res.json())
    //CONVERTE LA RESPONSE IN UN JSON PER OGNI DATA CHE RIENTRA IN .MOVIES STAMPA 1 ELEMENTO
    .then(data => {
      const container = document.querySelector('.movies');
      container.innerHTML = '';
        //CICLA I RISULTATI LIMITANDO A 10 STAMPE
      data.results.slice(0,18).forEach(async movie => {
        fetch(`https://api.themoviedb.org/3/movie/${movie.id}`, options)
        .then(response => response.json())
        .then(details =>{
          //CREA I DIV PER DARGLI LO SPAZIO NECESSARIO
          const movieDiv = document.createElement('div');
          movieDiv.classList.add('movie');
          //RECUPERA L'IMMAGINE DEL FILM E IN ALTERNATIVA STAMPA L'ALT
          const image = details.poster_path
          ?  IMAGE_URL + details.poster_path
          : 'https://via.placeholder.com/500x750?text=No+Image';

          //NE DEFINISCE I NOMI PRENDENDONE IL TITOLO DA DETAILS
          const img = document.createElement('img');
          const h3 = document.createElement('h3');

          img.src = image;
          h3.textContent = details.title;

          movieDiv.appendChild(img);
          movieDiv.appendChild(h3);
          //APPENDE IL RISULTATO DI TUTTO STO MACELLO A movieDiv
          container.appendChild(movieDiv);
          });
        })
      })
  }catch(err){
    console.error('Errore nel caricamento:', err)
  };
}


window.onload = loadMoviePage();