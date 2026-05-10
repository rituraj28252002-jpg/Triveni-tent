const nav = document.getElementById('primary-navigation');
const toggle = document.querySelector('.menu-toggle');

function setExpanded(expanded){
  toggle?.setAttribute('aria-expanded', String(expanded));
}

toggle?.addEventListener('click', () => {
  const isOpen = nav?.classList.contains('open');
  nav?.classList.toggle('open');
  setExpanded(!isOpen);
});

// Close menu on link click (mobile)
nav?.querySelectorAll('a')?.forEach(a => {
  a.addEventListener('click', () => {
    nav.classList.remove('open');
    setExpanded(false);
  });
});

// Smooth scroll for internal anchors (same-page only)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (!id || id === '#') return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Products page: set a product in the Contact form
function setProductEnquiry(productName){
  const params = new URLSearchParams({ product: productName });
  window.location.href = 'page5.html?' + params.toString();
}

document.querySelectorAll('.enquire-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const product = btn.getAttribute('data-product') || 'Product Enquiry';
    setProductEnquiry(product);
  });
});

function handleSubmit(){
  const note = document.getElementById('form-note');
  const name = document.getElementById('name')?.value?.trim();
  const phone = document.getElementById('phone')?.value?.trim();
  const message = document.getElementById('message')?.value?.trim();

  const params = new URLSearchParams(window.location.search);
  const product = params.get('product');

  const to = 'trivenitenthousepvtltd@gmail.com';
  const subject = encodeURIComponent(`Enquiry${product ? ' - ' + product : ''}`);

  // Booking date is entered in the "message" textarea
  const bodyLines = [
    `Name: ${name || '-'}`,
    `Phone/WhatsApp: ${phone || '-'}`,
    `Enquiry For: ${product || '-'}`,
    `Booking Date: ${message || '-'}`,
  ];

  const body = encodeURIComponent(bodyLines.join('\n'));

  // Open user mail client with prefilled content
  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

  if(note){
    note.textContent = `Thanks${name ? ', ' + name : ''}! Opening your email client to send the enquiry.`;
  }

  return false;
}

// Footer year
const yearEl = document.getElementById('year');
if(yearEl) yearEl.textContent = String(new Date().getFullYear());

// Footer subscribe (client-side only)
function handleSubscribe(){
  const note = document.getElementById('subscribe-note');
  const input = document.getElementById('footer-email');
  const email = input?.value?.trim();

  if(!note || !input) return;

  if(!email){
    note.textContent = 'Please enter your email.';
    return;
  }

  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if(!ok){
    note.textContent = 'Please enter a valid email address.';
    return;
  }

  note.textContent = 'Subscribed! Thank you.';
  input.value = '';
}


