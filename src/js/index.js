import { fetchBreeds, fetchCatByBreed } from './cap-api';
import { createCatMarkUp } from './create-markup';
import { refs } from './refs';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let selectedBreadId = '';

const slimSelect = new SlimSelect({
  select: refs.breedSelect,

  events: {
    afterChange: newBreed => {
      selectedBreadId = newBreed[0].value;
    },
    afterOpen: () => {
      refs.catInfo.innerHTML = '';
      showElement(refs.loader);
    },
    afterClose: () => {
      fetchCatByBreed(selectedBreadId)
        .then(data => {
          const breedUniqId = data[0].id;
          return fetch(
            `https://api.thecatapi.com/v1/images/${breedUniqId}`
          ).then(response => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          });
        })
        .then(({ url, breeds }) => {
          const [{ name, description, temperament }] = breeds;

          const catMarkUp = createCatMarkUp(
            url,
            name,
            description,
            temperament
          );
          refs.catInfo.innerHTML = catMarkUp;

          hideElement(refs.loader);
          showElement(refs.catInfo);
        })
        .catch(error => {
          hideElement(refs.loader);
          Notiflix.Notify.failure(
            'Oops! Something went wrong! Try reloading the page!'
          );
          console.log(error);
        });
    },
  },
});

fetchBreeds()
  .then(breedsList => {
    hideElement(refs.loader);

    const breedsIdArray = breedsList.map(breed => ({
      text: breed.name,
      value: breed.id,
    }));

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
