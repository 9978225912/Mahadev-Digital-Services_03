document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Navigation Toggle ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('toggle');
    });

    // Close mobile nav when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                burger.classList.remove('toggle');
            }
        });
    });

    // --- Modal functionality for Privacy Policy and Terms of Service ---
    const privacyPolicyLink = document.getElementById('privacy-policy-link');
    const termsOfServiceLink = document.getElementById('terms-of-service-link');
    const privacyPolicyModal = document.getElementById('privacy-policy-modal');
    const termsOfServiceModal = document.getElementById('terms-of-service-modal');

    // Get all close buttons for modals
    const closeButtons = document.querySelectorAll('.modal .close-button');

    privacyPolicyLink.addEventListener('click', (e) => {
        e.preventDefault();
        privacyPolicyModal.style.display = 'flex'; // Show using flex for centering
    });

    termsOfServiceLink.addEventListener('click', (e) => {
        e.preventDefault();
        termsOfServiceModal.style.display = 'flex'; // Show using flex for centering
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal').style.display = 'none'; // Hide the parent modal
        });
    });

    // Close modal when clicking outside of the modal content
    window.addEventListener('click', (event) => {
        if (event.target === privacyPolicyModal) {
            privacyPolicyModal.style.display = 'none';
        }
        if (event.target === termsOfServiceModal) {
            termsOfServiceModal.style.display = 'none';
        }
    });

    // --- Smooth scrolling for navigation links ---
    // This is already built-in with scroll-behavior: smooth; in CSS,
    // but this JS adds fallback/explicit behavior if needed for older browsers or specific offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start' // Scroll to the top of the element
                });
            }
        });
    });

    // --- Scroll Reveal Animation using Intersection Observer ---
    const sections = document.querySelectorAll('section');

    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal'); // Add 'reveal' class to trigger CSS animation
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null, // viewport
        threshold: 0.15, // Trigger when 15% of the section is visible
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Initial check for hero section (already visible)
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        // Force the animations for the hero section to start on load
        heroContent.style.opacity = 1; // Base opacity for the container
        // CSS animations are already set up with forwards, so just ensure content is observed or directly activated
        // For simple elements in hero, JS can trigger directly or rely on CSS animations
        // No need for observer on hero if it's always visible from start and animates on load
    }
});