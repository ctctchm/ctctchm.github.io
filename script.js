// Détection mobile
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Fonction throttle pour optimiser les scroll handlers
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Fonction debounce pour optimiser les resize handlers
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  }
}

// Système i18n (internationalisation) - Traduction complète
const translations = {
  fr: {
    // Landing Page
    'landing.subtitle': 'Étudiant en Cybersécurité · Paris',
    'landing.description': 'Security builder. Je pense en modes d\'échec',
    'landing.scroll': 'Cliquez n\'importe où',
    
    // Navigation
    'nav.about': 'À propos',
    'nav.skills': 'Compétences',
    'nav.certifications': 'Certifications',
    'nav.projects': 'Projets',
    'nav.contributions': 'Contributions',
    'nav.education': 'Formation',
    'nav.contact': 'Contact',
    
    // Header
    'header.subtitle': 'Étudiant en Cybersécurité · Paris',
    'header.download': 'Télécharger CV',
    'header.contact': 'Me Contacter',
    
    // About Section
    'about.title': 'À PROPOS',
    'about.who.title': 'Qui',
    'about.who.text': '19 ans, étudiant à IPSSI (2025‑2028), Paris. Je construis des outils de sécurité qui servent vraiment à quelque chose. J’aime comprendre comment le code casse et comment les systèmes échouent.',
    'about.am.title': 'Suis',
    'about.am.text': 'Je viens d\’Annecy, maintenant je vis à Paris pour mes études. J\'apprends en faisant, en testant mes propres projets et en cherchant les failles. Je bouge beaucoup, pas par hasard, mais pour explorer, comprendre et créer.',
    'about.i.title': 'Je',
    'about.i.text': 'Pragmatisme avant tout. Construire, corriger, documenter. Mon code doit résoudre de vrais problèmes, pas flatter mon ego. Les bugs difficiles et les systèmes qui tombent… c’est là que j’apprends le plus.',
    
    // Skills Section
    'skills.title': 'COMPÉTENCES TECHNIQUES',
    'skills.languages': 'Langages',
    'skills.security': 'Outils de Sécurité',
    'skills.environment': 'Environnement',
    
    // Certifications Section
    'certifications.title': 'CERTIFICATIONS',
    'cert.anssi.title': 'SecNumacadémie',
    'cert.anssi.org': 'ANSSI — Agence nationale de la sécurité des systèmes d\'information',
    'cert.cnil.title': 'Commission Nationale de l\'Informatique et des Libertés',
    'cert.cnil.1': 'Le RGPD et ses notions clés',
    'cert.cnil.2': 'Principes de la protection des données',
    'cert.cnil.3': 'Responsabilités des acteurs',
    'cert.cnil.4': 'DPO et outils de la conformité',
    
    // Projects Section
    'projects.title': 'PROJETS',
    'projects.view': 'Voir sur GitHub',
    'projects.pwd.title': 'Password Analyzer',
    'projects.pwd.desc': 'Password strength checker basé sur entropie + pattern matching. Estime le crack time.',
'projects.pwd.feat1': '<strong>Scoring :</strong> entropy-based.',
'projects.pwd.feat2': '<strong>Patterns :</strong> sequences & substitutions.',
'projects.pwd.feat3': '<strong>Estimate :</strong> GPU crack time.',

'projects.vuln.title': 'Web Vulnerability Analyzer',
'projects.vuln.desc': 'Automated web app scanner avec crawling et payload injection pour détecter les vulnérabilités.',
'projects.vuln.feat1': '<strong>Automation :</strong> crawl + scan.',
'projects.vuln.feat2': '<strong>Coverage :</strong> SQLi, XSS, CSRF, path traversal.',
'projects.vuln.feat3': '<strong>Payloads :</strong> context-aware.',

'projects.stega.title': 'Steganography Toolkit',
'projects.stega.desc': 'Data hiding dans images via LSB et metadata injection.',
'projects.stega.feat1': '<strong>Methods :</strong> LSB, EXIF.',
'projects.stega.feat2': '<strong>Tools :</strong> embed & extract.',

'projects.narrative.title': 'Interactive Narrative Engine',
'projects.narrative.desc': 'Narrative engine basé sur FSM avec branching logic et persistent state.',
'projects.narrative.feat1': '<strong>Core :</strong> finite state machine.',
'projects.narrative.feat2': '<strong>Logic :</strong> branching paths.',
'projects.narrative.feat3': '<strong>State :</strong> persistence.',
    
    // Contributions Section
    'contributions.title': 'CONTRIBUTIONS',
    'contributions.activity': 'Activité GitHub',
    'contributions.loading': 'Chargement...',
    'contributions.less': 'Moins',
    'contributions.more': 'Plus',
    
    // Education Section
    'education.title': 'FORMATION',
    'education.clickhint': 'Cliquer pour développer',
    'education.lycee.title': 'Lycée Lachenal',
    'education.lycee.subtitle': 'Baccalauréat NSI · Sciences de l\'Ingénieur',
    'education.lycee.desc': 'Pensée systémique — comprendre l\'interaction, la cascade, l\'échec. Fondations d\'ingénierie — résoudre à l\'échelle structurelle. Électronique & systèmes numériques — théorie rencontre réalité physique.',
    'education.lycee.program': 'Programme',
    'education.lycee.subjects': 'Matières',
    'education.lycee.projects': 'Projets',
    'education.ipssi.title': 'IPSSI — Bachelor Cybersécurité',
    'education.ipssi.subtitle': 'Sécurité offensive · Architecture système',
    'education.ipssi.desc': 'Architecture système — comprendre la machine pour attaquer. Protocoles & sécurité réseau — comment internet échoue. Sécurité offensive — penser comme un attaquant.',
    'education.ipssi.modules': 'Modules',
    'education.ipssi.tools': 'Outils',
    'education.platforms': 'PLATEFORMES D\'ENTRAÎNEMENT',
    
    // Contact Section
    'contact.title': 'CONTACT',
    'contact.intro.title': 'Connectons-nous',
    'contact.intro.text': 'N\'hésitez pas à me contacter pour toute opportunité, collaboration ou question.',
    'contact.email.label': 'Email',
    'contact.email.value': 'Cliquer pour révéler',
    'contact.email.response': 'Réponse sous 24h',
    'contact.github.label': 'GitHub',
    'contact.rootme.label': 'Root-Me',
    
    // Footer
    'footer.made': 'Paris · Toujours en apprentissage',
    
    // Widget
    'widget.status': 'Statut:',
    'widget.status.online': 'En ligne',
    'widget.built': 'Construit avec:',
    'widget.security': 'Sécurité:',
    'widget.security.enabled': 'CSP Activé',
    'widget.updated': 'Mis à jour:',
    'widget.loadtime': 'Temps de chargement:',
    'widget.visitors': 'Visiteurs:',
    
    // Greeting
    'greeting.morning': 'Bonjour',
    'greeting.afternoon': 'Bon après-midi',
    'greeting.evening': 'Bonsoir',
    'greeting.night': 'Bonne nuit'
  },
  en: {
    // Landing Page
    'landing.subtitle': 'Cybersecurity Student · Paris',
    'landing.description': 'Building security tools that solve real problems. Fascinated by failure modes ; how systems break, how networks fail, how assumptions crumble.',
    'landing.scroll': 'Click anywhere',
    
    // Navigation
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.certifications': 'Certifications',
    'nav.projects': 'Projects',
    'nav.contributions': 'Contributions',
    'nav.education': 'Education',
    'nav.contact': 'Contact',
    
    // Header
    'header.subtitle': 'Cybersecurity Student · Paris',
    'header.download': 'Download CV',
    'header.contact': 'Get in Touch',
    
    // About Section
    'about.title': 'ABOUT',
    'about.who.title': 'Who',
    'about.who.text': '19 yo, IPSSI student (2025–2028), Paris. I build security tools that solve actual problems, not theoretical ones. Fascinated by failure modes — how code breaks, how networks fail, how assumptions crumble.',
    'about.am.title': 'Am',
    'about.am.text': 'Semi-nomadic by design. Currently Paris, but always moving. Music production isn\'t a hobby; it\'s how I think. Building synthesis patches, finding harmonic accidents between hardware and software.',
    'about.i.title': 'I',
    'about.i.text': 'Value pragmatism over everything. Build, learn through doing, document ruthlessly. My code solves real problems, not ego problems. The unglamorous work is what makes systems survive.',
    
    // Skills Section
    'skills.title': 'TECHNICAL SKILLS',
    'skills.languages': 'Languages',
    'skills.security': 'Security Tools',
    'skills.environment': 'Environment',
    
    // Certifications Section
    'certifications.title': 'CERTIFICATIONS',
    'cert.anssi.title': 'SecNumacadémie',
    'cert.anssi.org': 'ANSSI — French National Cybersecurity Agency',
    'cert.cnil.title': 'French Data Protection Authority',
    'cert.cnil.1': 'GDPR and its key concepts',
    'cert.cnil.2': 'Data protection principles',
    'cert.cnil.3': 'Stakeholders\' responsibilities',
    'cert.cnil.4': 'DPO and compliance tools',
    
    // Projects Section
    'projects.title': 'PROJECTS',
    'projects.view': 'View on GitHub',
    'projects.pwd.title': 'Password Analyzer',
    'projects.pwd.desc': 'Built because I got tired of guessing password strength. Entropy scoring that actually works, pattern recognition for keyboard walks, predictable substitutions. Estimates real-world crack time using GPU benchmarks.',
    'projects.pwd.feat1': 'Scoring: entropy-based strength with practical heuristics.',
    'projects.pwd.feat2': 'Patterns: detects keyboard walks and common substitution habits.',
    'projects.pwd.feat3': 'Estimation: crack-time approximation using GPU benchmark baselines.',
    'projects.vuln.title': 'Web Vuln Analyzer',
    'projects.vuln.desc': 'My first real security tool. Automates the boring part, testing. Finds SQLi, XSS, CSRF, path traversal, parameter pollution. The insight: generate context-aware payloads.',
    'projects.vuln.feat1': 'Automation: crawl + test loop to reduce manual recon.',
    'projects.vuln.feat2': 'Coverage: targets SQLi, XSS, CSRF, traversal, parameter pollution.',
    'projects.vuln.feat3': 'Payloads: context-aware generation rather than naive fuzzing.',
    'projects.stega.title': 'Steganography Toolkit',
    'projects.stega.desc': 'LSB steganography, EXIF manipulation, metadata injection. Hide data in images imperceptibly — the eye won\'t catch what statistics can\'t explain.',
    'projects.stega.feat1': 'Techniques: LSB steganography + EXIF/metadata manipulation.',
    'projects.stega.feat2': 'Workflow: hide + extract utilities designed for real scenarios.',
    'projects.narrative.title': 'Interactive Narrative Engine',
    'projects.narrative.desc': 'Passion project. Interactive fiction engine built on state machines. Branching dialogue with real consequences. Built to prove a thesis: games and serious tools are the same architecture.',
    'projects.narrative.feat1': 'Core: state-machine driven story logic.',
    'projects.narrative.feat2': 'Design: branching dialogue with meaningful consequences.',
    'projects.narrative.feat3': 'Architecture: tool-like structure applied to game systems.',
    
    // Contributions Section
    'contributions.title': 'CONTRIBUTIONS',
    'contributions.activity': 'GitHub Activity',
    'contributions.loading': 'Loading...',
    'contributions.less': 'Less',
    'contributions.more': 'More',
    
    // Education Section
    'education.title': 'EDUCATION',
    'education.clickhint': 'Click to expand',
    'education.lycee.title': 'Lycée Lachenal',
    'education.lycee.subtitle': 'Baccalauréat NSI · Engineering Sciences',
    'education.lycee.desc': 'Systems thinking — understanding interaction, cascade, failure. Engineering foundations — solving at structural scale. Electronics & digital systems — theory meets physical reality.',
    'education.lycee.program': 'Program',
    'education.lycee.subjects': 'Subjects',
    'education.lycee.projects': 'Projects',
    'education.ipssi.title': 'IPSSI — Bachelor Cybersecurity',
    'education.ipssi.subtitle': 'Offensive security · System architecture',
    'education.ipssi.desc': 'System architecture — understanding the machine to attack. Protocols & network security — how the internet fails. Offensive security — thinking like an attacker.',
    'education.ipssi.modules': 'Modules',
    'education.ipssi.tools': 'Tools',
    'education.platforms': 'PRACTICE PLATFORMS',
    
    // Contact Section
    'contact.title': 'CONTACT',
    'contact.intro.title': 'Let\'s Connect',
    'contact.intro.text': 'Feel free to reach out for any opportunity, collaboration, or question.',
    'contact.email.label': 'Email',
    'contact.email.value': 'Click to reveal',
    'contact.email.response': '24h response',
    'contact.github.label': 'GitHub',
    'contact.rootme.label': 'Root-Me',
    
    // Footer
    'footer.made': 'Paris · Always learning',
    
    // Widget
    'widget.status': 'Status:',
    'widget.status.online': 'Online',
    'widget.built': 'Built with:',
    'widget.security': 'Security:',
    'widget.security.enabled': 'CSP Enabled',
    'widget.updated': 'Updated:',
    'widget.loadtime': 'Load time:',
    'widget.visitors': 'Visitors:',
    
    // Greeting
    'greeting.morning': 'Good morning',
    'greeting.afternoon': 'Good afternoon',
    'greeting.evening': 'Good evening',
    'greeting.night': 'Good night'
  }
};

