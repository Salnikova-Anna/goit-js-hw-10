import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_QwKXV4zgAQWNWUZQbW3j3HQvhnKJhIKK9Ks0Y0ilfsUpSvEc4OtQr1KsWkyeEj8';

const BASE_URL = 'https://api.thecatapi.com/v1/';

function fetchBreeds() {
  return fetch(`${BASE_URL}breeds`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

function fetchCatByBreed(breedId) {
  return fetch(`${BASE_URL}images/search?breed_ids=${breedId}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json().then(data => {
        const breedUniqId = data[0].id;
        return fetch(`${BASE_URL}images/${breedUniqId}`).then(response => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        });
      });
    }
  );
}

export { fetchBreeds, fetchCatByBreed };
