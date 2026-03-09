/* ─────────────────────────────────────────
   Bếp Mẹ Butt – script.js
───────────────────────────────────────── */

const PHONE = 'tel:+840977819988';

// ── 1. Nav scroll shadow ──────────────────
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── 2. Scroll-reveal for sections ────────
const revealEls = document.querySelectorAll(
  '.product-card, .review-card, .g-img, .story-imgs, .story-text-side, .contact-row'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger children
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, (i % 6) * 80);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach(el => observer.observe(el));

// ── 3. "Liên Hệ" nav link → phone call ───
// The nav CTA already links to #lien-he section,
// but we add a direct phone call to the "Gọi Ngay" button
// and the floating action button via href="tel:…" in HTML.
// Here we also handle the nav "Liên Hệ" link so clicking
// it on mobile scrolls to the section AND offers a call prompt.
const navCta = document.querySelector('.nav-cta');
if (navCta) {
  navCta.addEventListener('click', (e) => {
    // On mobile, trigger the call instead of just scrolling
    if (window.innerWidth <= 768) {
      e.preventDefault();
      if (confirm('Gọi cho Bếp Mẹ Butt ngay?\n📞 0977 819 988')) {
        window.location.href = PHONE;
      }
    }
    // On desktop: scroll to #lien-he (default href behaviour)
  });
}

// ── 4. Call button click tracking ─────────
document.querySelectorAll('[href^="tel:"]').forEach(link => {
  link.addEventListener('click', () => {
    console.log('[Bếp Mẹ Butt] Cuộc gọi được khởi tạo:', link.href);
  });
});

// ── 5. Smooth active nav highlight ───────
const sections = document.querySelectorAll('section[id], div[id="trang-chu"]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.opacity = link.getAttribute('href') === `#${entry.target.id}` ? '1' : '.7';
          link.style.fontWeight = link.getAttribute('href') === `#${entry.target.id}` ? '600' : '500';
        });
      }
    });
  },
  { threshold: 0.4 }
);
sections.forEach(s => sectionObserver.observe(s));

// ── 6. Floating call button tooltip ──────
const fab = document.getElementById('fab-call');
if (fab) {
  fab.setAttribute('title', 'Gọi ngay: 0977 819 988');
}