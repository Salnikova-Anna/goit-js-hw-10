import { fetchBreeds, fetchCatByBreed } from './cap-api';
import { createBreedsListMarkUp, createCatMarkUp } from './create-markup';
import { refs } from './refs';

fetchBreeds()
  .then(breeds => {
    const breedsListMarkup = createBreedsListMarkUp(breeds);
    refs.breedSelest.innerHTML = breedsListMarkup;
  })
  .catch(error => {
    console.log(error);
  });

refs.breedSelest.addEventListener('input', handleBreedSelectClick);

function handleBreedSelectClick(event) {
  const breedId = event.target.value;

  fetchCatByBreed(breedId)
    .then(({ url, breeds }) => {
      const [{ name, description, temperament }] = breeds;

      const catMarkUp = createCatMarkUp(url, name, description, temperament);
      refs.catInfo.innerHTML = catMarkUp;
    })
    .catch(error => console.log(error));
}
