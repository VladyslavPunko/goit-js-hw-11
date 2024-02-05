

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import closeIcon from './img/bi_x-octagon.png';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";



const form = document.querySelector('form');
const list = document.querySelector('.gallery');


form.addEventListener('submit', onSearchButton);


function onSearchButton(e){
    e.preventDefault();
    
    const inputSearch = form.elements.search.value;
    if (inputSearch === ""){
        iziToast.error({
        messageColor: '#FFF',
        color: '#EF4040',
        iconUrl: closeIcon,
        position: 'topRight',
        message: 'Please,enter what do you want to find!',
        });
        return
    }
    list.innerHTML = '';
  
  getPhotos(inputSearch)
  form.reset()
}

function getPhotos(inputSearch){

const searchParams= new URLSearchParams({
    key: "42209591-dcd9ad54ecaffcfe9e9b64d04",
    q: `${inputSearch}`,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
})
const url = `https://pixabay.com/api/?${searchParams}`;
return fetch(url)
.then(response =>{return response.json()})
.then(photos => {
    const arrayPhotos = photos.hits;
    if(arrayPhotos.length === 0){
        noImages();
    }
    renderPhoto(arrayPhotos);
    simpleLightbox()


})

}

function noImages() {
    iziToast.error({
        messageColor: '#FFF',
        color: '#EF4040',
        iconUrl: closeIcon,
        position: 'topRight',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        });
}

function simpleLightbox(){
    let gallery = new SimpleLightbox('.gallery a',{
    captionsData: 'alt',
    captionsPosition: 'bottom',
    captionDelay: 250,
});
    gallery.on('show.simpleLightbox');
    gallery.refresh();
}

function renderPhoto(photos){
    const markup = photos.map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads  })=>
    `<li class='gallery-item'>
    <a class='gallery-link' href='${largeImageURL}'>
      <img class='gallery-image' src='${webformatURL}' alt='${tags}'/>
    </a>
  <div class='container-app'>
  <p><span>Likes</span> ${likes}</p>
  <p><span>Views</span> ${views }</p>
  <p><span>Comments</span> ${comments}</p>
  <p><span>Downloads</span> ${downloads}</p>
  </div>
   </li>`).join('');
   list.innerHTML = markup;
    
}