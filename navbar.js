/**
 * Kaukai - Unified Site Navigation & Language Switcher
 * Provides a standardized header across all pages and manages language selection.
 */
(function () {
    // Flag SVG definitions
    const FLAGS = {
        lt: `<svg class="lang-flag" viewBox="0 0 500 300" width="16" height="11" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="500" height="300" fill="#C1272D"/><rect width="500" height="200" fill="#006A44"/><rect width="500" height="100" fill="#FDB913"/></svg>`,
        en: `<svg class="lang-flag" viewBox="0 0 60 30" width="16" height="11" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="60" height="30" fill="#012169"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" stroke-width="3"/><path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/><path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/></svg>`
    };

    // Page counterpart mappings
    const PAGE_MAP = {
        index: { lt: 'index.html', en: 'index.html' },
        guide: { lt: 'gidas.html', en: 'guide.html' },
        quiz:  { lt: 'testas.html', en: 'quiz.html' },
        faq:   { lt: 'duk.html', en: 'faq.html' }
    };

    // Determine current language and directory depth
    const isEn = document.documentElement.lang === 'en' || window.location.pathname.includes('/en/');
    const currentLang = isEn ? 'en' : 'lt';

    // Determine current page key
    const rawPath = window.location.pathname;
    let fileName = rawPath.substring(rawPath.lastIndexOf('/') + 1).replace(/\.html$/, '');
    if (!fileName || fileName === 'index') fileName = 'index';

    let pageKey = 'index';
    if (fileName === 'gidas' || fileName === 'guide') pageKey = 'guide';
    else if (fileName === 'testas' || fileName === 'quiz') pageKey = 'quiz';
    else if (fileName === 'duk' || fileName === 'faq') pageKey = 'faq';

    const isIndex = (pageKey === 'index');

    // Asset and page URLs
    const logoUrl = isEn ? '../kaukai_logo_thumb.webp' : 'kaukai_logo_thumb.webp';
    const brandUrl = isIndex ? '#hero' : (isEn ? 'index.html' : 'index.html');

    // Corresponding URLs for language switching
    function getLangSwitchUrl(targetLang) {
        if (targetLang === currentLang) {
            return isEn ? PAGE_MAP[pageKey].en : PAGE_MAP[pageKey].lt;
        }
        if (targetLang === 'en') {
            // Switching from LT to EN
            return 'en/' + PAGE_MAP[pageKey].en;
        } else {
            // Switching from EN to LT
            return '../' + PAGE_MAP[pageKey].lt;
        }
    }

    // Supported languages list (expandable for future languages)
    const LANGUAGES = [
        {
            code: 'lt',
            name: 'Lietuvių',
            flag: FLAGS.lt,
            url: getLangSwitchUrl('lt')
        },
        {
            code: 'en',
            name: 'English',
            flag: FLAGS.en,
            url: getLangSwitchUrl('en')
        }
    ];

    // Navigation links data
    const navItemsLT = [
        { label: 'Apie Mus', href: isIndex ? '#apie' : 'index.html#apie' },
        { label: 'Rangai', href: isIndex ? '#rangai' : 'index.html#rangai' },
        { label: 'Taisyklės', href: isIndex ? '#taisykles' : 'index.html#taisykles' },
        { label: 'Grobis', href: isIndex ? '#grobis' : 'index.html#grobis' },
        { label: 'Gidas', href: 'gidas.html', active: pageKey === 'guide' },
        { label: 'Testas', href: 'testas.html', isHighlight: true, active: pageKey === 'quiz' },
        { label: 'D.U.K.', href: 'duk.html', active: pageKey === 'faq' }
    ];

    const navItemsEN = [
        { label: 'About Us', href: isIndex ? '#about' : 'index.html#about' },
        { label: 'Ranks', href: isIndex ? '#ranks' : 'index.html#ranks' },
        { label: 'Progression', href: isIndex ? '#progression' : 'index.html#progression' },
        { label: 'Loot', href: isIndex ? '#loot' : 'index.html#loot' },
        { label: 'Guide', href: 'guide.html', active: pageKey === 'guide' },
        { label: 'Quiz', href: 'quiz.html', isHighlight: true, active: pageKey === 'quiz' },
        { label: 'FAQ', href: 'faq.html', active: pageKey === 'faq' }
    ];

    const currentNavItems = isEn ? navItemsEN : navItemsLT;

    // Helper to generate language dropdown HTML
    function createLangDropdown(extraClass) {
        const activeLangObj = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];
        const triggerLabel = isEn ? 'Select language' : 'Pasirinkti kalbą';

        const menuItems = LANGUAGES.map(l => {
            const isActive = l.code === currentLang;
            return `
                <a href="${l.url}" class="lang-menu-item ${isActive ? 'active' : ''}" role="menuitem">
                    ${l.flag}
                    <span>${l.name}</span>
                    <span class="lang-menu-check">✓</span>
                </a>
            `;
        }).join('');

        return `
            <div class="lang-dropdown-wrapper ${extraClass}">
                <button class="lang-trigger-btn" type="button" aria-expanded="false" aria-label="${triggerLabel}">
                    ${activeLangObj.flag}
                    <span>${activeLangObj.code.toUpperCase()}</span>
                    <span class="lang-trigger-chevron">▼</span>
                </button>
                <div class="lang-menu" role="menu">
                    ${menuItems}
                </div>
            </div>
        `;
    }

    // Generate complete navigation bar HTML
    function buildNavHtml() {
        const linksHtml = currentNavItems.map(item => {
            const classes = [];
            if (item.isHighlight) classes.push('highlight-link');
            if (item.active) classes.push('active');
            const classAttr = classes.length ? `class="${classes.join(' ')}"` : '';
            return `<a href="${item.href}" ${classAttr}>${item.label}</a>`;
        }).join('\n            ');

        const menuToggleAria = isEn ? 'Open menu' : 'Atidaryti meniu';

        return `
        <nav>
            <div class="nav-container">
                <a href="${brandUrl}" class="nav-brand">
                    <img src="${logoUrl}" alt="Kaukai" class="brand-logo">
                    Kaukai
                </a>
                <div class="nav-mobile-actions">
                    ${createLangDropdown('lang-switch-mobile')}
                    <button class="menu-toggle" aria-label="${menuToggleAria}" type="button">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
            <div class="nav-links" id="navLinks">
                ${linksHtml}
                ${createLangDropdown('lang-switch-desktop')}
            </div>
        </nav>
        `;
    }

    // Attach interactivity to header elements
    function initNavEvents() {
        // Subtle expandable language dropdown
        document.querySelectorAll('.lang-dropdown-wrapper').forEach(wrapper => {
            const btn = wrapper.querySelector('.lang-trigger-btn');
            if (!btn) return;

            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpen = wrapper.classList.contains('open');
                document.querySelectorAll('.lang-dropdown-wrapper.open').forEach(w => {
                    if (w !== wrapper) {
                        w.classList.remove('open');
                        const b = w.querySelector('.lang-trigger-btn');
                        if (b) b.setAttribute('aria-expanded', 'false');
                    }
                });
                wrapper.classList.toggle('open', !isOpen);
                btn.setAttribute('aria-expanded', String(!isOpen));
            });

            // Keyboard navigation for dropdown
            wrapper.addEventListener('keydown', (e) => {
                const items = Array.from(wrapper.querySelectorAll('.lang-menu-item'));
                if (!items.length) return;
                const activeIndex = items.indexOf(document.activeElement);

                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    if (!wrapper.classList.contains('open')) {
                        wrapper.classList.add('open');
                        btn.setAttribute('aria-expanded', 'true');
                    }
                    const nextIndex = (activeIndex + 1) % items.length;
                    items[nextIndex].focus();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (!wrapper.classList.contains('open')) {
                        wrapper.classList.add('open');
                        btn.setAttribute('aria-expanded', 'true');
                    }
                    const prevIndex = (activeIndex - 1 + items.length) % items.length;
                    items[prevIndex].focus();
                }
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.lang-dropdown-wrapper')) {
                document.querySelectorAll('.lang-dropdown-wrapper.open').forEach(w => {
                    w.classList.remove('open');
                    const b = w.querySelector('.lang-trigger-btn');
                    if (b) b.setAttribute('aria-expanded', 'false');
                });
            }
        });

        // Close dropdown on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.lang-dropdown-wrapper.open').forEach(w => {
                    w.classList.remove('open');
                    const b = w.querySelector('.lang-trigger-btn');
                    if (b) {
                        b.setAttribute('aria-expanded', 'false');
                        b.focus();
                    }
                });
            }
        });

        // Mobile hamburger menu toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.getElementById('navLinks');
        if (menuToggle && navLinks) {
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpen = navLinks.classList.toggle('active');
                menuToggle.classList.toggle('active');
                menuToggle.setAttribute('aria-expanded', String(isOpen));
            });

            // Close mobile menu when clicking any nav link
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                });
            });
        }

        // Accordion exclusivity helper (for FAQ and Guide pages)
        document.querySelectorAll('.faq-item').forEach(item => {
            item.addEventListener('toggle', () => {
                if (item.open) {
                    document.querySelectorAll('.faq-item').forEach(other => {
                        if (other !== item && other.open) {
                            other.removeAttribute('open');
                        }
                    });
                }
            });
        });

        // Local environment navigation compatibility
        const isLocal = window.location.protocol === 'file:' || window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost';
        if (isLocal) {
            document.querySelectorAll('a').forEach(link => {
                let href = link.getAttribute('href');
                if (href === './') {
                    link.setAttribute('href', 'index.html');
                } else if (href === '../') {
                    link.setAttribute('href', '../index.html');
                } else if (href && !href.startsWith('http') && !href.startsWith('#') && !href.includes('.') && !href.includes('#')) {
                    link.setAttribute('href', href + '.html');
                }
            });
        }

        // Clean URL appearance in browser address bar (HTTP/HTTPS only; avoid SecurityError on file://)
        if (!isLocal && (window.location.pathname.endsWith('.html') || window.location.pathname.endsWith('index.html'))) {
            try {
                let cleanUrl = window.location.href.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
                window.history.replaceState({}, '', cleanUrl);
            } catch (e) {
                // Silently fallback if history manipulation is restricted
            }
        }
    }

    // Mount the navigation bar into the page
    function mountNav() {
        let mountEl = document.getElementById('site-header');
        if (!mountEl) {
            // Fallback: look for <header> or <nav>
            mountEl = document.querySelector('header') || document.querySelector('nav');
        }

        if (mountEl) {
            mountEl.outerHTML = buildNavHtml();
            initNavEvents();
        }
    }

    // Execute mount when DOM is ready or immediately if already loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mountNav);
    } else {
        mountNav();
    }
})();
