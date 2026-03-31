// Global Variables
const typingText = document.getElementById('typingText');
const enterBtn = document.getElementById('enterBtn');
const navbar = document.getElementById('navbar');
const particlesContainer = document.getElementById('particles');
const starsContainer = document.getElementById('starsContainer');
const cursorGlow = document.querySelector('.cursor-glow');
const modalOverlay = document.getElementById('modalOverlay');
const projectModal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalContent = document.getElementById('modalContent');
const contactForm = document.getElementById('contactForm');
const successPopup = document.getElementById('successPopup');

// Projects Data
const projects = [
    {
        title: "House Price Prediction",
        description: "Built Machine Learning regression model to predict house prices using advanced algorithms and feature engineering techniques.",
        tech: ["Python", "Scikit-learn", "Pandas", "Linear Regression", "Random Forest"]
    },
    {
        title: "Movie Recommendation System",
        description: "Created recommendation system using cosine similarity and collaborative filtering for personalized movie suggestions.",
        tech: ["Python", "Pandas", "NumPy", "Cosine Similarity", "Scikit-learn"]
    },
    {
        title: "Fake News Detection",
        description: "Built NLP model to detect fake news articles using advanced natural language processing techniques and machine learning classifiers.",
        tech: ["Python", "NLP", "TF-IDF", "LSTM", "Scikit-learn"]
    }
];

// Typing Animation Text
const introTexts = [
    "Hello 👋",
    "I am Aman Meena",
    "Data Science Student"
];

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initCursor();
    createParticles();
    createTwinklingStars();
    initTypingAnimation();
    initScrollEffects();
    initNavigation();
    initSolarSystem();
    initProjectStars();
    initCounters();
    initScrollReveal();
    initParallax();
    initForm();
});

// Cursor Glow Effect
function initCursor() {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });
}

// Create Floating Particles
function createParticles() {
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Create Twinkling Stars
function createTwinklingStars() {
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'twinkling-star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 10 + 's';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        starsContainer.appendChild(star);
    }
}

// Typing Animation
function initTypingAnimation() {
    let textIndex = 0;
    let charIndex = 0;
    let currentText = '';
    
    function typeWriter() {
        if (charIndex < introTexts[textIndex].length) {
            currentText += introTexts[textIndex].charAt(charIndex);
            typingText.textContent = currentText;
            charIndex++;
            setTimeout(typeWriter, 100);
        } else {
            setTimeout(() => {
                charIndex = 0;
                currentText = '';
                textIndex = (textIndex + 1) % introTexts.length;
                typeWriter();
            }, 2000);
        }
    }
    
    typeWriter();
}

// Navbar Scroll Effect
function initNavigation() {
    enterBtn.addEventListener('click', () => {
        document.getElementById('intro').scrollIntoView({ behavior: 'smooth' });
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('active');
        } else {
            navbar.classList.remove('active');
        }
    });
}

// Solar System Animation
function initSolarSystem() {
    const planets = document.querySelectorAll('.planet');
    
    planets.forEach(planet => {
        planet.addEventListener('mouseenter', function() {
            const skillName = this.dataset.skill;
            showTooltip(skillName, this);
            this.style.transform = 'scale(1.5)';
            this.style.filter = 'drop-shadow(0 0 30px var(--primary-purple))';
        });
        
        planet.addEventListener('mouseleave', function() {
            hideTooltip();
            this.style.transform = 'scale(1)';
            this.style.filter = '';
        });
    });
}

let tooltip;
function showTooltip(skill, planet) {
    tooltip = document.createElement('div');
    tooltip.className = 'skill-tooltip';
    tooltip.textContent = skill;
    tooltip.style.left = planet.offsetLeft + planet.offsetWidth / 2 + 'px';
    tooltip.style.top = planet.offsetTop - 40 + 'px';
    document.body.appendChild(tooltip);
}

function hideTooltip() {
    if (tooltip) {
        tooltip.remove();
        tooltip = null;
    }
}

// Project Stars Interaction
function initProjectStars() {
    document.querySelectorAll('.project-star').forEach((star, index) => {
        star.addEventListener('click', () => {
            showProjectModal(index);
        });
    });
}

