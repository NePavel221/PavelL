// Block Variants — 2 варианта About, 10 вариантов Projects
const BlockVariants = {
    current: { about: 1, projects: 1, cta: 1 },
    projectPage: 0, // Текущая страница проектов

    // Данные проектов
    allProjects: [
        { img: 'projects/vapecity-site/preview/preview.webp', icon: 'VC', title: 'VapeCity', badge: 'Коммерческий сайт', desc: 'Сайт сети из 12 магазинов: от слабого референса до дизайна, админки и production за три дня', tags: ['JavaScript', 'Python', 'Nginx'], link: 'projects/vapecity-site/' },
        { img: 'projects/tea-calendar/preview/preview.webp', icon: 'TC', title: 'Tea Calendar', badge: 'Production PWA', desc: 'Личный центр управления проектами, заметками, расходами и совместными задачами', tags: ['Next.js', 'TypeScript', 'PWA'], link: 'projects/tea-calendar/' },
        { img: 'projects/artelium/preview/preview.webp', icon: 'A', title: 'Artelium', badge: 'Production SaaS', desc: 'AI-сервис для серийной генерации, отбора и управления товарной графикой', tags: ['Node.js', 'PostgreSQL', 'AI'], link: 'projects/artelium/' },
        { img: 'projects/tg-control/preview/preview.webp', icon: 'TC', title: 'TG Control', badge: 'Облачный SaaS', desc: 'Облачный SaaS для продвижения Telegram-каналов через автоматизированные комментарии', tags: ['SaaS', 'React', 'FastAPI'], link: 'projects/tg-control/' },
        { img: 'projects/teagram/preview/preview.webp', icon: 'TG', title: 'TeaGram Desktop', badge: 'Windows-клиент', desc: 'Кастомный Telegram-клиент с приватностью, сохранением сообщений и системной интеграцией', tags: ['C++', 'Qt', 'Windows'], link: 'projects/teagram/' },
        { img: 'projects/mysterious-shop/preview/preview.jpeg', icon: '💊', title: 'Mysterious Shop', desc: 'Telegram Mini App для магазина БАДов — каталог, корзина, заказы, админка', tags: ['React', 'TypeScript', 'Node.js'], link: 'projects/mysterious-shop/' },
        { img: 'projects/gemini-voice-writer/preview/preview-optimized.jpg', icon: '🎙️', title: 'Gemini Voice Writer', desc: 'Desktop-приложение для голосового ввода с AI-транскрипцией', tags: ['Python', 'PyQt6', 'Gemini'], link: 'projects/gemini-voice-writer/' },
        { img: 'projects/telegram-spammer/preview/preview-optimized.jpg', icon: '📱', title: 'Telegram Spammer', desc: 'Автоматическая рассылка комментариев с антибан-защитой', tags: ['Python', 'Telethon', 'Web UI'], link: 'projects/telegram-spammer/' },
        { img: 'projects/totoro-bot/preview/preview-optimized.jpg', icon: '🍃', title: 'TotoroDiet', desc: 'Telegram Mini App — трекер питания с AI-анализом фото', tags: ['Python', 'Gemini', 'Supabase'], link: 'projects/totoro-bot/' },
        { img: 'projects/vapecity-app/preview/preview-optimized.jpg', icon: '💨', title: 'VapeCity App', desc: 'Telegram Mini App для сети вейп-шопов — каталог, точки продаж, бонусы', tags: ['React', 'TypeScript', 'Express'], link: 'projects/vapecity-app/' }
    ],

    getAboutHTML(subtitleClass) {
        return `
            <div class="about-hero-box glass-glow">
                <h2 class="about-main-title">Знаю боли бизнеса изнутри.<br>Работаю быстро благодаря AI.</h2>
            </div>
            <div class="subtitle-wrapper ${subtitleClass}">
                <p class="about-subtitle">Мой путь в разработку</p>
            </div>
            <div class="accordion-list effect-glass">
                <div class="accordion-item open">
                    <div class="accordion-header">
                        <span class="acc-icon">🏪</span>
                        <span class="acc-title">Был предпринимателем</span>
                        <span class="acc-arrow">▼</span>
                    </div>
                    <div class="accordion-body">
                        <ul class="acc-list">
                            <li>Пермская кофейня «7 Cups» — от открытия ИП и ремонта помещения до выхода на чистую прибыль за 8 месяцев и продажи готового бизнеса.</li>
                            <li>Продажа женской одежды на WildBerries под брендом "CuteClub" — полный цикл от анализа рынка и закупа товара на ТЯК до подсчета unit экономики/выбора фуллфилмента/настройки РК компаний и создания ТЗ для дизайна карточек.</li>
                        </ul>
                    </div>
                </div>
                <div class="accordion-item">
                    <div class="accordion-header">
                        <span class="acc-icon">📈</span>
                        <span class="acc-title">Был маркетологом</span>
                        <span class="acc-arrow">▼</span>
                    </div>
                    <div class="accordion-body">
                        <ul class="acc-list">
                            <li>Менеджер личного кабинета WildBerries для бренда косметики CosmoBeauty. Увеличили оборот с 40 до 100 млн за 1 год (настройки рекламы/планерки с отделом дизайна)</li>
                            <li>Продюсирование запуска курса «Нумерология с нуля» для Анны Козловой (создание презентации/сценарии для публикаций прогрев аудитории)</li>
                            <li>Менеджер по продажам/закупке рекламы в сети тг каналов: Увеличили аудиторию канала CrimePlanet с 80к до 300 тысяч за 1 год без внешних вложений (частичный реинвест)</li>
                        </ul>
                    </div>
                </div>
                <div class="accordion-item">
                    <div class="accordion-header">
                        <span class="acc-icon">🤖</span>
                        <span class="acc-title">Теперь AI разработчик</span>
                        <span class="acc-arrow">▼</span>
                    </div>
                    <div class="accordion-body">
                        <ul class="acc-list">
                            <li>Использую возможности ИИ Агентов и пишу код/дизайн в десятки раз быстрее, чем это делают "обычные программисты" при том же уровне качества продукта.</li>
                            <li>P.S: С моим портфолио можно ознакомиться ниже</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="arrows-section">
                <div class="arrow-triple">
                    <span class="arrow-item">↓</span>
                    <span class="arrow-item">↓</span>
                    <span class="arrow-item">↓</span>
                </div>
            </div>
        `;
    },

    getProjectCard(p, style) {
        const imgContent = p.img ? `<img src="${p.img}" alt="${p.title}">` : `<span class="proj-icon">${p.icon}</span>`;
        const tagsHtml = p.tags.map(t => `<span>${t}</span>`).join('');
        const badgeHtml = p.badge ? `<span class="project-badge">${p.badge}</span>` : '';
        return `<a href="${p.link}" class="project-card ${style}">
            <div class="project-img">${imgContent}</div>
            <div class="project-info">
                ${badgeHtml}
                <h3>${p.title}</h3>
                <p>${p.desc}</p>
                <div class="tags">${tagsHtml}</div>
            </div>
        </a>`;
    },

    getProjectsHTML(variant) {
        const style = 'style-glass';
        const start = this.projectPage * 3;
        const visible = this.allProjects.slice(start, start + 3);
        const cards = visible.map(p => this.getProjectCard(p, '')).join('');
        const maxPage = Math.ceil(this.allProjects.length / 3) - 1;
        const prevDisabled = this.projectPage === 0 ? 'disabled' : '';
        const nextDisabled = this.projectPage >= maxPage ? 'disabled' : '';

        return `
            <div class="projects-wrapper ${style}">
                <h2 class="projects-title">Мои последние работы</h2>
                <div class="projects-grid">${cards}</div>
                <div class="projects-nav">
                    <button class="nav-btn prev ${prevDisabled}" onclick="BlockVariants.prevProjects()">← Назад</button>
                    <span class="nav-dots">${this.projectPage + 1} / ${maxPage + 1}</span>
                    <button class="nav-btn next ${nextDisabled}" onclick="BlockVariants.nextProjects()">Вперёд →</button>
                </div>
            </div>
        `;
    },

    prevProjects() {
        if (this.projectPage > 0) {
            this.projectPage--;
            this.render('projects');
        }
    },

    nextProjects() {
        const maxPage = Math.ceil(this.allProjects.length / 3) - 1;
        if (this.projectPage < maxPage) {
            this.projectPage++;
            this.render('projects');
        }
    },

    about: {
        1: { subtitleClass: 'style-underline-glow' }
    },

    projects: { 1: {} },

    cta: {
        1: { html: `<div class="cta-classic"><h2>Есть идея или задача?</h2><p>Напишите — обсудим, как её реализовать. Первичная консультация бесплатная.</p><a href="https://t.me/Pavel_TeaGPT" class="btn btn-primary btn-large" target="_blank">Написать в Telegram</a></div>` }
    },

    init() {
        this.injectStyles();
        this.bindSwitchers();
        this.renderAll();
    },

    bindSwitchers() {
        document.querySelectorAll('.block-switcher').forEach(switcher => {
            const block = switcher.dataset.block;
            switcher.querySelectorAll('.switch-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    switcher.querySelectorAll('.switch-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.current[block] = parseInt(btn.dataset.variant);
                    this.render(block);
                });
            });
        });
    },

    renderAll() {
        this.render('about');
        this.render('projects');
        this.render('cta');
    },

    render(block) {
        const container = document.getElementById(block === 'cta' ? 'cta-content' : block + '-content');
        if (!container) return;

        if (block === 'about') {
            const variant = this.about[this.current.about];
            container.innerHTML = this.getAboutHTML(variant.subtitleClass);
            this.initAccordions(container);
        } else if (block === 'projects') {
            container.innerHTML = this.getProjectsHTML(this.current.projects);
        } else {
            const variant = this[block][this.current[block]];
            if (variant) container.innerHTML = variant.html;
        }
    },

    initAccordions(container) {
        container.querySelectorAll('.accordion-header').forEach(header => {
            header.addEventListener('click', () => header.parentElement.classList.toggle('open'));
        });
    },

    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `

/* ===== HERO BOX ===== */
.about-hero-box { max-width: 800px; margin: 0 auto 40px; padding: 40px 50px; border-radius: 20px; position: relative; overflow: hidden; }
.about-hero-box.glass-glow { background: rgba(139, 92, 246, 0.1); backdrop-filter: blur(20px); border: 1px solid rgba(139, 92, 246, 0.3); box-shadow: 0 0 40px rgba(139, 92, 246, 0.2), 0 0 80px rgba(139, 92, 246, 0.1), inset 0 0 60px rgba(139, 92, 246, 0.05); }
.about-hero-box.glass-glow::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 50%); animation: rotate-glow 10s linear infinite; }
@keyframes rotate-glow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.about-main-title { font-size: 2.2rem; font-weight: 700; text-align: center; line-height: 1.4; color: var(--text); margin: 0; position: relative; z-index: 2; }

/* ===== SUBTITLE ===== */
.subtitle-wrapper { text-align: center; margin-bottom: 50px; padding: 20px 0; }
.about-subtitle { margin: 0; display: inline-block; }
.style-underline-glow .about-subtitle { font-size: 1.5rem; font-weight: 600; color: var(--text); position: relative; padding-bottom: 15px; }
.style-underline-glow .about-subtitle::after { content: ''; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 150px; height: 4px; background: linear-gradient(90deg, #8b5cf6, #ec4899); border-radius: 2px; box-shadow: 0 0 15px rgba(139, 92, 246, 0.8); }
.style-minimal-line { display: flex; align-items: center; justify-content: center; gap: 20px; }
.style-minimal-line::before, .style-minimal-line::after { content: ''; width: 80px; height: 1px; background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.5), transparent); }
.style-minimal-line .about-subtitle { font-size: 1.2rem; font-weight: 500; color: var(--text-dim); text-transform: uppercase; letter-spacing: 4px; }

/* ===== ARROWS ===== */
.arrows-section { text-align: center; margin-top: 50px; padding-top: 20px; }
.arrow-triple { display: flex; justify-content: center; gap: 30px; }
.arrow-item { font-size: 2rem; color: var(--accent); animation: bounce 2s infinite; }
.arrow-item:nth-child(1) { animation-delay: 0s; }
.arrow-item:nth-child(2) { animation-delay: 0.2s; }
.arrow-item:nth-child(3) { animation-delay: 0.4s; }
@keyframes bounce { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-15px); } 60% { transform: translateY(-8px); } }

/* ===== ACCORDION ===== */
.accordion-list { max-width: 800px; margin: 0 auto; }
.effect-glass .accordion-item { background: rgba(30, 30, 40, 0.6); backdrop-filter: blur(10px); border: 1px solid rgba(139, 92, 246, 0.2); transition: all 0.3s ease; }
.effect-glass .accordion-item:hover { box-shadow: 0 0 30px rgba(139, 92, 246, 0.3); border-color: rgba(139, 92, 246, 0.5); }
.accordion-item { background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; margin-bottom: 12px; overflow: hidden; }
.accordion-header { padding: 20px; display: flex; align-items: center; gap: 15px; cursor: pointer; transition: background 0.2s; }
.accordion-header:hover { background: rgba(139, 92, 246, 0.1); }
.acc-icon { font-size: 1.5rem; }
.acc-title { flex: 1; font-weight: 600; font-size: 1.1rem; }
.acc-arrow { color: var(--text-dim); transition: transform 0.3s; }
.accordion-item.open .acc-arrow { transform: rotate(180deg); }
.accordion-body { max-height: 0; overflow: hidden; transition: max-height 0.4s ease; padding: 0 20px; }
.accordion-item.open .accordion-body { max-height: 500px; padding: 0 20px 20px; }
.acc-list { list-style: none; padding: 0; margin: 0; }
.acc-list li { position: relative; padding-left: 20px; margin-bottom: 12px; color: var(--text-dim); line-height: 1.7; }
.acc-list li::before { content: '■'; position: absolute; left: 0; color: var(--accent); }
.acc-list li:last-child { margin-bottom: 0; }

/* ===== PROJECTS BASE ===== */
.projects-wrapper { padding: 20px 0; }
.projects-title { font-size: 2.5rem; font-weight: 700; text-align: center; margin-bottom: 50px; }
.projects-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 40px; }
.project-card { background: var(--bg-dark); border-radius: 16px; border: 1px solid var(--border); overflow: hidden; text-decoration: none; color: inherit; transition: all 0.3s; }
.project-card:hover { border-color: var(--accent); transform: translateY(-4px); }
.project-img { height: 180px; background: var(--bg-card); display: flex; align-items: center; justify-content: center; overflow: hidden; }
.project-img img { width: 100%; height: 100%; object-fit: cover; }
.proj-icon { font-size: 3rem; }
.project-info { padding: 20px; }
.project-badge { display: inline-flex; margin-bottom: 10px; padding: 5px 9px; border: 1px solid rgba(139, 92, 246, 0.32); border-radius: 6px; background: rgba(139, 92, 246, 0.1); color: #c4b5fd; font: 600 0.68rem/1 "Inter", sans-serif; letter-spacing: 0.04em; text-transform: uppercase; }
.project-info h3 { font-size: 1.1rem; margin-bottom: 8px; }
.project-info p { color: var(--text-dim); font-size: 0.9rem; margin-bottom: 12px; }
.tags { display: flex; gap: 6px; flex-wrap: wrap; }
.tags span { padding: 4px 10px; background: rgba(139, 92, 246, 0.15); border-radius: 6px; font-size: 0.75rem; color: var(--accent); }

/* ===== PROJECTS NAV ===== */
.projects-nav { display: flex; justify-content: center; align-items: center; gap: 30px; }
.nav-btn { padding: 12px 24px; background: rgba(139, 92, 246, 0.2); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 30px; color: var(--text); font-size: 0.95rem; cursor: pointer; transition: all 0.3s; }
.nav-btn:hover:not(.disabled) { background: rgba(139, 92, 246, 0.4); border-color: var(--accent); }
.nav-btn.disabled { opacity: 0.3; cursor: not-allowed; }
.nav-dots { color: var(--text-dim); font-size: 0.9rem; }

/* ===== PROJECTS VARIANT 1: Default ===== */
/* Already styled above */

/* ===== PROJECTS VARIANT 2: Neon ===== */
.style-neon .projects-title { text-shadow: 0 0 20px rgba(139, 92, 246, 0.8), 0 0 40px rgba(139, 92, 246, 0.4); }
.style-neon .project-card { border: 2px solid #8b5cf6; box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
.style-neon .project-card:hover { box-shadow: 0 0 40px rgba(139, 92, 246, 0.6); }

/* ===== PROJECTS VARIANT 3: Glass ===== */
.style-glass .project-card { background: rgba(30, 30, 40, 0.5); backdrop-filter: blur(15px); border: 1px solid rgba(255, 255, 255, 0.1); }
.style-glass .project-img { background: rgba(139, 92, 246, 0.1); }

/* ===== PROJECTS VARIANT 4: Gradient ===== */
.style-gradient .projects-title { background: linear-gradient(135deg, #8b5cf6, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.style-gradient .project-card { background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1)); }
.style-gradient .project-card:hover { background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2)); }

/* ===== PROJECTS VARIANT 5: Minimal ===== */
.style-minimal .projects-title { font-size: 1.8rem; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; }
.style-minimal .project-card { border-radius: 4px; border: none; border-bottom: 2px solid var(--border); }
.style-minimal .project-card:hover { border-bottom-color: var(--accent); }

/* ===== PROJECTS VARIANT 6: 3D Cards ===== */
.style-cards-3d .project-card { transform: perspective(1000px) rotateX(2deg); transition: all 0.4s; }
.style-cards-3d .project-card:hover { transform: perspective(1000px) rotateX(0deg) translateY(-10px); box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4); }

/* ===== PROJECTS VARIANT 7: Cyber ===== */
.style-cyber .projects-title { color: #00ff88; text-shadow: 0 0 10px rgba(0, 255, 136, 0.5); }
.style-cyber .project-card { border: 1px solid #00ff88; background: rgba(0, 255, 136, 0.05); }
.style-cyber .project-card::before { content: ''; position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: #00ff88; }
.style-cyber .tags span { background: rgba(0, 255, 136, 0.2); color: #00ff88; }

/* ===== PROJECTS VARIANT 8: Glow ===== */
.style-glow .project-card { box-shadow: 0 0 30px rgba(139, 92, 246, 0.2); }
.style-glow .project-card:hover { box-shadow: 0 0 50px rgba(139, 92, 246, 0.4), 0 0 100px rgba(139, 92, 246, 0.2); }
.style-glow .project-img { box-shadow: inset 0 0 30px rgba(139, 92, 246, 0.3); }

/* ===== PROJECTS VARIANT 9: Outline ===== */
.style-outline .projects-title { color: transparent; -webkit-text-stroke: 2px var(--accent); font-size: 3rem; }
.style-outline .project-card { background: transparent; border: 2px solid var(--border); }
.style-outline .project-card:hover { border-color: var(--accent); background: rgba(139, 92, 246, 0.05); }

/* ===== PROJECTS VARIANT 10: Retro ===== */
.style-retro .projects-title { color: #fbbf24; text-shadow: 4px 4px 0 #8b5cf6; font-size: 2.8rem; }
.style-retro .project-card { border: 3px solid var(--text); border-radius: 0; box-shadow: 6px 6px 0 var(--accent); }
.style-retro .project-card:hover { box-shadow: 8px 8px 0 var(--accent); transform: translate(-2px, -2px); }

/* ===== SWITCHER ===== */
.block-switcher { position: fixed; right: 20px; z-index: 100; display: flex; align-items: center; gap: 6px; background: rgba(18, 18, 26, 0.95); backdrop-filter: blur(10px); padding: 8px 12px; border-radius: 30px; border: 1px solid rgba(139, 92, 246, 0.3); box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); flex-wrap: wrap; max-width: 180px; justify-content: center; }
.block-switcher[data-block="about"] { top: 25%; }
.block-switcher[data-block="projects"] { top: 50%; }
.block-switcher[data-block="cta"] { top: 75%; }
.switcher-label { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #71717a; width: 100%; text-align: center; margin-bottom: 4px; }
.switch-btn { width: 26px; height: 26px; border: none; border-radius: 6px; background: rgba(39, 39, 42, 0.8); color: #a1a1aa; font-size: 11px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
.switch-btn:hover { background: rgba(139, 92, 246, 0.3); color: #fff; }
.switch-btn.active { background: #8b5cf6; color: #fff; }

/* ===== BLOCKS ===== */
.block-about, .block-projects, .block-cta { padding: 80px 0; }
.block-about { background: var(--bg-dark); }
.block-projects { background: var(--bg-card); }
.block-cta { background: linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(236, 72, 153, 0.1) 100%); padding: 60px 0; }

/* ===== CTA ===== */
.cta-classic { text-align: center; max-width: 600px; margin: 0 auto; }
.cta-classic h2 { font-size: 2rem; margin-bottom: 16px; }
.cta-classic p { color: var(--text-dim); font-size: 1.1rem; margin-bottom: 28px; }
.cta-benefits { text-align: center; max-width: 600px; margin: 0 auto; }
.cta-benefits h2 { font-size: 2rem; margin-bottom: 24px; }
.cta-points { display: flex; justify-content: center; gap: 30px; margin-bottom: 28px; flex-wrap: wrap; }
.cta-point { color: #22c55e; font-size: 0.95rem; }
.cta-minimal { text-align: center; padding: 40px 0; }
.cta-big { font-size: 1.8rem; font-weight: 600; margin-bottom: 20px; }
.cta-link { font-size: 1.5rem; color: var(--accent); text-decoration: none; font-weight: 600; transition: all 0.2s; }
.cta-link:hover { color: var(--accent-hover); }

/* ===== RESPONSIVE ===== */
@media (max-width: 900px) {
    .projects-grid { grid-template-columns: 1fr; }
    .about-hero-box { padding: 30px; margin-bottom: 30px; }
    .about-main-title { font-size: 1.8rem; }
    .block-switcher { right: 10px; padding: 6px 8px; max-width: 150px; }
    .switch-btn { width: 22px; height: 22px; font-size: 10px; }
    .projects-nav { gap: 15px; }
    .nav-btn { padding: 10px 18px; font-size: 0.85rem; }
}
@media (max-width: 600px) {
    .about-main-title { font-size: 1.5rem; }
    .about-hero-box { padding: 25px 20px; }
    .arrow-triple { gap: 20px; }
    .subtitle-wrapper { margin-bottom: 40px; }
    .projects-title { font-size: 1.8rem; }
}
        `;
        document.head.appendChild(style);
    }
};

document.addEventListener('DOMContentLoaded', () => BlockVariants.init());
