export function createCatMarkUp(url, name, description, temperament) {
  return `<img src="${url}" alt="${name}" width="400" height="350" />
    <div class="desc-wrap">
      <h2>${name}</h2>
      <p>${description}</p>
      <p><span class="temperament-title">Temperament:</span> ${temperament}</p>
    </div>`;
}