let currentLang = 'fr';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('preferred_language', lang);
  
  // Mettre à jour le flag
  const flagEl = document.getElementById('lang-flag');
  if (flagEl) {
    flagEl.textContent = lang === 'fr' ? '🇬🇧' : '🇫🇷';
  }
  
  // Mettre à jour tous les éléments traduits
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      const translatedText = translations[lang][key];
      
      // Si le texte contient des balises HTML ou si c'est un <li>, utiliser innerHTML
      if (translatedText.includes('<') || el.tagName === 'LI') {
        el.innerHTML = translatedText;
      } else {
        el.textContent = translatedText;
      }
    }
  });
  
  // Mettre à jour le greeting
  updateGreeting();
  
  // Redémarrer le typing effect avec la nouvelle langue
  if (document.getElementById('typing-text')) {
    charIndex = 0;
    isTyping = true;
    typeEffect();
  }
}

// Détecter la langue au chargement
function detectLanguage() {
  const saved = localStorage.getItem('preferred_language');
  if (saved) {
    return saved;
  }
  
  const browserLang = navigator.language || navigator.userLanguage;
  return browserLang.startsWith('fr') ? 'fr' : 'en';
}

// Initialiser la langue
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    currentLang = detectLanguage();
    setLanguage(currentLang);
  });
} else {
  currentLang = detectLanguage();
  setLanguage(currentLang);
}

