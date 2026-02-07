// Détection mobile
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

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
  let msg = '';
  if (h < 5) msg = 'Good night';
  else if (h < 12) msg = 'Good morning';
  else if (h < 18) msg = 'Good afternoon';
  else msg = 'Good evening';
  document.getElementById('greeting').textContent = msg;
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

window.addEventListener('scroll', updateNav, { passive: true });
window.addEventListener('resize', updateNav);
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

// Back to top
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (hasScrolled) {
    backToTop.style.display = window.scrollY > 400 ? 'flex' : 'none';
  }
}, { passive: true });

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
});
