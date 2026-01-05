/**
 * TAXI ST-PACÔME - JavaScript
 * Enhances the taxi animation and adds interactivity
 */

document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // TAXI HORN SOUND EFFECT (Optional - user triggered)
    // ============================================
    const taxi = document.querySelector('.taxi');

    // Add click interaction to taxi - makes it honk
    if (taxi) {
        taxi.style.cursor = 'pointer';
        taxi.title = "Cliquez pour klaxonner !"; // Tooltip for discoverability
        taxi.addEventListener('click', function () {
            // Visual feedback - taxi jumps
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'taxiBounce 0.3s ease-in-out infinite, taxiHonk 0.3s ease';
            }, 10);

            // Reset after honk animation
            setTimeout(() => {
                this.style.animation = 'taxiBounce 0.3s ease-in-out infinite';
            }, 300);
        });
    }

    // ============================================
    // ADD HONK ANIMATION
    // ============================================
    const style = document.createElement('style');
    style.textContent = `
        @keyframes taxiHonk {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-10px) scale(1.05); }
        }
    `;
    document.head.appendChild(style);

    // ============================================
    // PHONE BUTTON RIPPLE EFFECT
    // ============================================
    const phoneButtons = document.querySelectorAll('.phone-button, .cta-button');

    phoneButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.4)';
            ripple.style.width = '100px';
            ripple.style.height = '100px';
            ripple.style.transform = 'translate(-50%, -50%) scale(0)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.pointerEvents = 'none';

            // Position ripple at click point
            const rect = button.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top = (e.clientY - rect.top) + 'px';

            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);

            // Remove ripple after animation
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple keyframes if not exists
    if (!document.querySelector('#ripple-styles')) {
        const rippleStyle = document.createElement('style');
        rippleStyle.id = 'ripple-styles';
        rippleStyle.textContent = `
            @keyframes ripple {
                to {
                    transform: translate(-50%, -50%) scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);
    }

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ============================================
    // SERVICE CARDS ANIMATION ON SCROLL
    // ============================================
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // ============================================
    // RANDOM TAXI SPEED VARIATION
    // ============================================
    function randomizeTaxiSpeed() {
        const taxiContainer = document.querySelector('.taxi-container');
        if (taxiContainer) {
            // Random duration between 8-12 seconds
            const randomDuration = 8 + Math.random() * 4;
            taxiContainer.style.animationDuration = randomDuration + 's';
        }
    }

    // Randomize speed on page load and after each cycle
    randomizeTaxiSpeed();
    setInterval(randomizeTaxiSpeed, 12000);

    // ============================================
    // UPDATE TIME-BASED GREETING (Optional enhancement)
    // ============================================
    function updateTimeBasedMessage() {
        const hour = new Date().getHours();
        let greeting = 'Besoin d\'un taxi?';

        if (hour >= 5 && hour < 12) {
            greeting = 'Bonjour! Besoin d\'un taxi?';
        } else if (hour >= 12 && hour < 18) {
            greeting = 'Bonne après-midi! Besoin d\'un taxi?';
        } else if (hour >= 18 && hour < 22) {
            greeting = 'Bonne soirée! Besoin d\'un taxi?';
        } else {
            greeting = 'Bonne nuit! Taxi disponible 24/7';
        }

        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.textContent = greeting;
        }
    }

    // Uncomment to enable time-based greeting:
    updateTimeBasedMessage();

    // ============================================
    // DETECT MOBILE DEVICE FOR ENHANCED MOBILE EXPERIENCE
    // ============================================
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    if (isMobileDevice()) {
        // On mobile, ensure smooth touch interactions
        document.body.style.touchAction = 'manipulation';
    }

    // ============================================
    // CONSOLE MESSAGE FOR DEVELOPERS
    // ============================================
    console.log('%c🚕 Taxi St-Pacôme', 'font-size: 20px; font-weight: bold; color: #FFD700; background: #000; padding: 10px;');
    console.log('%cSite web créé pour Taxi St-Pacôme - Saint-Pacôme, Québec', 'font-size: 12px; color: #333;');
});
