import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// ==========================================
// FIREBASE EXPORTS
// ==========================================
const firebaseConfig = {
  apiKey: "AIzaSyAKYHT7H2fiixbgrvadNEj10yz5HlIEI1U",
  authDomain: "tharsos-af07d.firebaseapp.com",
  projectId: "tharsos-af07d",
  storageBucket: "tharsos-af07d.firebasestorage.app",
  messagingSenderId: "229266745261",
  appId: "1:229266745261:web:57b90fc331b098f1bda324"
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// ==========================================
// HTML COMPONENTS
// ==========================================
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

const headerHTML = `
  <header class="header">
    <div class="header-inner">
      <button class="hamburger" id="hamburger" aria-label="Open navigation"><span></span><span></span><span></span></button>
      
      <a href="index.html" class="wordmark" aria-label="Tharsos Home">
        <img src="logo.svg" alt="THARSOS" style="height: 55px; width: auto; object-fit: contain;">
      </a>
      
      <nav class="topnav">
        <a href="index.html" class="${currentPage === 'index.html' ? 'active-nav' : ''}">SHOP</a>
        <a href="collections.html" class="${currentPage === 'collections.html' || currentPage === 'collection.html' ? 'active-nav' : ''}">COLLECTIONS</a>
        <a href="mission.html" class="${currentPage === 'mission.html' ? 'active-nav' : ''}">MISSION</a>
        <a href="clearance.html" id="nav-clearance" class="clearance" style="display:none;">CLEARANCE</a>
      </nav>
      
      <div class="header-right">
        <!-- Sleek SVG Cart Icon -->
        <a href="cart.html" class="cart-icon-link" aria-label="View Cart">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span class="cart-count" id="cartCount">0</span>
        </a>
      </div>
    </div>
  </header>
  
  <div class="overlay" id="overlay"></div>
  <aside class="sidebar" id="sidebar">
    <div class="sidebar-head">
      <a href="index.html" class="wordmark">
        <img src="logo.svg" alt="THARSOS" style="height: 45px; width: auto; object-fit: contain;">
      </a>
      <button class="close" id="closeSidebar">&times;</button>
    </div>
    <nav class="sidebar-nav">
      <a href="index.html">SHOP</a>
      <a href="collections.html">COLLECTIONS</a>
      <a href="mission.html">MISSION</a>
      <a href="clearance.html" id="side-clearance" class="clearance" style="display:none;">CLEARANCE</a>
      <a href="contact.html">CONTACT</a>
    </nav>
  </aside>
`;

const footerHTML = `
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <a href="index.html" class="wordmark" style="display: block; margin-bottom: 16px;">
          <img src="logo.svg" alt="THARSOS" style="height: 50px; width: auto; object-fit: contain;">
        </a>
        <p class="footer-tag">Holy courage in wearable form.</p>
      </div>
      <div><h4>SHOP</h4><a href="index.html">All Products</a><a href="collections.html">Collections</a></div>
      <div><h4>HOUSE</h4><a href="mission.html">Mission</a><a href="#" class="wip-trigger">Craftsmanship</a></div>
      <div>
        <h4>CONNECT</h4>
        <a href="contact.html">Contact</a>
        <div style="display: flex; gap: 16px; margin-top: 12px;">
          <a href="#" class="wip-trigger" aria-label="Instagram"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
          <a href="#" class="wip-trigger" aria-label="X (Twitter)"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
          <a href="#" class="wip-trigger" aria-label="Pinterest"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12a4 4 0 1 0 8 0 4 4 0 1 0-8 0"></path><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20"></path><path d="M12 12v10"></path></svg></a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 Tharsos. All rights reserved.</p>
      <div class="footer-legal">
        <a href="legal.html#privacy">Privacy</a>
        <a href="legal.html#terms">Terms</a>
        <a href="legal.html#impressum">Impressum</a>
      </div>
    </div>
  </footer>
`;

const globalModalsHTML = `
  <div class="cookie-banner" id="cookieBanner">
    <p>We use cookies to enhance your experience. By clicking "Accept", you agree to our use of cookies. <a href="legal.html#privacy">Read our Privacy Policy</a>.</p>
    <button id="acceptCookies" class="btn btn-solid">Accept</button>
  </div>

  <div class="wip-banner" id="wipBanner">
    <div class="wip-content">
      <h2>Work in Progress</h2>
      <p>This section is under construction.</p>
      <button class="btn btn-ghost" id="closeWip">Return</button>
    </div>
  </div>
`;

// ==========================================
// INJECTION & LOGIC
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('global-header').innerHTML = headerHTML;
  document.getElementById('global-footer').innerHTML = footerHTML;
  document.body.insertAdjacentHTML('beforeend', globalModalsHTML);

  const updateCartCount = () => { 
    const el = document.getElementById('cartCount'); 
    if(el) el.innerText = (JSON.parse(localStorage.getItem('tharsos_cart')) || []).length; 
  };
  updateCartCount();

  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const closeBtn = document.getElementById('closeSidebar');
  
  function openSidebar() { sidebar.classList.add('open'); overlay.classList.add('open'); document.body.classList.add('no-scroll'); }
  function closeSidebar() { sidebar.classList.remove('open'); overlay.classList.remove('open'); document.body.classList.remove('no-scroll'); }
  
  if (hamburger) hamburger.addEventListener('click', () => sidebar.classList.contains('open') ? closeSidebar() : openSidebar());
  if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
  if (overlay) overlay.addEventListener('click', closeSidebar);

  const wipTriggers = document.querySelectorAll('.wip-trigger');
  const wipBanner = document.getElementById('wipBanner');
  const closeWipBtn = document.getElementById('closeWip');
  
  wipTriggers.forEach(trigger => { 
    trigger.addEventListener('click', (e) => { 
      e.preventDefault(); 
      if(wipBanner) { wipBanner.classList.add('open'); document.body.classList.add('no-scroll'); closeSidebar(); } 
    }); 
  });
  if (closeWipBtn) closeWipBtn.addEventListener('click', () => { wipBanner.classList.remove('open'); document.body.classList.remove('no-scroll'); });

  const cookieBanner = document.getElementById('cookieBanner');
  const acceptCookiesBtn = document.getElementById('acceptCookies');
  if (!localStorage.getItem('tharsos_cookie_consent') && cookieBanner) {
    setTimeout(() => cookieBanner.classList.add('show'), 1000);
  }
  if (acceptCookiesBtn) {
    acceptCookiesBtn.addEventListener('click', () => {
      localStorage.setItem('tharsos_cookie_consent', 'true');
      cookieBanner.classList.remove('show');
    });
  }

  onSnapshot(doc(db, "config", "site"), (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      const clearLinks = [document.getElementById('nav-clearance'), document.getElementById('side-clearance')];
      clearLinks.forEach(link => { if(link) link.style.display = data.showClearance ? 'block' : 'none'; });
    }
  });
});
