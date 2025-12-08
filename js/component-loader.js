// Load HTML components
async function loadComponent(componentPath, targetSelector) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`Failed to load ${componentPath}`);
        }
        const html = await response.text();
        document.querySelector(targetSelector).innerHTML = html;
    } catch (error) {
        console.error('Error loading component:', error);
    }
}

// Load all components
document.addEventListener('DOMContentLoaded', async () => {
    await loadComponent('./component/navbar.html', '#navbar-container');
    await loadComponent('./component/hero.html', '#hero-container');
    await loadComponent('./component/about.html', '#about-container');
    await loadComponent('./component/projects.html', '#projects-container');
    await loadComponent('./component/problems.html', '#problems-container');
    await loadComponent('./component/contact.html', '#contact-container');
    await loadComponent('./component/footer.html', '#footer-container');
    
    // Initialize script functionality after components are loaded
    initializeScripts();
});

function initializeScripts() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

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

    // Carousel Functionality
    const projectsContainer = document.querySelector('.projects-container');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;

    if (projectsContainer && prevBtn && nextBtn) {
        const updateCarousel = () => {
            const cards = document.querySelectorAll('.project-card-carousel');
            cards.forEach((card, index) => {
                card.style.display = index === currentIndex ? 'flex' : 'none';
            });
        };

        prevBtn.addEventListener('click', () => {
            const cards = document.querySelectorAll('.project-card-carousel');
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            updateCarousel();
        });

        nextBtn.addEventListener('click', () => {
            const cards = document.querySelectorAll('.project-card-carousel');
            currentIndex = (currentIndex + 1) % cards.length;
            updateCarousel();
        });

        updateCarousel();
    }

    // FAQ Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
}