// Toggle langue
const toggleLang = document.getElementById('toggle-lang');
if (toggleLang) {
  toggleLang.addEventListener('click', () => {
    const newLang = currentLang === 'fr' ? 'en' : 'fr';
    setLanguage(newLang);
    
    toggleLang.style.transform = 'scale(0.9)';
    setTimeout(() => {
      toggleLang.style.transform = 'scale(1.05)';
      setTimeout(() => {
        toggleLang.style.transform = '';
      }, 150);
    }, 100);
  });
}

// Typing effect pour landing page
let typingIndex = 0;
let charIndex = 0;
let isTyping = true;

function typeEffect() {
  const element = document.getElementById('typing-text');
  if (!element || hasScrolled) return;
  
  const currentText = translations[currentLang]['landing.subtitle'];
  
  if (isTyping) {
    if (charIndex < currentText.length) {
      element.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      setTimeout(typeEffect, 80);
    } else {
      isTyping = false;
      setTimeout(typeEffect, 2000); // Pause avant de recommencer
    }
  } else {
    if (charIndex > 0) {
      element.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(typeEffect, 40);
    } else {
      isTyping = true;
      setTimeout(typeEffect, 500);
    }
  }
}

// Démarrer l'effet typing au chargement
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 500);
  });
} else {
  setTimeout(typeEffect, 500);
}

