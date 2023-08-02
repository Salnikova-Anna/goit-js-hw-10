const BASE_URL = 'https://api.thecatapi.com/v1/';
const API_KEY =
  'live_W0mIreAVNnVwj4e4fbWtgrMv6ObhWs4xVc6rlD5TgP4gyOp5lmdB0jcw8fWzMNPx';

function fetchBreeds() {
  return fetch(`${BASE_URL}breeds?api-key=${API_KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

function fetchCatByBreed(selectedBreadId) {
  return fetch(
    `${BASE_URL}images/search?api_key=${API_KEY}&breed_ids=${selectedBreadId}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

export { fetchBreeds, fetchCatByBreed };
