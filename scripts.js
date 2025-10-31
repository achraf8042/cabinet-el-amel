// Hide preloader when page is loaded
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('hidden');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Initialize AOS (Animate On Scroll)
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                } else {
                    navbarCollapse.classList.remove('show');
                }
            }
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrollTop = document.getElementById('scrollTop');
    
    // Navbar shadow effect
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.style.boxShadow = '0 5px 30px rgba(0,0,0,0.2)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        }
    }
    
    // Show/hide scroll to top button
    if (scrollTop) {
        if (window.scrollY > 300) {
            scrollTop.classList.add('show');
        } else {
            scrollTop.classList.remove('show');
        }
    }
});

// Scroll to top functionality
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// WhatsApp functionality
const whatsappBtn = document.getElementById('whatsappBtn');
if (whatsappBtn) {
    whatsappBtn.addEventListener('click', function() {
        const phoneNumber = '213555070702'; // Country code included
        const message = encodeURIComponent('Bonjour, je souhaite prendre un rendez-vous.');
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    });
}

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Animation for service cards on hover (enhanced)
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Phone number click tracking (for analytics)
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function() {
        console.log('Phone call initiated:', this.href);
        // Add your analytics tracking code here
        // Example: gtag('event', 'phone_call', { phone_number: this.href });
    });
});

// Email click tracking (for analytics)
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', function() {
        console.log('Email initiated:', this.href);
        // Add your analytics tracking code here
        // Example: gtag('event', 'email_click', { email: this.href });
    });
});

// Appointment form submission
const appointmentForm = document.getElementById('appointmentForm');
if (appointmentForm) {
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: this.querySelector('input[type="text"]').value,
            phone: this.querySelector('input[type="tel"]').value,
            email: this.querySelector('input[type="email"]').value,
            service: this.querySelector('select').value,
            message: this.querySelector('textarea').value
        };
        
        // Validate form data
        if (!formData.name || !formData.phone || !formData.email || !formData.service) {
            showAlert('Veuillez remplir tous les champs obligatoires.', 'danger');
            return;
        }
        
        // Here you would normally send the form data to a server
        console.log('Appointment request:', formData);
        
        // For now, we'll send via WhatsApp as fallback
        const whatsappMessage = `
Nouvelle demande de rendez-vous:
- Nom: ${formData.name}
- Téléphone: ${formData.phone}
- Email: ${formData.email}
- Service: ${formData.service}
- Message: ${formData.message || 'Aucun'}
        `.trim();
        
        const phoneNumber = '213555070702';
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
        
        // Show success message
        showAlert('Votre demande de rendez-vous a été envoyée avec succès. Nous vous contacterons prochainement pour confirmation.', 'success');
        
        // Reset form
        this.reset();
    });
}

// Helper function to show alerts
function showAlert(message, type = 'success') {
    const formContainer = document.querySelector('.appointment-form');
    if (!formContainer) return;
    
    // Remove existing alerts
    const existingAlert = formContainer.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Create new alert
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show mt-3`;
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    formContainer.appendChild(alertDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (alertDiv && alertDiv.parentElement) {
            alertDiv.remove();
        }
    }, 5000);
}

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
        const animate = () => {
            const value = +counter.getAttribute('data-target');
            const data = +counter.innerText.replace(/\D/g, '');
            const time = value / speed;
            
            if (data < value) {
                counter.innerText = Math.ceil(data + time).toLocaleString() + (counter.innerText.includes('+') ? '+' : '');
                setTimeout(animate, 1);
            } else {
                counter.innerText = value.toLocaleString() + (counter.innerText.includes('+') ? '+' : '');
            }
        };
        
        // Set target value
        const finalValue = +counter.innerText.replace(/\D/g, '');
        counter.setAttribute('data-target', finalValue);
        
        // Reset counter to 0
        counter.innerText = '0' + (counter.innerText.includes('+') ? '+' : '');
        
        // Start animation when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animate();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// Initialize counter animation
animateCounters();

// Prevent multiple form submissions
let formSubmitting = false;
if (appointmentForm) {
    appointmentForm.addEventListener('submit', function(e) {
        if (formSubmitting) {
            e.preventDefault();
            return false;
        }
        formSubmitting = true;
        
        setTimeout(() => {
            formSubmitting = false;
        }, 3000);
    });
}

// Lazy load images (if you add real images later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Handle navbar collapse on window resize
let windowWidth = window.innerWidth;
window.addEventListener('resize', function() {
    if (window.innerWidth !== windowWidth) {
        windowWidth = window.innerWidth;
        
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && window.innerWidth >= 992 && navbarCollapse.classList.contains('show')) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) {
                bsCollapse.hide();
            }
        }
    }
});

// Add smooth reveal animation to elements
function revealOnScroll() {
    const reveals = document.querySelectorAll('[data-aos]');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('aos-animate');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Prevent zoom on mobile double tap
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Console welcome message
console.log('%c Cabinet Dentaire El Amel ', 'background: #17a2b8; color: white; font-size: 20px; padding: 10px; font-weight: bold;');
console.log('%c L\'espoir de sourire ', 'background: #ffc107; color: #2c3e50; font-size: 16px; padding: 5px; font-weight: bold;');
console.log('%c Développé avec ❤️ pour votre sourire ', 'color: #17a2b8; font-size: 12px;');

// Accessibility: Skip to main content
const skipLink = document.createElement('a');
skipLink.href = '#home';
skipLink.className = 'skip-link';
skipLink.textContent = 'Aller au contenu principal';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: #17a2b8;
    color: white;
    padding: 8px;
    text-decoration: none;
    z-index: 100;
`;
skipLink.addEventListener('focus', function() {
    this.style.top = '0';
});
skipLink.addEventListener('blur', function() {
    this.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);

// Performance: Report page load time
window.addEventListener('load', function() {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`Page fully loaded in ${pageLoadTime}ms`);
});