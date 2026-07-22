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
        const isMobile = window.innerWidth < 768;
        const scrollY = window.scrollY;

        if (scrollY > 20 || isMobile) {
            header.classList.add('bg-page/90', 'border-white/10', 'shadow-lg', 'shadow-black/5');
            header.classList.remove('border-transparent');
            navContainer.classList.remove('py-6', 'md:py-10');
            navContainer.classList.add('py-4');
        } else {
            header.classList.remove('bg-page/90', 'border-white/10', 'shadow-lg', 'shadow-black/5');
            header.classList.add('border-transparent');
            navContainer.classList.remove('py-4');
            navContainer.classList.add('py-6', 'md:py-10');
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
