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
