import '../styles/style.css';

document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuOpen = document.getElementById('mobile-menu-open');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    let isMenuOpen = false;

    const focusableSelector = 'a[href]:not([inert]), button:not([disabled]):not([inert]), [tabindex]:not([tabindex="-1"]):not([inert])';

    const getMenuFocusables = () => {
        return Array.from(mobileMenu.querySelectorAll(focusableSelector));
    };

    const trapFocus = (e) => {
        if (!isMenuOpen || e.key !== 'Tab') return;
        const focusables = getMenuFocusables();
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    };

    const handleEscape = (e) => {
        if (isMenuOpen && e.key === 'Escape') {
            toggleMenu(false);
        }
    };

    const onBackdropClick = (e) => {
        if (e.target === mobileMenu) {
            toggleMenu(false);
        }
    };

    // Toggle Mobile Menu with Accessibility (ARIA) support
    const toggleMenu = (isOpen) => {
        isMenuOpen = isOpen;
        if (isOpen) {
            mobileMenu.classList.remove('translate-x-full');
            mobileMenu.setAttribute('aria-hidden', 'false');
            mobileMenu.removeAttribute('inert');
            mobileMenuOpen.setAttribute('aria-expanded', 'true');
            document.body.classList.add('overflow-hidden');

            setTimeout(() => mobileMenuClose.focus(), 60);
        } else {
            mobileMenu.classList.add('translate-x-full');
            mobileMenu.setAttribute('aria-hidden', 'true');
            mobileMenu.setAttribute('inert', '');
            mobileMenuOpen.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('overflow-hidden');

            mobileMenuOpen.focus();
        }
    };

    if (mobileMenuOpen) {
        mobileMenuOpen.addEventListener('click', () => toggleMenu(true));
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', () => toggleMenu(false));
    }

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', trapFocus);
    mobileMenu.addEventListener('click', onBackdropClick);

    // Handle Contact Form via Netlify Forms
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const formStatus = document.getElementById('form-status');
        const honeypot = document.getElementById('website');

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (honeypot && honeypot.value.trim() !== '') {
                return;
            }

            if (!document.getElementById('full-name').value.trim() || !document.getElementById('email').value.trim() || !document.getElementById('message').value.trim()) {
                if (formStatus) {
                    formStatus.textContent = 'Please fill in all required fields.';
                    formStatus.className = 'form-status form-error';
                }
                return;
            }

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnHTML = submitBtn.innerHTML;
            const originalBtnClasses = submitBtn.className;

            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending...';
            if (formStatus) formStatus.className = '';

            try {
                const formData = new FormData(contactForm);
                const response = await fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams(formData).toString()
                });

                if (response.ok) {
                    contactForm.reset();
                    submitBtn.classList.add('bg-content');
                    submitBtn.classList.remove('bg-action', 'hover:bg-primary');
                    submitBtn.innerHTML = 'Message Sent';

                    if (formStatus) {
                        formStatus.textContent = 'Thank you! Your inquiry has been sent successfully.';
                        formStatus.className = 'form-status form-success';
                    }

                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnHTML;
                        submitBtn.className = originalBtnClasses;
                    }, 4000);
                } else {
                    throw new Error('Bad response');
                }
            } catch {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHTML;
                if (formStatus) {
                    formStatus.textContent = 'A network error occurred. Please try again.';
                    formStatus.className = 'form-status form-error';
                }
            }
        });
    }

    const setActiveNav = () => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.desktop-nav-link, .mobile-nav-link');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.add('active-nav');
                link.setAttribute('aria-current', 'page');
            }
        });
        if (currentPage === 'index.html' || currentPage === '' || currentPage === '/') {
            const homeLink = document.querySelector('.nav-logo')?.closest('a');
            if (homeLink) {
                homeLink.classList.add('active-nav');
            }
        }
    };
    setActiveNav();

    // Update Copyright Year
    const yearElement = document.getElementById('copyright-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Liquid Glass Header Scroll Effect
    const header = document.getElementById('main-header');
    const navContainer = document.getElementById('nav-container');
    
    let ticking = false;
    const updateHeader = () => {
        const scrollY = window.scrollY;

        if (scrollY > 80) {
            header.classList.add('bg-page/90', 'border-white/10', 'shadow-lg', 'shadow-black/5', 'scrolled');
            header.classList.remove('border-transparent');
            navContainer.classList.remove('py-5', 'md:py-8');
            navContainer.classList.add('py-4');
        } else {
            header.classList.remove('bg-page/90', 'border-white/10', 'shadow-lg', 'shadow-black/5', 'scrolled');
            header.classList.add('border-transparent');
            navContainer.classList.remove('py-4');
            navContainer.classList.add('py-5', 'md:py-8');
        }
    };

    const onScroll = () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateHeader();
                ticking = false;
            });
            ticking = true;
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateHeader, { passive: true });
    updateHeader(); // Run on init

});

    // Lightbox: click any project image to enlarge it
    const lightboxImages = document.querySelectorAll('img[data-lightbox]');
    if (lightboxImages.length > 0) {
        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-label', 'Image viewer');
        overlay.innerHTML = `
            <div class="lightbox-figure">
                <img class="lightbox-img" src="" alt="">
                <button class="lightbox-close" aria-label="Close image viewer">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <p class="lightbox-caption"></p>
            </div>`;
        document.body.appendChild(overlay);

        const overlayImg = overlay.querySelector('.lightbox-img');
        const caption = overlay.querySelector('.lightbox-caption');
        const closeBtn = overlay.querySelector('.lightbox-close');
        let lastFocused = null;

        const openLightbox = (imgEl) => {
            lastFocused = document.activeElement;
            overlayImg.src = imgEl.currentSrc || imgEl.src;
            overlayImg.alt = imgEl.alt;
            caption.textContent = imgEl.alt;
            overlay.classList.add('open');
            document.body.classList.add('overflow-hidden');
            closeBtn.focus();
        };

        const closeLightbox = () => {
            overlay.classList.remove('open');
            document.body.classList.remove('overflow-hidden');
            overlayImg.removeAttribute('src');
            if (lastFocused) lastFocused.focus();
        };

        lightboxImages.forEach((imgEl) => {
            imgEl.setAttribute('tabindex', '0');
            imgEl.setAttribute('role', 'button');
            imgEl.setAttribute('aria-haspopup', 'dialog');
            imgEl.addEventListener('click', () => openLightbox(imgEl));
            imgEl.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(imgEl);
                }
            });
        });

        closeBtn.addEventListener('click', closeLightbox);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeLightbox();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay.classList.contains('open')) {
                closeLightbox();
            }
        });
    }
