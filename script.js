// Détection mobile
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

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

// Copy email
function copyEmail() {
  navigator.clipboard.writeText('schwartz.th@proton.me').then(() => {
    const toast = document.getElementById('toast');
    toast.textContent = 'Email copié !';
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  }).catch(err => {
    console.error('Erreur copie:', err);
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
  
  try {
    const username = 'ctctchm';
    console.log('Fetching data for:', username);
    
    // Use GitHub contributions API
    const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Data received:', data);
    
    if (!data || !data.contributions) {
      throw new Error('No data');
    }
    
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
      let monthPosition = 0;
      
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
    
    // Generate grid
    contributions.forEach(day => {
      const cell = document.createElement('div');
      cell.className = `calendar-day level-${day.level}`;
      
      const date = new Date(day.date);
      const dateStr = date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
      
      cell.title = `${day.count} contribution${day.count !== 1 ? 's' : ''} on ${dateStr}`;
      grid.appendChild(cell);
    });
    
  } catch (error) {
    console.error('Error loading contributions:', error);
    if (countEl) {
      countEl.textContent = 'Unable to load contributions';
    }
  }
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
  try {
    const username = 'ctctchm';
    
    // Fetch user data
    const userResponse = await fetch(`https://api.github.com/users/${username}`);
    const userData = await userResponse.json();
    
    // Fetch repositories
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    const repos = await reposResponse.json();
    
    // Fetch events for commits, PRs, issues
    const eventsResponse = await fetch(`https://api.github.com/users/${username}/events/public?per_page=100`);
    const events = await eventsResponse.json();
    
    // Count stats
    const totalRepos = userData.public_repos || 0;
    
    let totalCommits = 0;
    let totalPRs = 0;
    let totalIssues = 0;
    
    events.forEach(event => {
      if (event.type === 'PushEvent') {
        totalCommits += event.payload.commits ? event.payload.commits.length : 0;
      } else if (event.type === 'PullRequestEvent') {
        totalPRs++;
      } else if (event.type === 'IssuesEvent') {
        totalIssues++;
      }
    });
    
    // Update UI with animation
    animateValue('total-repos', 0, totalRepos, 1000);
    animateValue('total-commits', 0, totalCommits, 1200);
    animateValue('total-prs', 0, totalPRs, 1400);
    animateValue('total-issues', 0, totalIssues, 1600);
    
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    // Keep placeholder values on error
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
