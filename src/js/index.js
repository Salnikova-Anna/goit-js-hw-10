import { fetchBreeds, fetchCatByBreed } from './cap-api';
import { createBreedsListMarkUp, createCatMarkUp } from './create-markup';
import { refs } from './refs';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

refs.catInfo.classList.add('is-hidden');
refs.error.classList.add('is-hidden');
refs.breedSelect.classList.add('is-hidden');

const slimSelect = new SlimSelect({
  select: refs.breedSelect,
  placeholder: true,
  events: {
    afterChange: newBreed => {
      let selectedBreadId = newBreed[0].value;

      fetchCatByBreed(selectedBreadId)
        .then(({ url, breeds }) => {
          refs.loader.classList.add('is-hidden');
          const [{ name, description, temperament }] = breeds;

          const catMarkUp = createCatMarkUp(
            url,
            name,
            description,
            temperament
          );
          refs.catInfo.innerHTML = catMarkUp;
          refs.catInfo.classList.remove('is-hidden');
        })
        .catch(error => {
          refs.loader.classList.add('is-hidden');
          refs.error.classList.remove('is-hidden');
          console.log(error);
        });
    },

    settings: {
      placeholderText: 'Select a breed',
    },
  },
});

fetchBreeds()
  .then(breeds => {
    // const breedsListMarkup = createBreedsListMarkUp(breeds);

    // console.log(breeds);
    const breedsIdArray = breeds.map(breed => ({
      text: breed.name,
      value: breed.id,
    }));
    slimSelect.setData(breedsIdArray);
    refs.breedSelect.classList.remove('is-hidden');
    // refs.loader.classList.add('is-hidden');
    // selectedBreadId = slimSelect.getSelected();
    // console.log(selectedBreadId);
    // console.log(breedsIdArray);
    // refs.breedSelect.innerHTML = breedsListMarkup;
    // console.log(refs.breedSelect);
  })
  .catch(error => {
    console.log(error);
    refs.loader.classList.add('is-hidden');
    refs.error.classList.remove('is-hidden');
  });

// refs.breedSelect.addEventListener('input', handleBreedSelectClick);

// function handleBreedSelectClick(event) {
//   // const breedId = event.target.value;
//   console.log(select);

//   fetchCatByBreed(selectedBreadId)
//     .then(({ url, breeds }) => {
//       const [{ name, description, temperament }] = breeds;

//       const catMarkUp = createCatMarkUp(url, name, description, temperament);
//       refs.catInfo.innerHTML = catMarkUp;
//     })
//     .catch(error => console.log(error));
// }

// fetchCatByBreed(selectedBreadId)
//   .then(({ url, breeds }) => {
//     const [{ name, description, temperament }] = breeds;

//     const catMarkUp = createCatMarkUp(url, name, description, temperament);
//     refs.catInfo.innerHTML = catMarkUp;
//   })
//   .catch(error => console.log(error));