function showProjectModal(index) {
    const project = projects[index];
    modalContent.innerHTML = `
        <h2>${project.title}</h2>
        <p>${project.description}</p>
        <div class="tech-stack">
            ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
    `;
    modalOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});

function closeModal() {
    modalOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Animated Counters
function initCounters() {
    const counters = document.querySelectorAll('.counter-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(counter) {
    const target = parseInt(counter.dataset.target);
    const increment = target / 100;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            counter.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            counter.textContent = formatNumber(current);
        }
    }, 20);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M+';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K+';
    }
    return Math.floor(num);
}

// Scroll Reveal Animation
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.about-card, .timeline-item, .education-card, .counter-item, .contact-item').forEach(el => {
        observer.observe(el);
    });
}

// Parallax Mouse Movement
function initParallax() {
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const parallaxElements = document.querySelectorAll('.parallax');
        parallaxElements.forEach(el => {
            const speedX = el.dataset.speedX || 0;
            const speedY = el.dataset.speedY || 0;
            el.style.transform = `translate(${mouseX * speedX}px, ${mouseY * speedY}px)`;
        });
    });
}

// Contact Form
function initForm() {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const name = formData.get('name') || contactForm.querySelector('input[type="text"]').value;
        const email = formData.get('email') || contactForm.querySelector('input[type="email"]').value;
        const message = formData.get('message') || contactForm.querySelector('textarea').value;
        
        if (validateForm(name, email, message)) {
            showSuccessPopup();
            contactForm.reset();
        }
    });
}

function validateForm(name, email, message) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!name || name.length < 2) {
        alert('Please enter a valid name (minimum 2 characters)');
        return false;
    }
    
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    if (!message || message.length < 10) {
        alert('Please enter a message (minimum 10 characters)');
        return false;
    }
    
    return true;
}

function showSuccessPopup() {
    successPopup.style.display = 'flex';
    setTimeout(() => {
        successPopup.style.display = 'none';
    }, 3000);
}

// Scroll Effects
function initScrollEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const parallax = document.querySelector('.hero');
        const speed = scrolled * -0.5;
        
        if (parallax) {
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
}

// Add CSS animations dynamically for better performance
const style = document.createElement('style');
style.textContent = `
    @keyframes galaxyShift {
        0% { background-position: 0% 50%; }
        100% { background-position: 100% 50%; }
    }
    
    .twinkling-star {
        position: absolute;
        width: 2px;
        height: 2px;
        background: white;
        border-radius: 50%;
        animation: twinkle 2s ease-in-out infinite alternate;
        box-shadow: 0 0 5px rgba(255,255,255,0.8);
    }
    
    @keyframes twinkle {
        0% { opacity: 0.3; transform: scale(1); }
        100% { opacity: 1; transform: scale(1.5); }
    }
    
    .skill-tooltip {
        position: absolute;
        background: rgba(10,10,15,0.95);
        color: white;
        padding: 10px 15px;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 600;
        backdrop-filter: blur(10px);
        border: 1px solid var(--glass-border);
        box-shadow: var(--neon-glow);
        z-index: 10000;
        pointer-events: none;
        white-space: nowrap;
    }
    
    .animate {
        animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        opacity: 1;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .success-popup {
        display: none;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, var(--primary-purple), var(--secondary-purple));
        padding: 2rem;
        border-radius: 20px;
        box-shadow: var(--neon-glow-strong);
        z-index: 10000;
        text-align: center;
        animation: popupSlide 0.4s ease-out;
    }
    
    @keyframes popupSlide {
        from {
            opacity: 0;
            transform: translate(-50%, -60%);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
    }
    
    .tech-tag {
        display: inline-block;
        background: rgba(255,255,255,0.1);
        padding: 5px 12px;
        margin: 5px;
        border-radius: 20px;
        font-size: 14px;
        border: 1px solid var(--glass-border);
    }
    
    @media (max-width: 768px) {
        .section-title { font-size: 2rem; }
        .typing-text { font-size: 2.5rem; }
        .enter-btn { font-size: 1.8rem; padding: 1.5rem 3rem; }
    }
`;
document.head.appendChild(style);

// Performance optimization - throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations can be added here
}, 16));