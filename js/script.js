// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scroll with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to project cards
// const projectCards = document.querySelectorAll('.project-card');
// projectCards.forEach((card, index) => {
//     card.style.opacity = '0';
//     card.style.transform = 'translateY(30px)';
//     card.style.transition = `all 0.6s ease ${index * 0.1}s`;
//     observer.observe(card);
// });

// Apply fade-in animation to about section
const aboutCard = document.querySelector('.about-card');
if (aboutCard) {
    aboutCard.style.opacity = '0';
    aboutCard.style.transform = 'translateY(30px)';
    aboutCard.style.transition = 'all 0.8s ease';
    observer.observe(aboutCard);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    const scrolled = window.pageYOffset;
    
    if (heroText && heroImage && scrolled < window.innerHeight) {
        heroText.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Add active state styling
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color) !important;
        position: relative;
    }
    
    .nav-link.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background: var(--accent-gradient);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);

// Console welcome message
console.log('%c👋 Hi there!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cThanks for checking out my portfolio!', 'font-size: 14px; color: #8b5cf6;');
console.log('%cLet\'s create something amazing together! 🚀', 'font-size: 14px; color: #cbd5e1;');

// FAQ Accordion
document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      // Close other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current item
      item.classList.toggle('active');
    });
  });
});

// Project Carousel Navigation
document.addEventListener('DOMContentLoaded', () => {
  let currentProject = 0;
  const projectCards = document.querySelectorAll('.project-card-carousel');
  const projectsContainer = document.querySelector('.projects-container');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  // Debug
  console.log('Project Cards:', projectCards.length);
  console.log('Projects Container:', projectsContainer);
  console.log('Prev Btn:', prevBtn);
  console.log('Next Btn:', nextBtn);

  if (!projectsContainer || projectCards.length === 0) {
    console.warn('Carousel elements not found');
    return;
  }

  // Initialize - show first project
  showProject(0);

  function showProject(index) {
    // Wrap around
    if (index >= projectCards.length) {
      currentProject = 0;
    } else if (index < 0) {
      currentProject = projectCards.length - 1;
    } else {
      currentProject = index;
    }
    
    console.log('Current Project:', currentProject);
    
    // Translate container
    const offset = -currentProject * 100;
    projectsContainer.style.transform = `translateX(${offset}%)`;
  }

  // Event listeners for carousel buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Prev clicked');
      showProject(currentProject - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Next clicked');
      showProject(currentProject + 1);
    });
  }

  // Optional: Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      console.log('Arrow Left pressed');
      showProject(currentProject - 1);
    }
    if (e.key === 'ArrowRight') {
      console.log('Arrow Right pressed');
      showProject(currentProject + 1);
    }
  });
});