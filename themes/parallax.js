// Parallax Theme — многослойный фон с эффектом глубины
window.ParallaxTheme = {
    init() {
        // Добавляем CSS
        const style = document.createElement('style');
        style.className = 'parallax-style';
        style.textContent = `
            .parallax-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: -1;
                overflow: hidden;
                pointer-events: none;
            }
            .parallax-layer {
                position: absolute;
                width: 100%;
                height: 100%;
                transition: transform 0.1s ease-out;
            }
            .parallax-gradient {
                background: 
                    radial-gradient(ellipse at 20% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
                    radial-gradient(ellipse at 80% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
                    radial-gradient(ellipse at 50% 50%, rgba(34, 211, 238, 0.05) 0%, transparent 70%);
            }
            .parallax-shapes {
                opacity: 0.6;
            }
            .parallax-shape {
                position: absolute;
                border-radius: 50%;
                filter: blur(40px);
            }
            .shape-1 {
                width: 300px;
                height: 300px;
                background: rgba(139, 92, 246, 0.3);
                top: 10%;
                left: 10%;
            }
            .shape-2 {
                width: 200px;
                height: 200px;
                background: rgba(236, 72, 153, 0.25);
                top: 60%;
                right: 15%;
            }
            .shape-3 {
                width: 250px;
                height: 250px;
                background: rgba(34, 211, 238, 0.2);
                bottom: 20%;
                left: 30%;
            }
            .shape-4 {
                width: 150px;
                height: 150px;
                background: rgba(251, 191, 36, 0.2);
                top: 30%;
                right: 30%;
            }
            .parallax-grid {
                background-image: 
                    linear-gradient(rgba(139, 92, 246, 0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(139, 92, 246, 0.03) 1px, transparent 1px);
                background-size: 50px 50px;
            }
            .parallax-dots {
                background-image: radial-gradient(rgba(139, 92, 246, 0.15) 1px, transparent 1px);
                background-size: 30px 30px;
            }
            .parallax-noise {
                opacity: 0.03;
                background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
            }
            .floating-element {
                position: absolute;
                border: 1px solid rgba(139, 92, 246, 0.2);
                border-radius: 8px;
                animation: float 6s ease-in-out infinite;
            }
            .float-1 {
                width: 60px;
                height: 60px;
                top: 15%;
                left: 5%;
                animation-delay: 0s;
            }
            .float-2 {
                width: 40px;
                height: 40px;
                top: 70%;
                left: 85%;
                animation-delay: -2s;
            }
            .float-3 {
                width: 80px;
                height: 80px;
                top: 40%;
                left: 90%;
                animation-delay: -4s;
                border-radius: 50%;
            }
            .float-4 {
                width: 50px;
                height: 50px;
                top: 80%;
                left: 15%;
                animation-delay: -1s;
                transform: rotate(45deg);
            }
            @keyframes float {
                0%, 100% { transform: translateY(0) rotate(0deg); }
                50% { transform: translateY(-20px) rotate(5deg); }
            }
        `;
        document.head.appendChild(style);

        // Создаём контейнер
        const container = document.createElement('div');
        container.className = 'parallax-container theme-container';
        container.innerHTML = `
            <div class="parallax-layer parallax-gradient" data-speed="0.02"></div>
            <div class="parallax-layer parallax-shapes" data-speed="0.05">
                <div class="parallax-shape shape-1"></div>
                <div class="parallax-shape shape-2"></div>
                <div class="parallax-shape shape-3"></div>
                <div class="parallax-shape shape-4"></div>
            </div>
            <div class="parallax-layer parallax-grid" data-speed="0.03"></div>
            <div class="parallax-layer parallax-dots" data-speed="0.01"></div>
            <div class="parallax-layer" data-speed="0.04">
                <div class="floating-element float-1"></div>
                <div class="floating-element float-2"></div>
                <div class="floating-element float-3"></div>
                <div class="floating-element float-4"></div>
            </div>
            <div class="parallax-layer parallax-noise"></div>
        `;
        document.body.prepend(container);

        const layers = container.querySelectorAll('.parallax-layer[data-speed]');

        // Параллакс при движении мыши
        function handleMouse(e) {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;

            layers.forEach(layer => {
                const speed = parseFloat(layer.dataset.speed) * 100;
                layer.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
        }
        window.addEventListener('mousemove', handleMouse);

        // Параллакс при скролле
        function handleScroll() {
            const scrollY = window.scrollY;
            layers.forEach(layer => {
                const speed = parseFloat(layer.dataset.speed) * 0.5;
                layer.style.transform = `translateY(${scrollY * speed}px)`;
            });
        }
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('mousemove', handleMouse);
            window.removeEventListener('scroll', handleScroll);
            style.remove();
            container.remove();
        };
    }
};
