import { db } from './global.js';
import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const urlParams = new URLSearchParams(window.location.search);
const collectionName = urlParams.get('name');

if (!collectionName) {
  document.getElementById('collection-title').innerText = "Collection Not Found";
} else {
  document.getElementById('collection-title').innerText = collectionName;
  
  onSnapshot(collection(db, "collections"), (snapshot) => {
    snapshot.forEach(doc => {
      const c = doc.data();
      if (c.name === collectionName) {
        document.getElementById('collection-desc').innerText = c.description;
      }
    });
  });

  onSnapshot(collection(db, "products"), (snapshot) => {
    const grid = document.getElementById('collection-products-grid');
    grid.innerHTML = '';
    let count = 0;

    snapshot.forEach(docSnap => {
      const product = docSnap.data();
      const docId = docSnap.id;

      if (product.collection === collectionName) {
        count++;
        const card = document.createElement('article');
        card.className = 'product';
        card.innerHTML = `
          <a href="product.html?id=${docId}">
            <div class="img-ph img-ph-product"><img src="${product.images[0]}" style="width: 100%; height: 100%; object-fit: cover;"></div>
          </a>
          <h3>${product.name}</h3>
          <p class="price">$${product.sale_price || product.price}</p>
          <a href="product.html?id=${docId}" class="btn btn-solid btn-full" style="text-align: center;">View Item</a>
        `;
        grid.appendChild(card);
      }
    });
    if (count === 0) grid.innerHTML = '<p style="text-align: center; width: 100%; color: var(--muted);">No products in this collection yet.</p>';
  });
}
