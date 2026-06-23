const toggleBtn = document.getElementById('theme-toggle');
const nav = document.querySelector('nav');
const menuToggle = document.querySelector('.menu-toggle');
const reveals = document.querySelectorAll('.reveal');
const counters = document.querySelectorAll('.counter');
const progressBar = document.querySelector('.progress-bar');
const navbar = document.querySelector('.navbar');


// =========================
// THEME TOGGLE (WITH MEMORY)
// =========================
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    toggleBtn.textContent = '☀️';
}

toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');

    if (document.body.classList.contains('dark')) {
        toggleBtn.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        toggleBtn.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
});


// =========================
// MOBILE MENU
// =========================
menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});


// Close menu when clicking a link (mobile UX improvement)
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});


// =========================
// SCROLL REVEAL
// =========================
function revealElements() {
    const windowHeight = window.innerHeight;

    reveals.forEach(el => {
        const revealTop = el.getBoundingClientRect().top;
        const revealPoint = 120;

        if (revealTop < windowHeight - revealPoint) {
            el.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealElements);
window.addEventListener('load', revealElements);


// =========================
// NAVBAR SCROLL EFFECT
// =========================
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


// =========================
// SMOOTH SCROLL (NAV LINKS)
// =========================
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


// =========================
// SCROLL PROGRESS BAR
// =========================
window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    if (progressBar) {
        progressBar.style.width = scrolled + "%";
    }
});


// =========================
// ANIMATED COUNTERS
// =========================
function animateCounters() {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const current = +counter.innerText;

            const increment = target / 80;

            if (current < target) {
                counter.innerText = Math.ceil(current + increment);
                setTimeout(updateCount, 30);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    });
}

// Run counters when page loads
window.addEventListener('load', animateCounters);