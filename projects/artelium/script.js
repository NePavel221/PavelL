const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll(".reveal");

if (reduceMotion || !("IntersectionObserver" in window)) {
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
const closeButton = lightbox.querySelector(".lightbox-close");

function openLightbox(source, alt = "Увеличенный экран Artelium") {
    lightboxImage.src = source;
    lightboxImage.alt = alt;
    lightbox.showModal();
}

document.querySelectorAll("[data-lightbox]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
        const preview = trigger.querySelector("img");
        openLightbox(trigger.dataset.lightbox, preview?.alt);
    });
});

closeButton.addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.close();
});
lightbox.addEventListener("close", () => {
    lightboxImage.removeAttribute("src");
});
