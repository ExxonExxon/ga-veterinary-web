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
            setTimeout(() => mobileMenuClose.focus(), 100);
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

    // Update Copyright Year
    const yearElement = document.getElementById('copyright-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    console.log('GA Medical Veterinary site initialized with full accessibility support.');
});