// Konami Code Easter Egg (simplifié)
const konamiCode = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
let konamiIndex = 0;

function handleKonamiCode(e) {
  const key = e.key;
  
  if (key === konamiCode[konamiIndex]) {
    konamiIndex++;
    
    if (konamiIndex === konamiCode.length) {
      activateKonamiEasterEgg();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
}

function activateKonamiEasterEgg() {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.95); z-index: 99999;
    display: flex; align-items: center; justify-content: center;
    font-family: 'IBM Plex Mono', monospace; color: #0f0;
    text-align: center; font-size: 42px; cursor: pointer;
    animation: fadeIn 0.3s ease;
  `;
  overlay.innerHTML = '🔓 ACCESS GRANTED';
  
  overlay.onclick = () => {
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.3s';
    setTimeout(() => document.body.removeChild(overlay), 300);
  };
  
  document.body.appendChild(overlay);
}

document.addEventListener('keydown', handleKonamiCode);

// Citations aléatoires sur la cybersécurité
const securityQuotes = [
  '"The only truly secure system is one that is powered off." — Gene Spafford',
  '"Security is not a product, but a process." — Bruce Schneier',
  '"The weakest link in security is the human element." — Kevin Mitnick',
  '"Trust, but verify." — Ronald Reagan',
  '"Privacy is not an option, and it shouldn\'t be the price we accept." — Gary Kovacs',
  '"Knowledge is power, but the ability to secure it is paramount." — Anonymous',
  '"In security, there is no such thing as 100% secure." — Whitfield Diffie',
  '"The best defense is a good offense." — Security Proverb',
  '"Complexity is the enemy of security." — Bruce Schneier',
  '"Arguing that you don\'t care about privacy because you have nothing to hide is like saying you don\'t care about free speech." — Edward Snowden'
];

function displayRandomQuote() {
  const quoteElement = document.getElementById('random-quote');
  if (quoteElement) {
    const randomQuote = securityQuotes[Math.floor(Math.random() * securityQuotes.length)];
    quoteElement.textContent = randomQuote;
  }
}

// Compteur de visiteurs
function updateVisitorCount() {
  const visitorKey = 'visitor_count';
  const lastVisitKey = 'last_visit';
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;
  
  let count = parseInt(localStorage.getItem(visitorKey) || '0');
  const lastVisit = parseInt(localStorage.getItem(lastVisitKey) || '0');
  
  // Incrémenter si dernière visite > 24h
  if (!lastVisit || (now - lastVisit) > oneDay) {
    count++;
    localStorage.setItem(visitorKey, count.toString());
    localStorage.setItem(lastVisitKey, now.toString());
  }
  
  const visitorElement = document.getElementById('visitor-count');
  if (visitorElement) {
    visitorElement.textContent = count.toString();
  }
}

// Initialiser au chargement
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    displayRandomQuote();
    updateVisitorCount();
  });
} else {
  displayRandomQuote();
  updateVisitorCount();
}

// Calculer le temps de chargement
window.addEventListener('load', () => {
  const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
  const loadTimeEl = document.getElementById('load-time');
  if (loadTimeEl) {
    loadTimeEl.textContent = loadTime + 'ms';
  }
});

// Email obfuscation - Protection contre le harvesting
const emailParts = ['schwartz.th', 'proton.me'];
const emailAddress = emailParts[0] + '@' + emailParts[1];
let emailRevealed = false;

// Révéler l'email au premier hover/click (protection contre les bots)
function revealEmail() {
  if (!emailRevealed) {
    const emailDisplay = document.getElementById('email-display');
    const emailLink = document.getElementById('email-link');
    if (emailDisplay) {
      emailDisplay.textContent = emailAddress;
    }
    if (emailLink) {
      emailLink.href = 'mailto:' + emailAddress;
    }
    emailRevealed = true;
  }
}

// Landing page logic
let hasScrolled = false;

function scrollToContent() {
  const landingPage = document.getElementById('landingPage');
  const mainContent = document.getElementById('mainContent');
  
  landingPage.classList.add('hidden');
  mainContent.classList.add('visible');
  hasScrolled = true;
  
  // Small delay to ensure landing page is hidden before scrolling
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 100);
}

// Initialiser les event listeners pour scrollToContent
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-scroll-trigger]').forEach(element => {
    element.addEventListener('click', scrollToContent);
  });
});

// Auto-hide landing page on scroll
let scrollTimeout;
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  if (!hasScrolled) {
    const currentScrollY = window.scrollY;
    
    // Sur mobile, détecter un scroll vers le bas
    if (isMobile && currentScrollY > lastScrollY && currentScrollY > 30) {
      scrollToContent();
    } else if (!isMobile && currentScrollY > 50) {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        scrollToContent();
      }, 100);
    }
    
    lastScrollY = currentScrollY;
  }
}, { passive: true });

// Auto-hide landing page on wheel event (desktop)
if (!isMobile) {
  window.addEventListener('wheel', (e) => {
    if (!hasScrolled && e.deltaY > 0) {
      scrollToContent();
    }
  }, { passive: true });
}

// Touch events for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
  if (!hasScrolled) {
    touchStartY = e.changedTouches[0].screenY;
  }
}, { passive: true });

document.addEventListener('touchend', (e) => {
  if (!hasScrolled) {
    touchEndY = e.changedTouches[0].screenY;
    // Détecter un swipe vers le haut (scroll vers le bas)
    if (touchStartY - touchEndY > 50) {
      scrollToContent();
    }
  }
}, { passive: true });

// Click anywhere on landing page to continue
document.addEventListener('DOMContentLoaded', () => {
  const landingPage = document.getElementById('landingPage');
  if (landingPage) {
    landingPage.addEventListener('click', () => {
      if (!hasScrolled) {
        scrollToContent();
      }
    });
  }
});

// Clock
function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString('fr-FR', { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit',
    timeZone: 'Europe/Paris',
    hour12: false
  });
  document.getElementById('clock-time').textContent = time;
}
setInterval(updateClock, 1000);
updateClock();

// Mode clair/sombre
const toggleMode = document.getElementById('toggle-mode');
let isLight = false;

toggleMode.addEventListener('click', () => {
  isLight = !isLight;
  document.body.classList.toggle('light-mode', isLight);
  
  toggleMode.style.transform = 'scale(0.9)';
  setTimeout(() => {
    toggleMode.style.transform = 'scale(1.05)';
    setTimeout(() => {
      toggleMode.style.transform = '';
    }, 150);
  }, 100);
});

// Message de salutation
function updateGreeting() {
  const h = new Date().getHours();
  let key = '';
  if (h < 5) key = 'greeting.night';
  else if (h < 12) key = 'greeting.morning';
  else if (h < 18) key = 'greeting.afternoon';
  else key = 'greeting.evening';
  
  const greetingEl = document.getElementById('greeting');
  if (greetingEl && translations[currentLang] && translations[currentLang][key]) {
    greetingEl.textContent = translations[currentLang][key];
  }
}
updateGreeting();
setInterval(updateGreeting, 60*1000);

// Navigation active state
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
const navIndicator = document.getElementById('nav-indicator');
const topNav = document.querySelector('.topnav');

function updateNav() {
  if (!hasScrolled) return;
  
  let current = '';
  let activeLink = null;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
      activeLink = link;
    }
  });
  
  if (activeLink && navIndicator) {
    const parentRect = activeLink.parentElement.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    navIndicator.style.width = linkRect.width + 'px';
    navIndicator.style.left = (linkRect.left - parentRect.left) + 'px';
    navIndicator.classList.add('visible');
  } else if (navIndicator) {
    navIndicator.classList.remove('visible');
  }
  
  if (window.scrollY > 100) {
    topNav.classList.add('scrolled');
  } else {
    topNav.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', throttle(updateNav, 16), { passive: true });
window.addEventListener('resize', debounce(updateNav, 100));
updateNav();

// Smooth scroll
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    
    if (!hasScrolled) {
      scrollToContent();
      setTimeout(() => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }, 700);
    } else {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    }
    
    link.style.transform = 'scale(0.95)';
    setTimeout(() => {
      link.style.transform = '';
    }, 200);
  });
});

// Brand link to scroll to top or show landing
document.querySelector('.brand').addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Back to top - Optimis\u00e9 avec throttle
const backToTop = document.getElementById('back-to-top');

const updateBackToTop = throttle(() => {
  if (hasScrolled) {
    backToTop.style.display = window.scrollY > 400 ? 'flex' : 'none';
  }
}, 100);

window.addEventListener('scroll', updateBackToTop, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Toggle education
function toggleEducation(id) {
  const desc = document.getElementById('desc-' + id);
  const icon = document.getElementById('toggle-' + id);
  
  document.querySelectorAll('.education-description').forEach(d => {
    if (d.id !== 'desc-' + id) {
      d.classList.remove('open');
    }
  });
  document.querySelectorAll('.toggle-icon').forEach(i => {
    if (i.id !== 'toggle-' + id) {
      i.classList.remove('rotated');
    }
  });
  
  desc.classList.toggle('open');
  icon.classList.toggle('rotated');
}

// Initialiser les event listeners pour les toggles d'éducation
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-education-toggle]').forEach(header => {
    header.addEventListener('click', (e) => {
      const id = header.getAttribute('data-education-toggle');
      toggleEducation(id);
    });
  });
});

// Copy email
function copyEmail() {
  revealEmail(); // Révèle l'email avant de copier
  navigator.clipboard.writeText(emailAddress).then(() => {
    const toast = document.getElementById('toast');
    toast.textContent = 'Email copié !';
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  }).catch(err => {
    console.error('Erreur copie:', err);
    const toast = document.getElementById('toast');
    toast.textContent = 'Erreur lors de la copie';
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  });
}

// Prevent iOS bounce scroll on landing page
if (isMobile) {
  let startY;
  const landingPage = document.getElementById('landingPage');
  
  landingPage.addEventListener('touchstart', (e) => {
    startY = e.touches[0].pageY;
  }, { passive: false });
  
  landingPage.addEventListener('touchmove', (e) => {
    if (!hasScrolled) {
      const currentY = e.touches[0].pageY;
      // Allow scrolling down to trigger content reveal
      if (currentY < startY) {
        // Scrolling down - allow it
        return;
      }
      // Prevent scrolling up on landing page
      e.preventDefault();
    }
  }, { passive: false });
}

// Generate GitHub contribution graph
async function generateContributionGraph() {
  console.log('Starting generateContributionGraph...');
  const grid = document.getElementById('calendar-grid');
  const months = document.getElementById('calendar-months');
  const countEl = document.getElementById('calendar-count');
  
  console.log('Elements found:', { grid: !!grid, months: !!months, countEl: !!countEl });
  
  if (!grid) {
    console.error('Calendar grid not found');
    return;
  }
  
  // Rate limiting et cache
  const cacheKey = 'github_contributions_cache';
  const cacheTimeKey = 'github_contributions_time';
  const cacheExpiry = 3600000; // 1 heure
  
  // Vérifier le cache
  const cachedData = localStorage.getItem(cacheKey);
  const cachedTime = localStorage.getItem(cacheTimeKey);
  
  if (cachedData && cachedTime && (Date.now() - parseInt(cachedTime)) < cacheExpiry) {
    console.log('Using cached data');
    renderContributions(JSON.parse(cachedData));
    return;
  }
  
  try {
    const username = 'ctctchm';
    console.log('Fetching data for:', username);
    
    // Use GitHub contributions API avec timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
    
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      { 
        signal: controller.signal,
        headers: {
          'Accept': 'application/json'
        }
      }
    );
    clearTimeout(timeoutId);
    
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Data received:', data);
    
    if (!data || !data.contributions) {
      throw new Error('Invalid data structure');
    }
    
    // Sauvegarder en cache
    localStorage.setItem(cacheKey, JSON.stringify(data));
    localStorage.setItem(cacheTimeKey, Date.now().toString());
    
    renderContributions(data);
    
  } catch (error) {
    console.error('Error loading contributions:', error);
    if (countEl) {
      if (error.name === 'AbortError') {
        countEl.textContent = 'Request timeout - please refresh';
      } else {  
        countEl.textContent = 'Unable to load contributions';
      }
    }
    // Ne pas exposer les détails de l'erreur à l'utilisateur
  }
}

// Fonction de rendu séparée pour réutilisation avec le cache
function renderContributions(data) {
  const grid = document.getElementById('calendar-grid');
  const months = document.getElementById('calendar-months');
  const countEl = document.getElementById('calendar-count');
  
  const contributions = data.contributions;
  // Fix: data.total is an object like {lastYear: 32}
  let total = 0;
  if (data.total && typeof data.total === 'object') {
    total = data.total.lastYear || 0;
  } else if (typeof data.total === 'number') {
    total = data.total;
  }
  
  // Update count
  const year = new Date().getFullYear();
  if (countEl) {
    countEl.textContent = `${total} contribution${total !== 1 ? 's' : ''} in ${year}`;
  }
  
  // Generate months
  if (months) {
    months.innerHTML = ''; // Clear existing
    const weeks = Math.ceil(contributions.length / 7);
    let lastMonth = '';
    
    for (let weekIdx = 0; weekIdx < weeks; weekIdx++) {
      const dayIdx = weekIdx * 7;
      if (dayIdx >= contributions.length) break;
      
      const date = new Date(contributions[dayIdx].date);
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      
      if (month !== lastMonth) {
        const label = document.createElement('span');
        label.className = 'month-label';
        label.textContent = month;
        label.style.left = (weekIdx * 13) + 'px'; // 10px cell + 3px gap
        months.appendChild(label);
        lastMonth = month;
      }
    }
  }
  
  // Generate grid - Sanitize data
  contributions.forEach(day => {
    const cell = document.createElement('div');
    cell.className = `calendar-day level-${Math.min(Math.max(day.level || 0, 0), 4)}`; // Limite 0-4
    
    const date = new Date(day.date);
    const dateStr = date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
    
    const count = Math.max(day.count || 0, 0); // Assurer que c'est un nombre positif
    cell.title = `${count} contribution${count !== 1 ? 's' : ''} on ${dateStr}`;
    grid.appendChild(cell);
  });
}

// Initialize - Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    generateContributionGraph().catch(err => console.error('Error in generateContributionGraph:', err));
  });
} else {
  generateContributionGraph().catch(err => console.error('Error in generateContributionGraph:', err));
}

// Fetch real GitHub stats
async function updateGitHubStats() {
  // Rate limiting et cache
  const cacheKey = 'github_stats_cache';
  const cacheTimeKey = 'github_stats_time';
  const cacheExpiry = 3600000; // 1 heure
  
  const cachedData = localStorage.getItem(cacheKey);
  const cachedTime = localStorage.getItem(cacheTimeKey);
  
  if (cachedData && cachedTime && (Date.now() - parseInt(cachedTime)) < cacheExpiry) {
    const stats = JSON.parse(cachedData);
    animateValue('total-repos', 0, stats.repos, 1000);
    animateValue('total-commits', 0, stats.commits, 1200);
    animateValue('total-prs', 0, stats.prs, 1400);
    animateValue('total-issues', 0, stats.issues, 1600);
    return;
  }
  
  try {
    const username = 'ctctchm';
    
    // Timeout pour les requêtes
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    // Fetch user data
    const userResponse = await fetch(`https://api.github.com/users/${username}`, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    if (!userResponse.ok) {
      throw new Error(`HTTP error! status: ${userResponse.status}`);
    }
    
    const userData = await userResponse.json();
    
    // Fetch repositories
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    if (!reposResponse.ok) {
      throw new Error(`HTTP error! status: ${reposResponse.status}`);
    }
    
    const repos = await reposResponse.json();
    
    // Fetch events for commits, PRs, issues
    const eventsResponse = await fetch(`https://api.github.com/users/${username}/events/public?per_page=100`, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    clearTimeout(timeoutId);
    
    if (!eventsResponse.ok) {
      throw new Error(`HTTP error! status: ${eventsResponse.status}`);
    }
    
    const events = await eventsResponse.json();
    
    // Count stats avec validation
    const totalRepos = Math.max(userData.public_repos || 0, 0);
    
    let totalCommits = 0;
    let totalPRs = 0;
    let totalIssues = 0;
    
    if (Array.isArray(events)) {
      events.forEach(event => {
        if (event && event.type) {
          if (event.type === 'PushEvent' && event.payload && event.payload.commits) {
            totalCommits += Math.max(event.payload.commits.length || 0, 0);
          } else if (event.type === 'PullRequestEvent') {
            totalPRs++;
          } else if (event.type === 'IssuesEvent') {
            totalIssues++;
          }
        }
      });
    }
    
    const stats = {
      repos: totalRepos,
      commits: totalCommits,
      prs: totalPRs,
      issues: totalIssues
    };
    
    // Sauvegarder en cache
    localStorage.setItem(cacheKey, JSON.stringify(stats));
    localStorage.setItem(cacheTimeKey, Date.now().toString());
    
    // Update UI with animation
    animateValue('total-repos', 0, totalRepos, 1000);
    animateValue('total-commits', 0, totalCommits, 1200);
    animateValue('total-prs', 0, totalPRs, 1400);
    animateValue('total-issues', 0, totalIssues, 1600);
    
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    // Ne pas exposer les détails de l'erreur - garder les valeurs placeholder
  }
}

