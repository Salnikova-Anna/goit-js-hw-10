import { fetchCatByBreed } from './cap-api';
import { createCatMarkUp } from './create-markup';
import { refs } from './refs';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { showElement, hideElement } from '.';

let selectedBreadId = '';

export const slimSelectOptions = {
  select: refs.breedSelect,

  events: {
    afterChange: newBreed => {
      selectedBreadId = newBreed[0].value;
    },
    afterOpen: () => {
      refs.catInfo.innerHTML = '';
    },

    afterClose: () => {
      fetchCatByBreed(selectedBreadId)
        .then(data => {
          const url = data[0].url;
          const { name, description, temperament } = data[0].breeds[0];

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
};
