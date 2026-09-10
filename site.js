// Load shared HTML components. Page content and page scripts stay independent.
async function loadComponent(name) {
  const slot = document.querySelector(`[data-include="${name}"]`);
  if (!slot) return;
  try {
    const response = await fetch(`/partials/${name}.html`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    slot.innerHTML = await response.text();
    if (name === 'header') initializeHeader();
    if (name === 'footer') initializeFooter();
  } catch (error) {
    console.error(`Subrosa: ${name} could not be loaded.`, error);
    // Keep the fallback links already present in the page if loading fails.
  }
}

function initializeHeader() {
  // Nav scroll effect
  const nav = document.querySelector('nav');
  function updateNavigation() {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', updateNavigation, { passive: true });
  updateNavigation();
}

function initializeFooter() {
  // --- Legal modals (content rendered via JS, not in HTML source) ---
  const legalContent = {
    impressum: () => `<h3>Impressum</h3>
      <p>${['Leon',' Bubova'].join('')}<br>${['Richard-Wagner-','Str. 51'].join('')}<br>${['50674',' Köln'].join('')}</p>
      <p>Kontakt: über das <a href="/#join">Formular auf der Startseite</a></p>`,
    datenschutz: () => `<h3>Datenschutz</h3>
      <p>diese seite setzt keine cookies und nutzt kein tracking. es werden keine analyse-tools oder werbedienste eingebunden.</p>
      <p>die Subrosa-app verarbeitet deine sprache lokal auf deinem gerät. sprachaufnahmen werden nicht an server übertragen.</p>
      <p>wenn du deine email-adresse über das formular einträgst, wird diese ausschließlich gespeichert, um dich zu informieren, wenn Subrosa verfügbar ist. deine email wird nicht an dritte weitergegeben. du kannst jederzeit die löschung deiner daten verlangen — schreib uns einfach über das formular.</p>
      <p>die seite wird über GitHub Pages gehostet. dabei können serverseitig technisch notwendige zugriffsdaten (z.b. IP-adresse) verarbeitet werden. details dazu findest du in der <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener">GitHub Privacy Policy</a>.</p>`
  };

  const overlay = document.getElementById('legalOverlay');
  const legalEl = document.getElementById('legalContent');
  const legalClose = document.getElementById('legalClose');
  let legalTrigger;
  function closeLegal() {
    overlay.classList.remove('visible');
    if (legalTrigger) legalTrigger.focus();
  }

  document.querySelectorAll('[data-legal]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const key = link.dataset.legal;
      if (legalContent[key]) {
        legalEl.innerHTML = legalContent[key]();
        overlay.classList.add('visible');
        legalTrigger = link;
        legalClose.focus();
      }
    });
  });

  legalClose.addEventListener('click', closeLegal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeLegal(); });
  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('visible')) return;
    if (e.key === 'Escape') closeLegal();
    if (e.key === 'Tab') {
      const focusable = [...overlay.querySelectorAll('button, a[href]')];
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
  });


  // --- LinkedIn (obfuscated) ---
  const liLink = document.querySelector('.li-link');
  if (liLink) liLink.addEventListener('click', () => {
    const u = ['https://www.', 'linked', 'in.com/in/'].join('');
    window.open(u + liLink.dataset.li + '/', '_blank', 'noopener');
  });

  document.querySelectorAll('[data-current-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
}

loadComponent('header');
loadComponent('footer');
