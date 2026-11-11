import { db } from './global.js';
import { collection, onSnapshot, doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

let allProducts = [];
let collectionsData = {};

// 1. Fetch Settings & Hero
onSnapshot(doc(db, "config", "site"), (docSnap) => {
  if (docSnap.exists()) {
    const data = docSnap.data();
    const heroBg = document.getElementById('hero-bg');
    const heroTitle = document.getElementById('hero-title-text');
    const heroBtn = document.getElementById('hero-btn-text');

    if (data.heroType === 'collection' && data.heroCollection) {
      const col = collectionsData[data.heroCollection];
      if (col && col.banner_image) heroBg.innerHTML = `<img src="${col.banner_image}" style="width: 100%; height: 100%; object-fit: cover;">`;
      if (data.heroTitle) heroTitle.innerHTML = data.heroTitle.replace(/\n/g, '<br>');
      if (data.heroBtn) heroBtn.innerText = data.heroBtn;
    } else if (data.carouselImages && data.carouselImages.length > 0) {
      heroBg.innerHTML = `<img src="${data.carouselImages[0]}" style="width: 100%; height: 100%; object-fit: cover;">`;
    }
  }
});

onSnapshot(collection(db, "collections"), (snapshot) => {
  snapshot.forEach(d => { collectionsData[d.data().name] = d.data(); });
});

// 2. Fetch Products
const bestsellersGrid = document.getElementById('bestsellers-grid');
const allProductsGrid = document.getElementById('all-products-grid');

onSnapshot(collection(db, "products"), (snapshot) => {
  allProducts = [];
  snapshot.forEach(docSnap => { allProducts.push({ id: docSnap.id, ...docSnap.data() }); });
  renderProducts(allProducts);
});

function renderProducts(products) {
  bestsellersGrid.innerHTML = '';
  allProductsGrid.innerHTML = '';

  if (products.length === 0) {
    allProductsGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--muted);">No products found.</p>';
    return;
  }

  products.forEach(product => {
    const docId = product.id;
    let priceHTML = `$${product.price}`;
    if (product.sale_price) priceHTML = `<span style="text-decoration: line-through; color: var(--muted); margin-right: 8px; font-size: 0.9em;">$${product.price}</span> <span style="color: var(--red); font-weight: 600;">$${product.sale_price}</span>`;
    let buttonText = product.status === 'preorder' ? 'Pre-Order' : 'View Item';
    let badgeHTML = product.status === 'preorder' ? `<span style="display: inline-block; background: var(--text); color: #fff; font-size: 0.65rem; padding: 2px 6px; margin-bottom: 8px; letter-spacing: 0.1em;">PRE-ORDER</span>` : '';

    const productCard = document.createElement('article');
    productCard.className = 'product';
    productCard.innerHTML = `
      <a href="product.html?id=${docId}" style="display: block; margin-bottom: 24px;">
        <div class="img-ph img-ph-product" style="position: relative; overflow: hidden; margin-bottom: 0;">
          <img src="${product.images[0]}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0; z-index: 2;">
        </div>
      </a>
      <div style="margin-bottom: 12px; min-height: 20px;">${badgeHTML}</div>
      <a href="product.html?id=${docId}"><h3>${product.name}</h3></a>
      <p class="desc">${product.description}</p>
      <p class="price">${priceHTML}</p>
      <a href="product.html?id=${docId}" class="btn btn-solid btn-full" style="text-align: center;">${buttonText}</a>
    `;
    if (product.isBestseller) bestsellersGrid.appendChild(productCard.cloneNode(true));
    allProductsGrid.appendChild(productCard);
  });
}

// 3. Search Logic
document.getElementById('searchInput').addEventListener('input', (e) => {
  const term = e.target.value.toLowerCase();
  const filtered = allProducts.filter(p => p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term));
  renderProducts(filtered);
  if(term) document.getElementById('bestsellers').style.display = 'none';
  else document.getElementById('bestsellers').style.display = 'block';
});
