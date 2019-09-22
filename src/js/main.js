// Vars
const input = document.getElementsByTagName('input')[0];
const form = document.getElementsByTagName('form')[0];
const apiKey = 'YOUR_API_KEY';
const apiUrl = `https://pixabay.com/api/?key=${apiKey}&pretty=true`;
const imageSection = document.querySelector('#image-results');
const resultsSearch = document.querySelector('#results');
const loading = document.getElementById('loading');

// Events
form.addEventListener('submit', search);

// Functions
function search(e) {
  e.preventDefault();
  const imageName = input.value;
  return fetchImage(imageName)
    .then(displayImages)
    .catch(err => console.error(err));
}
function fetchImage(searchTerm) {
  loading.style.display = '';
  imageSection.innerHTML = '';
  resultsSearch.innerHTML = '';

  return fetch(`${apiUrl}&q=${searchTerm}`)
    .then(res => res.json())
    .then(data => {
      resultsSearch.innerHTML = `
        <h2 class="is-size-3">Resultados ${data.total}</h2>
      `;
      return data.hits;
    })
    .catch(err => console.error(err));
}
function displayImages(images) {
  let output = '';
  images.forEach(image => {
    createElements(image);
  });
  loading.style.display = 'none';
}
function createElements(image) {
  output = `
    <figure>
      <div class="overlay">
        <ul class="level-right">
          <li class="level-item">
            <span class="tag is-success"><i class="entypo-eye"></i>${image.views}</span>
          </li>
          <li class="level-item">
            <span class="tag is-info"><i class="entypo-thumbs-up"></i>${image.likes}</span>
          </li>
          <li class="level-item">
            <span class="tag is-danger"><i class="entypo-heart"></i>${image.favorites}</span>
          </li>
        </ul>
        <p class="has-text-white has-text-right">Picture by ${image.user}</p>
      </div>
      <img src=${image.webformatURL} alt=${image.tags} loading="lazy" class="fadeIn" >
    </figure>
    `;
  return (imageSection.innerHTML += output);
}
