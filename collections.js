import { db } from './global.js';
import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const grid = document.getElementById('collections-grid');
onSnapshot(collection(db, "collections"), (snapshot) => {
  grid.innerHTML = '';
  if (snapshot.empty) return grid.innerHTML = '<p style="text-align: center; width: 100%; color: var(--muted);">No collections found.</p>';
  snapshot.forEach(doc => {
    const col = doc.data();
    const card = document.createElement('a');
    card.href = `collection.html?name=${encodeURIComponent(col.name)}`; 
    card.className = 'collection-card';
    card.innerHTML = `
      <div class="collection-image" style="background-image: url('${col.banner_image}')"></div>
      <div class="collection-info"><h3>${col.name}</h3><p>${col.description}</p></div>
    `;
    grid.appendChild(card);
  });
});
