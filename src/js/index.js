import { fetchBreeds } from './cap-api';
import { refs } from './refs';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { slimSelectOptions } from './select-instance';

let selectedBreadId = '';

fetchBreeds()
  .then(breedsList => {
    hideElement(refs.loader);
    const breedsIdArray = breedsList.map(breed => ({
      text: breed.name,
      value: breed.id,
    }));

    const slimSelect = new SlimSelect(slimSelectOptions);

    slimSelect.setData(breedsIdArray);
  })
  .catch(error => {
    console.log(error);
    hideElement(refs.loader);
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  });

Notiflix.Notify.init({
  width: '280px',
  position: 'left-top',
  distance: '10px',
  opacity: 1,
});

function showElement(element) {
  element.classList.remove('is-hidden');
}

function hideElement(element) {
  element.classList.add('is-hidden');
}

export { showElement, hideElement };
