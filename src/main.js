import './style.css';

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

    // Handle Contact Form with reCAPTCHA v3
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Set Loading State
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying Security...
            `;
            
            // Execute reCAPTCHA v3
            if (typeof grecaptcha !== 'undefined') {
                grecaptcha.ready(() => {
                    grecaptcha.execute('6Lfm4OMsAAAAAIYqAqeHPeLPHPDnHVy-9zOKoq5E', {action: 'submit'}).then((token) => {
                        // Add the token to the hidden input
                        document.getElementById('g-recaptcha-response').value = token;
                        
                        console.log('reCAPTCHA Token generated:', token);
                        
                        // Final state
                        submitBtn.innerHTML = 'Message Sent';
                        submitBtn.classList.remove('bg-action');
                        submitBtn.classList.add('bg-content');
                        
                        // If using a service, uncomment below:
                        // contactForm.submit();
                        
                        alert('Thank you! Your inquiry has been sent for verification.');
                    }).catch(err => {
                        console.error('reCAPTCHA Error:', err);
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnText;
                        alert('Verification failed. Please try again.');
                    });
                });
            } else {
                console.warn('reCAPTCHA not loaded.');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
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
    const heroBg = document.getElementById('hero-bg');
    
    const updateHeader = () => {
        const isMobile = window.innerWidth < 768;
        const scrollY = window.scrollY;

        if (scrollY > 20 || isMobile) {
            header.classList.add('bg-base/90', 'backdrop-blur-xl', 'border-primary/10', 'shadow-lg', 'shadow-primary/5');
            header.classList.remove('border-transparent');
            navContainer.classList.remove('py-6', 'md:py-10');
            navContainer.classList.add('py-4');
        } else {
            header.classList.remove('bg-base/90', 'backdrop-blur-xl', 'border-primary/10', 'shadow-lg', 'shadow-primary/5');
            header.classList.add('border-transparent');
            navContainer.classList.remove('py-4');
            navContainer.classList.add('py-6', 'md:py-10');
        }

        // Dynamic Hero Blur Effect (Experiment)
        if (heroBg) {
            // Calculate blur: starts at 1px, reaches 4px after 400px of scrolling
            const maxScroll = 400;
            const startBlur = 1;
            const extraBlur = 3;
            const currentBlur = startBlur + Math.min(extraBlur, (scrollY / maxScroll) * extraBlur);
            heroBg.style.filter = `blur(${currentBlur}px)`;
        }
    };

    window.addEventListener('scroll', updateHeader, { passive: true });
    window.addEventListener('resize', updateHeader, { passive: true });
    updateHeader(); // Run on init

    console.log('GA Medical Veterinary site initialized with full accessibility support.');
});
