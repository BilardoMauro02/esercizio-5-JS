📽️ TMDB Catalogo
Un'applicazione web che consente di esplorare i film più popolari e filtrare per genere, 
utilizzando l'API di The Movie Database (TMDB). L'interfaccia è semplice e intuitiva con supporto alla paginazione e visualizzazione dinamica dei film.

🚀 Funzionalità
- Visualizzazione dei film popolari (con paginazione)
- Filtraggio dei film per genere tramite <select>
- Dettagli dei film con poster e titolo
- Fallback per immagini mancanti
- Interfaccia responsive

🧰 Tecnologie utilizzate
- HTML5 & CSS3
- JavaScript (ES6+)
- Fetch API
- TMDB REST API
- Moduli JS (import/export)

📁 Struttura del progetto
tmdb-catalogo/
├── index.html
├── css/
│   └── style.css
├── script/
│   ├── script.js
│   ├── tmdbService.js
│   └── render.js
├── keys/
│   └── key.js



🔑 Configurazione API
Per utilizzare l'app, è necessario ottenere una chiave API TMDB e inserirla nel file keys/key.js:
export const TMDB_API_KEY = 'YOUR_API_KEY_HERE';




