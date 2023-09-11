// // JQuery
// $('.search-button').on('click', function () {
//   $.ajax({
//     url: 'http://www.omdbapi.com/?apikey=748bf854&s=' + $('.keyword-input').val(),
//     success: results => {
//       let cards = '';
//       results.Search.forEach(result => {
//         cards += showCards(result);
//       });
//       $('.movie-infos').html(cards);
//       console.log(cards);
  
//       // Ketika tombol detail di-klik
//       $('.modal-detail-button').on('click', function () {
//         // console.log($(this).data('imdbid'));
//         $.ajax({
//           url: 'http://www.omdbapi.com/?apikey=748bf854&i=' + $(this).data('imdbid'),
//           success: result => {
//             const movieDetails = showMovieDetails(result);
//             $('.detail-film').html(movieDetails);
//           },
//           error: errorResult => console.log(errorResult.responseText)
//         });
//       });
//     },
//     error: errorResult => console.log(errorResult.responseText)
//   });
// });

// // Fetch
// const searchButton = document.querySelector('.search-button');
// searchButton.addEventListener('click', function () {
//   const keywordInput = document.querySelector('.keyword-input');
//   fetch('http://www.omdbapi.com/?apikey=748bf854&s=' + keywordInput.value)
//     .then(response => response.json())
//     .then(response => {
//       let cards = '';
//       response.Search.forEach(result => {
//         cards += showCards(result);
//       });
//       const movieContainer = document.querySelector('.movie-infos');
//       movieContainer.innerHTML = cards;

//       // Ketika tombol detail di-klik
//       const detailButtons = document.querySelectorAll('.modal-detail-button');
//       detailButtons.forEach(detailButton => {
//         detailButton.addEventListener('click', function () {
//           // console.log(detailButton.dataset.imdbid);
//           fetch('http://www.omdbapi.com/?apikey=748bf854&i=' + detailButton.dataset.imdbid)
//             .then(response => response.json())
//             .then(result => {
//               const movieDetails = showMovieDetails(result);
//               const movieDetailContainer = document.querySelector('.detail-film');
//               movieDetailContainer.innerHTML = movieDetails;
//             })
//         });
//       });
//     })
// });

// Fecth Refactor
const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', async function () {
  const keywordInput = document.querySelector('.keyword-input');
  const movies = await getMovies(keywordInput.value);
  updateUI(movies);
});

document.addEventListener('click', function (element) {
  if (element.target.classList.contains('modal-detail-button')) {
    console.log('bisa');
  }
})

function getMovies(keyword) {
  return fetch('http://www.omdbapi.com/?apikey=748bf854&s=' + keyword)
    .then(response => response.json())
    .then(response => response.Search);
}

function updateUI(response) {
  let cards = '';
  response.forEach(result => {
    cards += showCards(result);
  });
  const movieContainer = document.querySelector('.movie-infos');
  movieContainer.innerHTML = cards;
}

// HTML Syntax Functions
function showCards(result) {
  return `<div class="col-md-4 my-3">
            <div class="card">
              <img src="${result.Poster}" class="card-img-top">
              <div class="card-body">
                <h5 class="card-title">${result.Title}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">${result.Year}</h6>
                <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#showMovieDetails" data-imdbid="${result.imdbID}">Show Details</a>
              </div>
            </div>
          </div>\n`;
}

function showMovieDetails(result) {
  return `<div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">${result.Title}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <table class="table">
              <tbody>
                <tr>
                  <th scope="row">Released</th>
                  <td>${result.Released}</td>
                </tr>
                <tr>
                  <th scope="row">Genre</th>
                  <td>${result.Genre}</td>
                </tr>
                <tr>
                  <th scope="row">Director</th>
                  <td>${result.Director}</td>
                </tr>
                <tr>
                  <th scope="row">Writer</th>
                  <td>${result.Writer}</td>
                </tr>
                <tr>
                  <th scope="row">Actors</th>
                  <td>${result.Actors}</td>
                </tr>
                <tr>
                  <th scope="row">Plot</th>
                  <td>${result.Plot}</td>
                </tr>
              </tbody>
            </table>
          </div>`;
}