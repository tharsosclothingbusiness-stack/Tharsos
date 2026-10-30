import './global.js'; // Loads header/footer/sidebar

const cartContainer = document.getElementById('cart-items-container');
const summaryDiv = document.getElementById('cart-summary');
const totalPriceEl = document.getElementById('cart-total-price');
const checkoutBtn = document.getElementById('checkout-btn');
const cartCountEl = document.getElementById('cartCount');
const termsCheck = document.getElementById('terms-check');

function renderCart() {
  let cart = JSON.parse(localStorage.getItem('tharsos_cart')) || [];
  if (cartCountEl) cartCountEl.innerText = cart.length;

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p style="text-align: center; padding: 40px 0;">Your cart is empty. <a href="index.html" style="text-decoration: underline;">Continue shopping</a>.</p>';
    summaryDiv.style.display = 'none';
    return;
  }

  cartContainer.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';
    itemEl.innerHTML = `
      <img src="${item.image}" class="cart-item-img">
      <div class="cart-item-info"><h3>${item.name}</h3><p>Size: ${item.size}</p><p>$${item.price}</p></div>
      <button class="cart-remove" data-index="${index}">Remove</button>
    `;
    cartContainer.appendChild(itemEl);
  });

  totalPriceEl.innerText = `$${total.toFixed(2)}`;
  summaryDiv.style.display = 'block';

  if (termsCheck) checkoutBtn.disabled = !termsCheck.checked;

  document.querySelectorAll('.cart-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem('tharsos_cart', JSON.stringify(cart));
      renderCart();
    });
  });
}

if (termsCheck) {
  termsCheck.addEventListener('change', (e) => {
    if (checkoutBtn) checkoutBtn.disabled = !e.target.checked;
  });
}

if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    if (termsCheck && termsCheck.checked) {
      alert("Terms accepted. Proceeding to secure checkout...");
    }
  });
}

renderCart();
