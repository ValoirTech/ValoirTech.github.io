const menuToggle = document.getElementById('menuToggle');
const navPanel = document.getElementById('navPanel');
const navLinks = [...document.querySelectorAll('.nav-links a')];
const filterButtons = [...document.querySelectorAll('.filter-btn')];
const projectCards = [...document.querySelectorAll('.project-card')];
const fadeEls = [...document.querySelectorAll('.fade-in')];
const backToTop = document.getElementById('backToTop');
const sections = [...document.querySelectorAll('main section[id]')];
const logoTiltCard = document.getElementById('logoTiltCard');

if (menuToggle && navPanel) {
    menuToggle.addEventListener('click', () => {
        const isOpen = navPanel.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
}

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        navPanel?.classList.remove('open');
        menuToggle?.setAttribute('aria-expanded', 'false');
    });
});

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        filterButtons.forEach((btn) => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        });
        button.classList.add('active');
        button.setAttribute('aria-selected', 'true');
        projectCards.forEach((card) => {
            const shouldShow = filter === 'all' || card.dataset.category === filter;
            card.style.display = shouldShow ? 'grid' : 'none';
        });
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.16, rootMargin: '0px 0px -40px 0px' });
fadeEls.forEach((el) => observer.observe(el));

function updateScrollUI() {
    const scrollY = window.scrollY;
    backToTop?.classList.toggle('visible', scrollY > 500);
    let current = '';
    sections.forEach((section) => {
        if (scrollY >= section.offsetTop - 130) current = section.getAttribute('id') || '';
    });
    navLinks.forEach((link) => {
        const targetId = (link.getAttribute('href') || '').replace('#', '');
        link.classList.toggle('active', targetId === current);
    });
}
window.addEventListener('scroll', updateScrollUI, { passive: true });
window.addEventListener('load', updateScrollUI);

if (logoTiltCard && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    logoTiltCard.addEventListener('mousemove', (event) => {
        const rect = logoTiltCard.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        logoTiltCard.style.transform = `perspective(1000px) rotateX(${-y * 7}deg) rotateY(${x * 8}deg) translateY(-2px)`;
    });
    logoTiltCard.addEventListener('mouseleave', () => {
        logoTiltCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
}
