const revealItems = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.14 });

    revealItems.forEach((item) => observer.observe(item));
}

const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxClose = lightbox.querySelector(".lightbox-close");
let lightboxTrigger = null;

document.querySelectorAll("[data-image]").forEach((button) => {
    button.addEventListener("click", () => {
        lightboxTrigger = button;
        lightboxImage.src = button.dataset.image;
        lightboxImage.alt = button.dataset.alt || "";
        lightbox.showModal();
    });
});

function closeLightbox() {
    lightbox.close();
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
});
lightbox.addEventListener("close", () => {
    lightboxImage.removeAttribute("src");
    lightboxImage.alt = "";
    lightboxTrigger?.focus();
    lightboxTrigger = null;
});
