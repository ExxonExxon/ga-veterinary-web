import '../styles/style.css';

document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuOpen = document.getElementById('mobile-menu-open');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    // Toggle Mobile Menu with Accessibility (ARIA) support
    const toggleMenu = (isOpen) => {
        if (isOpen) {
            mobileMenu.classList.remove('translate-x-full');
            mobileMenu.setAttribute('aria-hidden', 'false');
            mobileMenuOpen.setAttribute('aria-expanded', 'true');
            document.body.classList.add('overflow-hidden'); // Prevent scrolling
            
            // Set focus to close button for keyboard users
            setTimeout(() => mobileMenuClose.focus(), 60);
        } else {
            mobileMenu.classList.add('translate-x-full');
            mobileMenu.setAttribute('aria-hidden', 'true');
            mobileMenuOpen.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('overflow-hidden');
            
            // Return focus to trigger button
            mobileMenuOpen.focus();
        }
    };

    if (mobileMenuOpen) {
        mobileMenuOpen.addEventListener('click', () => toggleMenu(true));
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', () => toggleMenu(false));
    }

    // Close menu when a link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    // Handle Contact Form via Web3Forms
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const formStatus = document.getElementById('form-status');
        const accessKeyInput = document.getElementById('access_key');
        if (accessKeyInput) {
            accessKeyInput.value = import.meta.env.VITE_WEB3FORMS_KEY || '';
        }

        const honeypot = document.getElementById('website');
        const formLoadedAt = Date.now();
        const MIN_SUBMIT_TIME = 4000;

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!import.meta.env.VITE_WEB3FORMS_KEY) {
                if (formStatus) {
                    formStatus.textContent = 'Form configuration error. Please contact the site owner.';
                    formStatus.className = 'text-red-600 text-sm font-medium mt-4 text-center lg:text-left';
                }
                return;
            }

            if (honeypot && honeypot.value.trim() !== '') {
                return;
            }

            if (Date.now() - formLoadedAt < MIN_SUBMIT_TIME) {
                if (formStatus) {
                    formStatus.textContent = 'Please wait a moment before submitting.';
                    formStatus.className = 'text-red-600 text-sm font-medium mt-4 text-center lg:text-left';
                }
                return;
            }

            if (!document.getElementById('full-name').value.trim() || !document.getElementById('email').value.trim() || !document.getElementById('message').value.trim()) {
                if (formStatus) {
                    formStatus.textContent = 'Please fill in all required fields.';
                    formStatus.className = 'text-red-600 text-sm font-medium mt-4 text-center lg:text-left';
                }
                return;
            }

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending...';
            if (formStatus) formStatus.className = '';

            document.getElementById('from_name').value = document.getElementById('full-name').value;
            document.getElementById('replyto').value = document.getElementById('email').value;

            const formData = new FormData(contactForm);
            const plainFormData = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(plainFormData)
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    submitBtn.innerHTML = 'Message Sent';
                    submitBtn.classList.remove('bg-action');
                    submitBtn.classList.add('bg-content');
                    contactForm.reset();
                    if (formStatus) {
                        formStatus.textContent = 'Thank you! Your inquiry has been sent successfully.';
                        formStatus.className = 'text-green-600 text-sm font-medium mt-4 text-center lg:text-left';
                    }
                } else {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                    const msg = result.message || 'Failed to send message. Please try again.';
                    if (formStatus) {
                        formStatus.textContent = msg;
                        formStatus.className = 'text-red-600 text-sm font-medium mt-4 text-center lg:text-left';
                    }
                }
            } catch {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                if (formStatus) {
                    formStatus.textContent = 'A network error occurred. Please try again.';
                    formStatus.className = 'text-red-600 text-sm font-medium mt-4 text-center lg:text-left';
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