// Animate number counting
function animateValue(id, start, end, duration) {
  const element = document.getElementById(id);
  if (!element) return;
  
  const range = end - start;
  const increment = range / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
      current = end;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 16);
}

// Initialize GitHub widget - already initialized above, removing duplicate

// Initialiser la révélation de l'email au chargement
document.addEventListener('DOMContentLoaded', () => {
  const emailCard = document.querySelector('[data-copy-email]');
  const emailLink = document.getElementById('email-link');
  
  if (emailCard) {
    emailCard.addEventListener('mouseenter', revealEmail, { once: true });
    emailCard.addEventListener('click', copyEmail);
  }
  
  if (emailLink) {
    emailLink.addEventListener('mouseenter', revealEmail, { once: true });
    emailLink.addEventListener('click', (e) => {
      if (!emailRevealed) {
        e.preventDefault();
        revealEmail();
      }
    });
  }
  
  // Rendre les skills cliquables vers Wikipedia
  const skills = document.querySelectorAll('.skill[data-wiki-url]');
  console.log('Found skills:', skills.length);
  
  skills.forEach(skill => {
    skill.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const url = skill.getAttribute('data-wiki-url');
      console.log('Clicked skill, URL:', url);
      if (url) {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    });
    // Visual feedback
    skill.style.cursor = 'pointer';
  });

  // Stars parallax effect - Optimisé avec fragment
  const starsContainer = document.getElementById('starsContainer');
  const starCount = 40; // Nombre d'étoiles
  const fragment = document.createDocumentFragment(); // Optimisation: batch DOM updates
  
  // Générer les étoiles
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Variations de taille
    const rand = Math.random();
    if (rand < 0.3) {
      star.classList.add('small');
    } else if (rand > 0.8) {
      star.classList.add('large');
    }
    
    // Position aléatoire
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    
    // Vitesse de parallaxe (dataset pour le scroll)
    star.dataset.speed = (Math.random() * 0.5 + 0.3).toFixed(2); // entre 0.3 et 0.8
    
    fragment.appendChild(star);
  }
  
  // Ajout unique au DOM pour éviter les reflows multiples
  starsContainer.appendChild(fragment);
  
  // Animation au scroll (vers le haut) avec traînées dynamiques
  let ticking = false;
  let lastScrollY = window.scrollY;
  let scrollTimeout = null;
  
  function updateStars() {
    const scrollY = window.scrollY;
    const stars = document.querySelectorAll('.star');
    const scrollVelocity = Math.abs(scrollY - lastScrollY);
    
    // Ajouter la classe "moving" si on scroll
    if (scrollVelocity > 0.5) {
      stars.forEach(star => {
        const speed = parseFloat(star.dataset.speed);
        const translateY = scrollY * speed * -0.3; // Négatif pour bouger vers le haut
        star.style.transform = `translateY(${translateY}px)`;
        star.classList.add('moving');
      });
      
      // Enlever la classe après l'arrêt du scroll
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        stars.forEach(star => star.classList.remove('moving'));
      }, 150);
    } else {
      stars.forEach(star => {
        const speed = parseFloat(star.dataset.speed);
        const translateY = scrollY * speed * -0.3;
        star.style.transform = `translateY(${translateY}px)`;
      });
    }
    
    lastScrollY = scrollY;
    ticking = false;
  }
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateStars);
      ticking = true;
    }
  });
});

// Scroll progress indicator
const scrollProgress = document.getElementById('scroll-progress');

const updateScrollProgress = throttle(() => {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
  
  if (scrollProgress) {
    scrollProgress.style.height = Math.min(scrollPercent, 100) + '%';
  }
}, 16);

window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();
