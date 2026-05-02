async function loadGallery() {
  const response = await fetch('./gallery.json', { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Failed to load gallery manifest: ${response.status}`);
  }

  return response.json();
}

function renderGallery(entries) {
  const root = document.querySelector('#gallery');
  if (!root) {
    return;
  }

  root.innerHTML = entries.map((entry) => `
    <li class="card">
      <img src="${entry.assetPath}" alt="${entry.title}" loading="lazy" />
      <h2>${entry.title}</h2>
      <p>${entry.createdAt}</p>
    </li>
  `).join('');
}

loadGallery()
  .then((manifest) => renderGallery(manifest.entries ?? []))
  .catch((error) => {
    const root = document.querySelector('#gallery');
    if (root) {
      root.innerHTML = `<li class="card"><h2>Fixture Error</h2><p>${error.message}</p></li>`;
    }
  });
