const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');

if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.14, rootMargin: '0px 0px -48px' }
    );

    revealItems.forEach((item) => observer.observe(item));

    window.setTimeout(() => {
        revealItems.forEach((item) => item.classList.add('is-visible'));
        observer.disconnect();
    }, 1200);
}

const dialog = document.querySelector('.image-dialog');
const dialogImage = dialog.querySelector('img');
const closeButton = dialog.querySelector('.dialog-close');

document.querySelectorAll('.gallery-image').forEach((button) => {
    button.addEventListener('click', () => {
        dialogImage.src = button.dataset.image;
        dialogImage.alt = button.dataset.alt;
        dialog.showModal();
    });
});

function closeDialog() {
    dialog.close();
    dialogImage.src = '';
    dialogImage.alt = '';
}

closeButton.addEventListener('click', closeDialog);

dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeDialog();
});

const carousel = document.querySelector('[data-carousel]');
const track = carousel.querySelector('.gallery-track');
const slides = [...carousel.querySelectorAll('.gallery-slide')];
const dots = [...carousel.querySelectorAll('[data-carousel-dot]')];
const currentSlide = document.querySelector('#currentSlide');
const slideTitle = document.querySelector('#slideTitle');
const slideDescription = document.querySelector('#slideDescription');
let activeSlide = 0;
let touchStartX = 0;

function showSlide(index) {
    activeSlide = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${activeSlide * 100}%)`;
    currentSlide.textContent = String(activeSlide + 1);
    slideTitle.textContent = slides[activeSlide].dataset.title;
    slideDescription.textContent = slides[activeSlide].dataset.description;

    slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === activeSlide;
        slide.setAttribute('aria-hidden', String(!isActive));
        slide.querySelector('.gallery-image').tabIndex = isActive ? 0 : -1;
    });

    dots.forEach((dot, dotIndex) => {
        const isActive = dotIndex === activeSlide;
        dot.classList.toggle('is-active', isActive);
        if (isActive) {
            dot.setAttribute('aria-current', 'true');
        } else {
            dot.removeAttribute('aria-current');
        }
    });
}

carousel.querySelector('[data-carousel-prev]').addEventListener('click', () => showSlide(activeSlide - 1));
carousel.querySelector('[data-carousel-next]').addEventListener('click', () => showSlide(activeSlide + 1));
dots.forEach((dot) => dot.addEventListener('click', () => showSlide(Number(dot.dataset.carouselDot))));

carousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') showSlide(activeSlide - 1);
    if (event.key === 'ArrowRight') showSlide(activeSlide + 1);
});

track.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
}, { passive: true });

track.addEventListener('touchend', (event) => {
    const distance = touchStartX - event.changedTouches[0].clientX;
    if (Math.abs(distance) < 48) return;
    showSlide(activeSlide + (distance > 0 ? 1 : -1));
}, { passive: true });

showSlide(0);
