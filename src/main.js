import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import searchImagesByQuery from './js/pixabay-api.js';
import { showError, createGallary, cleanGallery } from './js/render-functions.js';

const form = document.querySelector('.gallery-form');
const input = document.querySelector('.input-gallery');
const loader = document.querySelector('.loading');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    cleanGallery(); //  очищуєм галерею
    loader.classList.remove('hidden') // прибираємо клас прихованого спану

    const query = input.value.trim();
    if (query === '') {
        showError('Please enter a search query.');
        loader.classList.add("hidden")
        return;
    }

    searchImagesByQuery(query)
        .then((data) => {
            if (data.total === 0) {
                showError('Sorry, there are no images matching your search query. Please try again!')
                loader.classList.add("hidden")
                input.value = '';
                return;
            }
            // else {
            //     createGallary(data)
            // }
            loader.classList.add("hidden")
            console.log(data);
            createGallary(data);
            input.value = '';
        })
        .catch((error) => {
            showError(error);
            input.value = '';
        });
    
});