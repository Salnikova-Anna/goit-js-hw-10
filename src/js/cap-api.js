const BASE_URL = 'https://api.thecatapi.com/v1/';
const API_KEY =
  'live_QwKXV4zgAQWNWUZQbW3j3HQvhnKJhIKK9Ks0Y0ilfsUpSvEc4OtQr1KsWkyeEj8';

function fetchBreeds() {
  return fetch(`${BASE_URL}breeds?x-api-key=${API_KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

function fetchCatByBreed(selectedBreadId) {
  return fetch(
    `${BASE_URL}images/search?breed_ids=${selectedBreadId}&x-api-key=${API_KEY}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

export { fetchBreeds, fetchCatByBreed };
