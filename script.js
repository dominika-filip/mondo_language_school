// script.js - navigation, reveal, and robust language switcher

// ------- helpers -------
function safeQueryAll(sel){ return Array.from(document.querySelectorAll(sel || '')); }

// ------- year & basic nav / reveal logic -------
function initUI(){
  // set year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // nav smooth scroll
  safeQueryAll('[data-goto]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const id = el.dataset.goto;
      const target = document.getElementById(id);
      if (!target) return;
      target.scrollIntoView({behavior:'smooth', block:'start'});
      history.replaceState(null,'',`#${id}`);
    });
  });

  // active tab highlighting via IntersectionObserver
  const tabs = safeQueryAll('.tab');
  function setActive(id){
    tabs.forEach(t => {
      const tgt = t.dataset.goto || (t.getAttribute('href')||'').replace('#','');
      t.classList.toggle('active', tgt === id);
    });
  }

  const sections = safeQueryAll('main .section');
  if (sections.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(ent => {
        if (ent.isIntersecting) setActive(ent.target.id);
      });
    }, {threshold: 0.45});
    sections.forEach(s => io.observe(s));
  }

  // reveal animations
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('reveal'); });
  }, {threshold: .12});
  safeQueryAll('.card,.price-card,.material,.quotes blockquote,.hero-grid').forEach(el => revealObserver.observe(el));
}

