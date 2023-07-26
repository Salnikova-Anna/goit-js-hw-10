function createBreedsListMarkUp(breeds) {
  return breeds
    .map(({ id, name }) => {
      return `<option value="${id}">${name}</option>`;
    })
    .join('');
}

function createCatMarkUp(url, name, description, temperament) {
  const catMarkUp = `<img src="${url}" alt="${name}" width=400px />
    <div>
      <h2>${name}</h2>
      <p>${description}</p>
      <p><span class="temperament-title">Temperament:</span> ${temperament}</p>
    </div>`;
  return catMarkUp;
}

export { createBreedsListMarkUp, createCatMarkUp };
