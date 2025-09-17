// DOM elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    if (scrolled > 100) {
        navbar.style.background = 'rgba(26, 26, 26, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').substring(1) === current) {
            item.classList.add('active');
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Special handling for timeline items
            if (entry.target.classList.contains('timeline-item')) {
                const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 200;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, delay);
            }
            
            // Special handling for about blocks
            if (entry.target.classList.contains('about-block')) {
                const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 150;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
            }
            
            // Special handling for competency cards
            if (entry.target.classList.contains('competency-card')) {
                const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 200;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll(
        '.about-block, .competency-card, .timeline-item, .contact-item'
    );
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-elements .element');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 500);
    }
});

// Add scroll-triggered animations for elements
function addScrollAnimation() {
    const scrollElements = document.querySelectorAll('.competency-card, .about-block');
    
    scrollElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s ease-out';
    });
}

// Counter animation for statistics (if needed in future)
function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        const currentValue = Math.floor(start + (end - start) * progress);
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Hover effects for competency cards
document.addEventListener('DOMContentLoaded', () => {
    const competencyCards = document.querySelectorAll('.competency-card');
    
    competencyCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Dynamic gradient animation for hero background
function animateGradient() {
    const hero = document.querySelector('.hero');
    let angle = 0;
    
    function updateGradient() {
        angle = (angle + 0.5) % 360;
        const gradient = `radial-gradient(ellipse at ${50 + Math.sin(angle * Math.PI / 180) * 20}% ${50 + Math.cos(angle * Math.PI / 180) * 20}%, rgba(0, 210, 255, 0.1) 0%, transparent 50%)`;
        
        if (hero) {
            hero.style.setProperty('--dynamic-gradient', gradient);
        }
        
        requestAnimationFrame(updateGradient);
    }
    
    updateGradient();
}

// Contact form interaction (for future enhancement)
function handleContactInteraction() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.addEventListener('click', () => {
            const link = item.querySelector('.contact-link');
            if (link) {
                // Add a subtle animation when clicked
                item.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    item.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });
}

// Initialize all interactions
document.addEventListener('DOMContentLoaded', () => {
    addScrollAnimation();
    handleContactInteraction();
    animateGradient();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Performance optimization: debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Scroll handling logic here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Preload critical images and assets
function preloadAssets() {
    const criticalAssets = [
        // Add any critical image URLs here when images are added
    ];
    
    criticalAssets.forEach(asset => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = asset;
        link.as = 'image';
        document.head.appendChild(link);
    });
}

// Progressive enhancement for older browsers
function checkBrowserSupport() {
    const supportsIntersectionObserver = 'IntersectionObserver' in window;
    const supportsCSS = CSS && CSS.supports && CSS.supports('color', 'var(--test)');
    
    if (!supportsIntersectionObserver || !supportsCSS) {
        // Fallback for older browsers
        document.body.classList.add('legacy-browser');
        
        // Show all elements immediately if no intersection observer
        const elementsToShow = document.querySelectorAll('.about-block, .competency-card, .timeline-item');
        elementsToShow.forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'none';
        });
    }
}

// Initialize browser compatibility checks
checkBrowserSupport();

// Error handling for failed animations
window.addEventListener('error', (e) => {
    console.warn('Animation error caught:', e.error);
    // Gracefully degrade animations on error
    document.body.classList.add('no-animations');
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Focus management for accessibility
function manageFocus() {
    const focusableElements = document.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid var(--primary-color)';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = 'none';
        });
    });
}

// Initialize accessibility features
manageFocus();