// ------- translations dictionary (extend or edit texts here) -------
const dict = {
  pl: {
    page_title: "Szkoła językowa Mondo",
    brand_name: "Szkoła językowa Mondo",
    tagline: "Poznaj język, odkrywaj świat",
    nav_start: "Start",
    nav_offer: "Oferta",
    nav_materials: "Materiały",
    nav_testimonials: "Opinie",
    nav_contact: "Kontakt",
    hero_title: "Twoja przygoda z językiem zaczyna się tutaj",
    hero_lead: "Zapisz się na darmową lekcję próbną",
    cta_signup: "Zapisz się",
    cta_offer: "Zobacz ofertę",
    offer_heading: "Oferta",
    price_individual_h3: "Indywidualnie",
    price_individual_50: "110zł / 50 min",
    price_individual_90: "180zł / 90 min",
    price_pair_h3: "W parach",
    price_pair_50: "80zł / 50 min / os.",
    price_pair_90: "130zł / 90 min / os.",
    price_business_h3: "Oferta dla firm",
    price_business: "Cena do uzgodnienia",
    li_langs: "Języki: polski dla obcokrajowców, włoski, angielski",
    li_one_on_one: "Zajęcia 1 na 1 z lektorem",
    li_two_on_one: "Zajęcia 2 na 1 z lektorem",
    li_program_individual: "Indywidualny program nauczania",
    li_program_pair: "Program dostosowany do uczniów",
    li_program_business: "Program dla firm",
    li_flexible: "Elastyczne terminy",
    li_materials_included: "Wszystkie materiały w cenie kursu",
    li_virtual_tools: "Wirtualna przestrzeń, narzędzia",
    li_business_format: "Zajęcia 1 na 1 lub małe grupy",
    li_reports: "Raporty frekwencji",
    materials_heading: "Materiały",
    materials_paragraph: "Znajdziesz tu autorskie materiały stworzone z myślą o efektywnej i przyjemnej nauce języków. Ćwiczenia, karty pracy i mini-kursy zaprojektowane są tak, aby wspierać rozwój słownictwa, gramatyki i swobodnej komunikacji – zarówno dla osób uczących się samodzielnie, jak i dla nauczycieli szukających inspiracji na zajęcia. Regularnie pojawiają się tu nowe treści dostosowane do różnych poziomów zaawansowania.",
    materials_polish_h3: "Język polski",
    mat1_title: "Porozmawiajmy po polsku – gotowe karty konwersacyjne JPJO",
    mat1_cta: "Zobacz materiał",
    mat2_title: "JPJO C1: Polskie bary mleczne",
    mat2_cta: "Zobacz materiał",
    mat3_title: "Gra planszowa – CZAS PRZYSZŁY",
    mat3_cta: "Zobacz materiał",
    mat4_title: "TABOO O POLSCE",
    mat4_cta: "Zobacz materiał",
    materials_soon: "Materiały do nauki włoskiego i angielskiego — już wkrótce.",
    testimonials_heading: "Opinie kursantów",
    quote1: "Dominika jest zawsze świetnie przygotowana do zajęć i uczy w sposób bardzo zrozumiały. Zdecydowanie polecam!",
    quote1_author: "Zuzia",
    quote2: "Dominika to nauczycielka z powołania! Jej pasja do języka włoskiego jest zaraźliwa...",
    quote2_author: "Weronika",
    quote3: "Super miła i pomocna nauczycielka! Bardzo dobre przygotowanie do matury rozszerzonej z języka włoskiego. Polecam!!",
    quote3_author: "Ala",
    quote4: "Już od pierwszej lekcji języka włoskiego... Z całego serca polecam!",
    quote4_author: "Aleksandra",
    contact_heading: "Kontakt",
    label_name: "Imię",
    label_email: "E-mail",
    label_message: "Wiadomość",
    btn_send: "Wyślij",
    contact_details_h3: "Dane kontaktowe",
    school_name: "Szkoła językowa Mondo",
    contact_email: "E-mail: szkolamondo@gmail.com",
    school_name_small: "Szkoła językowa Mondo"
  },

  en: {
    page_title: "Mondo Language School",
    brand_name: "Mondo Language School",
    tagline: "Discover language, discover the world",
    nav_start: "Start",
    nav_offer: "Courses",
    nav_materials: "Materials",
    nav_testimonials: "Reviews",
    nav_contact: "Contact",
    hero_title: "Your language adventure starts here",
    hero_lead: "Sign up for a free trial lesson",
    cta_signup: "Sign up",
    cta_offer: "See courses",
    offer_heading: "Offer",
    price_individual_h3: "Individual lessons",
    price_individual_50: "110 PLN / 50 min",
    price_individual_90: "180 PLN / 90 min",
    price_pair_h3: "Pairs",
    price_pair_50: "80 PLN / 50 min / per",
    price_pair_90: "130 PLN / 90 min / per",
    price_business_h3: "Corporate offer",
    price_business: "Price upon request",
    li_langs: "Languages: Polish for foreigners, Italian, English",
    li_one_on_one: "One-on-one lessons with a tutor",
    li_two_on_one: "Two-on-one lessons with a tutor",
    li_program_individual: "Individual teaching program",
    li_program_pair: "Program adapted to students",
    li_program_business: "Corporate program",
    li_flexible: "Flexible schedule",
    li_materials_included: "All materials included",
    li_virtual_tools: "Virtual classroom and tools",
    li_business_format: "One-on-one or small groups",
    li_reports: "Attendance reports",
    materials_heading: "Materials",
    materials_paragraph: "Here you'll find original materials created for effective and enjoyable language learning. Exercises, worksheets and mini-courses are designed to support vocabulary, grammar and fluent communication — both for self-learners and teachers looking for inspiration. New materials for different levels appear regularly.",
    materials_polish_h3: "Polish language",
    mat1_title: "Let's speak Polish – conversation cards JPJO",
    mat1_cta: "View material",
    mat2_title: "JPJO C1: Polish milk bars",
    mat2_cta: "View material",
    mat3_title: "Board game – FUTURE TENSE",
    mat3_cta: "View material",
    mat4_title: "TABOO ABOUT POLAND",
    mat4_cta: "View material",
    materials_soon: "Materials for Italian and English will be available soon.",
    testimonials_heading: "Student reviews",
    quote1: "Dominika is always very well prepared for classes and teaches in a very understandable way. Highly recommended!",
    quote1_author: "Zuzia",
    quote2: "Dominika is a teacher by vocation! Her passion for Italian is contagious...",
    quote2_author: "Weronika",
    quote3: "Very nice and helpful teacher! Great preparation for extended matriculation in Italian. Recommend!!",
    quote3_author: "Ala",
    quote4: "From the first lesson of Italian... Highly recommended!",
    quote4_author: "Aleksandra",
    contact_heading: "Contact",
    label_name: "Name",
    label_email: "E-mail",
    label_message: "Message",
    btn_send: "Send",
    contact_details_h3: "Contact details",
    school_name: "Mondo Language School",
    contact_email: "E-mail: szkolamondo@gmail.com",
    school_name_small: "Mondo Language School"
  },

  it: {
    page_title: "Scuola di lingue Mondo",
    brand_name: "Scuola di lingue Mondo",
    tagline: "Scopri la lingua, scopri il mondo",
    nav_start: "Inizio",
    nav_offer: "Offerta",
    nav_materials: "Materiali",
    nav_testimonials: "Recensioni",
    nav_contact: "Contatto",
    hero_title: "La tua avventura linguistica inizia qui",
    hero_lead: "Iscriviti a una lezione di prova gratuita",
    cta_signup: "Iscriviti",
    cta_offer: "Vedi offerta",
    offer_heading: "Offerta",
    price_individual_h3: "Individuale",
    price_individual_50: "110 PLN / 50 min",
    price_individual_90: "180 PLN / 90 min",
    price_pair_h3: "In coppia",
    price_pair_50: "80 PLN / 50 min / per",
    price_pair_90: "130 PLN / 90 min / per",
    price_business_h3: "Offerta per aziende",
    price_business: "Prezzo su richiesta",
    li_langs: "Lingue: polacco per stranieri, italiano, inglese",
    li_one_on_one: "Lezioni individuali con insegnante",
    li_two_on_one: "Lezioni 2 a 1 con insegnante",
    li_program_individual: "Programma individuale",
    li_program_pair: "Programma adattato agli studenti",
    li_program_business: "Programma aziendale",
    li_flexible: "Orari flessibili",
    li_materials_included: "Tutti i materiali inclusi",
    li_virtual_tools: "Spazio virtuale e strumenti",
    li_business_format: "Individuale o piccoli gruppi",
    li_reports: "Report di partecipazione",
    materials_heading: "Materiali",
    materials_paragraph: "Qui trovi materiali originali creati per un apprendimento efficace e piacevole. Esercizi, schede e mini-corsi progettati per supportare vocabolario, grammatica e comunicazione fluente.",
    materials_polish_h3: "Lingua polacca",
    mat1_title: "Parliamo in polacco – schede di conversazione JPJO",
    mat1_cta: "Vedi materiale",
    mat2_title: "JPJO C1: I bar di latte polacchi",
    mat2_cta: "Vedi materiale",
    mat3_title: "Gioco da tavolo – TEMPO FUTURO",
    mat3_cta: "Vedi materiale",
    mat4_title: "TABOO SULLA POLONIA",
    mat4_cta: "Vedi materiale",
    materials_soon: "Materiali per italiano e inglese disponibili a breve.",
    testimonials_heading: "Recensioni",
    quote1: "Dominika è sempre molto preparata e insegna in modo comprensibile. Consiglio vivamente!",
    quote1_author: "Zuzia",
    quote2: "Dominika è una insegnante per vocazione! La sua passione per l'italiano è contagiosa...",
    quote2_author: "Weronika",
    quote3: "Insegnante molto gentile e disponibile! Ottima preparazione per l'esame. Consiglio!!",
    quote3_author: "Ala",
    quote4: "Dalla prima lezione di italiano... Consiglio di cuore!",
    quote4_author: "Aleksandra",
    contact_heading: "Contatto",
    label_name: "Nome",
    label_email: "E-mail",
    label_message: "Messaggio",
    btn_send: "Invia",
    contact_details_h3: "Dettagli di contatto",
    school_name: "Scuola di lingue Mondo",
    contact_email: "E-mail: szkolamondo@gmail.com",
    school_name_small: "Scuola di lingue Mondo"
  },

  ua: {
    page_title: "Мовна школа Mondo",
    brand_name: "Мовна школа Mondo",
    tagline: "Відкривай мову, відкривай світ",
    nav_start: "Початок",
    nav_offer: "Пропозиція",
    nav_materials: "Матеріали",
    nav_testimonials: "Відгуки",
    nav_contact: "Контакт",
    hero_title: "Твоя мовна пригода починається тут",
    hero_lead: "Запишись на безкоштовний пробний урок",
    cta_signup: "Записатися",
    cta_offer: "Переглянути пропозицію",
    offer_heading: "Пропозиція",
    price_individual_h3: "Індивідуально",
    price_individual_50: "110 PLN / 50 хв",
    price_individual_90: "180 PLN / 90 хв",
    price_pair_h3: "Парні заняття",
    price_pair_50: "80 PLN / 50 хв / особа",
    price_pair_90: "130 PLN / 90 хв / особа",
    price_business_h3: "Пропозиція для компаній",
    price_business: "Ціна за домовленістю",
    li_langs: "Мови: польська для іноземців, італійська, англійська",
    li_one_on_one: "Індивідуальні заняття з вчителем",
    li_two_on_one: "Заняття 2 на 1 з викладачем",
    li_program_individual: "Індивідуальна програма навчання",
    li_program_pair: "Програма адаптована для учнів",
    li_program_business: "Програма для компаній",
    li_flexible: "Гнучкий розклад",
    li_materials_included: "Всі матеріали в ціні курсу",
    li_virtual_tools: "Віртуальний простір, інструменти",
    li_business_format: "Індивідуально або малі групи",
    li_reports: "Звіти відвідуваності",
    materials_heading: "Матеріали",
    materials_paragraph: "Тут ви знайдете авторські матеріали, створені для ефективного та приємного вивчення мови. Вправи, робочі картки та міні-курси, розроблені для розвитку словникового запасу, граматики та вільного спілкування.",
    materials_polish_h3: "Польська мова",
    mat1_title: "Поговоримо польською – картки для конверсій JPJO",
    mat1_cta: "Переглянути матеріал",
    mat2_title: "JPJO C1: Польські молочні бари",
    mat2_cta: "Переглянути матеріал",
    mat3_title: "Настільна гра – МАЙБУТНІЙ ЧАС",
    mat3_cta: "Переглянути матеріал",
    mat4_title: "TABOO ПРО ПОЛЬЩУ",
    mat4_cta: "Переглянути матеріал",
    materials_soon: "Матеріали для італійської та англійської — скоро.",
    testimonials_heading: "Відгуки",
    quote1: "Домініка завжди дуже добре підготовлена до занять і викладає зрозуміло. Рекомендую!",
    quote1_author: "Зузя",
    quote2: "Домініка — вчитель від покликання! Її пристрасть до італійської захоплює...",
    quote2_author: "Вероніка",
    quote3: "Дуже приємна та допоміжна вчителька! Чудова підготовка до іспиту. Рекомендую!!",
    quote3_author: "Ала",
    quote4: "Від першого уроку італійської... Рекомендую від щирого серця!",
    quote4_author: "Александра",
    contact_heading: "Контакт",
    label_name: "Ім'я",
    label_email: "E-mail",
    label_message: "Повідомлення",
    btn_send: "Надіслати",
    contact_details_h3: "Контактні дані",
    school_name: "Мовна школа Mondo",
    contact_email: "E-mail: szkolamondo@gmail.com",
    school_name_small: "Мовна школа Mondo"
  }
};

