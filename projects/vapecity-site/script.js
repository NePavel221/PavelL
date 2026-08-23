(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealItems = document.querySelectorAll(".reveal");

    if (reduceMotion || !("IntersectionObserver" in window)) {
        revealItems.forEach((item) => item.classList.add("is-visible"));
    } else {
        document.documentElement.classList.add("motion-ready");
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

    document.querySelectorAll("[data-image]").forEach((button) => {
        button.addEventListener("click", () => {
            lightboxImage.src = button.dataset.image;
            lightboxImage.alt = button.dataset.alt || "";
            lightbox.showModal();
        });
    });

    const closeLightbox = () => {
        lightbox.close();
        lightboxImage.removeAttribute("src");
        lightboxImage.alt = "";
    };

    closeButton.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) closeLightbox();
    });
})();
