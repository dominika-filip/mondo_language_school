document.addEventListener('DOMContentLoaded', ()=> {
  // set year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // nav scroll
  document.querySelectorAll('[data-goto]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const id = el.dataset.goto;
      const target = document.getElementById(id);
      if (!target) return;
      target.scrollIntoView({behavior:'smooth', block:'start'});
      history.replaceState(null,'',`#${id}`);
    });
  });

  // active tab highlighting
  const tabs = document.querySelectorAll('.tab');
  function setActive(id){
    tabs.forEach(t => {
      const tgt = t.dataset.goto || (t.getAttribute('href')||'').replace('#','');
      t.classList.toggle('active', tgt === id);
    });
  }

  const sections = document.querySelectorAll('main .section');
  const io = new IntersectionObserver(entries => {
    entries.forEach(ent => {
      if (ent.isIntersecting) setActive(ent.target.id);
    });
  }, {threshold: 0.45});
  sections.forEach(s => io.observe(s));

  // reveal animations
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('reveal'); });
  }, {threshold: .12});
  document.querySelectorAll('.card,.price-card,.material,.quotes blockquote,.hero-grid').forEach(el => revealObserver.observe(el));

  // language switch (very small)
  const dict = {
    pl: { hero_title: "Twoja przygoda z językiem zaczyna się tutaj", hero_lead: "Zapisz się na darmową lekcję próbną", tab_offer: "Oferta", tab_materials: "Materiały", tab_testimonials: "Opinie", tab_contact: "Kontakt" },
    en: { hero_title: "Your language adventure starts here", hero_lead: "Sign up for a free trial lesson", tab_offer: "Courses", tab_materials: "Materials", tab_testimonials: "Reviews", tab_contact: "Contact" }
  };
  function applyLang(lang){
    const map = dict[lang] || dict.pl;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key && map[key]) el.innerHTML = map[key];
    });
  }
  document.querySelectorAll('.lang').forEach(btn => btn.addEventListener('click', ()=> applyLang(btn.dataset.lang)));
  applyLang('pl');
});