// ------- applyLang & init -------
function applyLang(lang){
  const map = dict[lang] || dict.pl;
  // set html lang and title
  document.documentElement.lang = lang;
  if (map.page_title) document.title = map.page_title;

  // replace texts
  safeQueryAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (!key) return;
    const val = map[key];
    if (typeof val !== 'undefined') {
      el.innerHTML = val;
    } else if (dict.pl && dict.pl[key]) {
      // fallback to Polish if missing
      el.innerHTML = dict.pl[key];
    }
  });

  // active lang UI
  safeQueryAll('.lang').forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
  // accessibility
  safeQueryAll('.lang').forEach(btn => btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang)));

  localStorage.setItem('siteLang', lang);
}

// robust init (works even if script loaded early or late)
function initAll(){
  initUI();

  // determine initial language
  const saved = localStorage.getItem('siteLang');
  let initLang = saved;
  if (!initLang) {
    const nav = (navigator.languages && navigator.languages[0]) || navigator.language || 'pl';
    initLang = nav.split('-')[0];
    if (!dict[initLang]) initLang = 'pl';
  }
  applyLang(initLang);

  // event delegation for language buttons
  document.addEventListener('click', (e) => {
    const btn = e.target.closest && e.target.closest('.lang');
    if (!btn) return;
    const lang = btn.dataset.lang;
    if (!lang) return;
    if (!dict[lang]) { console.warn('Language not available:', lang); return; }
    applyLang(lang);
  });
}

// run init depending on readyState
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll);
} else {
  initAll();
}
