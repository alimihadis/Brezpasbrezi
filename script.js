// Enhanced JavaScript for BREZ PAS BREZI Website

document.addEventListener('DOMContentLoaded', function() {
    // Preloader functionality
    const preloader = document.getElementById('preloader');
    const body = document.body;
    
    // Add preloading class to body
    body.classList.add('preloading');
    
    // Simulate loading time (3 seconds)
    setTimeout(() => {
        // Hide preloader
        preloader.classList.add('fade-out');
        
        // Remove preloading class and add loaded class
        body.classList.remove('preloading');
        body.classList.add('loaded');
        
        // Remove preloader from DOM after animation
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
        
        // Initialize all other functionality after preloader
        initializeWebsite();
    }, 3000);
    
    function initializeWebsite() {
        // Mobile Menu Toggle
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function() {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                
                // Prevent body scroll when menu is open
                if (navMenu.classList.contains('active')) {
                    body.style.overflow = 'hidden';
                } else {
                    body.style.overflow = '';
                }
            });
        }

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (hamburger && navMenu) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    body.style.overflow = '';
                }
            });
        });

        // Header Scroll Effect
        const header = document.querySelector('.header');
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add scrolled class to header
            if (scrollTop > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Hide/show header on scroll
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });

        // Smooth Scrolling for Navigation Links
        const navLinksWithHash = document.querySelectorAll('a[href^="#"]');
        navLinksWithHash.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // CTA Button Animation
        const ctaButton = document.querySelector('.cta-button');
        if (ctaButton) {
            ctaButton.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-6px) scale(1.05)';
            });
            
            ctaButton.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
            
            ctaButton.addEventListener('click', function(e) {
                // Create ripple effect
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        }

        // Scroll-Triggered Animations
        const animatedElements = document.querySelectorAll('.hero-section, .about-section, .dancers-section, .performers-section, .contact-section, .gallery-section, .services-section, .testimonials-section, .statistics-section, .faq-section, .blog-section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Animate child elements with stagger
                    const children = entry.target.querySelectorAll('.hero-text, .hero-image, .about-text, .about-image, .dancers-text, .dancers-image, .performers-text, .performers-image, .contact-info, .contact-form');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animate-child');
                        }, index * 200);
                    });
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(50px)';
            element.style.transition = 'all 0.8s ease-out';
            observer.observe(element);
        });

        // Dropdown Menu Functionality
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const dropdownMenu = dropdown.querySelector('.dropdown-menu');
            
            // Desktop hover
            dropdown.addEventListener('mouseenter', () => {
                dropdownMenu.style.opacity = '1';
                dropdownMenu.style.visibility = 'visible';
                dropdownMenu.style.transform = 'translateY(0) scale(1)';
            });
            
            dropdown.addEventListener('mouseleave', () => {
                dropdownMenu.style.opacity = '0';
                dropdownMenu.style.visibility = 'hidden';
                dropdownMenu.style.transform = 'translateY(-15px) scale(0.95)';
            });
            
            // Mobile touch
            dropdown.addEventListener('touchstart', (e) => {
                e.preventDefault();
                const isOpen = dropdownMenu.style.opacity === '1';
                
                if (isOpen) {
                    dropdownMenu.style.opacity = '0';
                    dropdownMenu.style.visibility = 'hidden';
                    dropdownMenu.style.transform = 'translateY(-15px) scale(0.95)';
                } else {
                    dropdownMenu.style.opacity = '1';
                    dropdownMenu.style.visibility = 'visible';
                    dropdownMenu.style.transform = 'translateY(0) scale(1)';
                }
            });
        });

        // Image Hover Effects
        const images = document.querySelectorAll('.real-image, .hero-img');
        images.forEach(img => {
            img.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.08) rotate(3deg)';
                this.style.boxShadow = '0 30px 80px rgba(0, 0, 0, 0.4)';
            });
            
            img.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
                this.style.boxShadow = '';
            });
        });

        // Parallax Effect for Hero Section
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                heroSection.style.transform = `translateY(${rate}px)`;
            });
        }

        // Loading Animation for Logo
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.style.opacity = '0';
            logo.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                logo.style.transition = 'all 0.8s ease-out';
                logo.style.opacity = '1';
                logo.style.transform = 'scale(1)';
            }, 500);
        }

        // Enhanced Accessibility Features
        const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
        focusableElements.forEach(element => {
            element.addEventListener('focus', function() {
                this.style.outline = '2px solid #d32f2f';
                this.style.outlineOffset = '2px';
            });
            
            element.addEventListener('blur', function() {
                this.style.outline = '';
            });
        });

        // Keyboard Navigation for Dropdowns
        dropdowns.forEach(dropdown => {
            const dropdownToggle = dropdown.querySelector('.nav-link');
            const dropdownMenu = dropdown.querySelector('.dropdown-menu');
            
            dropdownToggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const isOpen = dropdownMenu.style.opacity === '1';
                    
                    if (isOpen) {
                        dropdownMenu.style.opacity = '0';
                        dropdownMenu.style.visibility = 'hidden';
                        dropdownMenu.style.transform = 'translateY(-15px) scale(0.95)';
                    } else {
                        dropdownMenu.style.opacity = '1';
                        dropdownMenu.style.visibility = 'visible';
                        dropdownMenu.style.transform = 'translateY(0) scale(1)';
                    }
                }
            });
        });

        // Enhanced Performance: Throttle scroll events
        let ticking = false;
        function updateOnScroll() {
            // Scroll-based animations here
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateOnScroll);
                ticking = true;
            }
        });

        // Gallery Filter Functionality
        const filterButtons = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');

                const filter = this.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeInUp 0.6s ease-out';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });

        // Service Button Functionality
        const serviceButtons = document.querySelectorAll('.service-btn');
        serviceButtons.forEach(button => {
            button.addEventListener('click', function() {
                const serviceName = this.closest('.service-card').querySelector('h3').textContent;
                const servicePrice = this.closest('.service-card').querySelector('.price').textContent;
                
                // Add ripple effect
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
                
                // Show confirmation dialog
                setTimeout(() => {
                    const confirmed = confirm(`A dëshironi të rezervoni "${serviceName}" për ${servicePrice}?`);
                    if (confirmed) {
                        alert('Faleminderit! Rezervimi juaj u konfirmua. Do të ju kontaktojmë së shpejti për detajet!');
                    }
                }, 300);
            });
        });

        // Gallery Item Click Handler
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const title = this.querySelector('.gallery-overlay h3').textContent;
                const description = this.querySelector('.gallery-overlay p').textContent;
                
                // Create lightbox effect (simple alert for now)
                alert(`${title}\n\n${description}\n\nKlikoni OK për të parë fotën në madhësi të plotë.`);
            });
        });

        // FAQ Toggle Functionality
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach((item, index) => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const icon = question.querySelector('i');
            
            question.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherIcon = otherItem.querySelector('.faq-question i');
                        otherIcon.style.transform = 'rotate(0deg)';
                    }
                });
                
                // Toggle current FAQ item
                const isActive = item.classList.contains('active');
                
                if (isActive) {
                    // Closing
                    item.classList.remove('active');
                    icon.style.transform = 'rotate(0deg)';
                } else {
                    // Opening
                    item.classList.add('active');
                    icon.style.transform = 'rotate(180deg)';
                    
                    // Add ripple effect
                    const ripple = document.createElement('span');
                    ripple.style.position = 'absolute';
                    ripple.style.borderRadius = '50%';
                    ripple.style.background = 'rgba(211, 47, 47, 0.3)';
                    ripple.style.transform = 'scale(0)';
                    ripple.style.animation = 'ripple 0.6s linear';
                    ripple.style.pointerEvents = 'none';
                    ripple.style.left = '50%';
                    ripple.style.top = '50%';
                    ripple.style.width = '20px';
                    ripple.style.height = '20px';
                    ripple.style.marginLeft = '-10px';
                    ripple.style.marginTop = '-10px';
                    
                    question.style.position = 'relative';
                    question.appendChild(ripple);
                    
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                }
            });
            
            // Keyboard accessibility
            question.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });

        // Statistics Counter Animation
        const statNumbers = document.querySelectorAll('.stat-number');
        const statisticsSection = document.querySelector('.statistics-section');

        function animateCounter(element, target) {
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current);
            }, 20);
        }

        // Intersection Observer for Statistics
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    statNumbers.forEach(stat => {
                        const target = parseInt(stat.getAttribute('data-target'));
                        animateCounter(stat, target);
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        if (statisticsSection) {
            statsObserver.observe(statisticsSection);
        }

        // Blog Button Functionality
        const blogButtons = document.querySelectorAll('.blog-btn');
        blogButtons.forEach(button => {
            button.addEventListener('click', function() {
                const blogTitle = this.closest('.blog-card').querySelector('h3').textContent;
                
                // Add ripple effect
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
                
                // Show blog article (simple alert for now)
                setTimeout(() => {
                    alert(`Artikulli "${blogTitle}" do të hapet së shpejti!\n\nPërmbajtja e plotë do të jetë e disponueshme në versionin e ardhshëm.`);
                }, 300);
            });
        });

        // Testimonial Card Hover Effects
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        testimonialCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Scroll to Top Button
        const scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        scrollToTopBtn.className = 'scroll-to-top';
        document.body.appendChild(scrollToTopBtn);

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Show/hide scroll to top button
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.style.display = 'flex';
            } else {
                scrollToTopBtn.style.display = 'none';
            }
        });

        // Contact Form Handling with WhatsApp Integration
        const contactForm = document.querySelector('.contact-form form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const name = this.querySelector('input[type="text"]').value;
                const email = this.querySelector('input[type="email"]').value;
                const message = this.querySelector('textarea').value;
                
                // Simple validation
                if (!name || !email || !message) {
                    alert('Ju lutem plotësoni të gjitha fushat!');
                    return;
                }
                
                // Create WhatsApp message
                const whatsappMessage = `*Mesazh nga website-i BREZ PAS BREZI*
                
*Emri:* ${name}
*Email:* ${email}

*Mesazhi:*
${message}

---
*Dërguar nga:* https://brezpasbrezi.com`;
                
                // Encode message for WhatsApp URL
                const encodedMessage = encodeURIComponent(whatsappMessage);
                
                // WhatsApp phone number (replace with actual number)
                const phoneNumber = '38971294914'; // Numri i vërtetë: +389 71 294 914 (pa +)
                
                // Create WhatsApp URL
                const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
                
                // Show confirmation dialog
                const confirmed = confirm(`A dëshironi të dërgoni mesazhin në WhatsApp?\n\nEmri: ${name}\nEmail: ${email}\n\nMesazhi do të hapet në WhatsApp.`);
                
                if (confirmed) {
                    // Open WhatsApp in new tab
                    window.open(whatsappURL, '_blank');
                    
                    // Reset form
                    this.reset();
                    
                    // Show success message
                    setTimeout(() => {
                        alert('Mesazhi u hap në WhatsApp! Ju lutem dërgoni mesazhin për të konfirmuar kontaktin.');
                    }, 1000);
                }
            });
        }

        // WhatsApp Direct Contact Buttons
        const whatsappButtons = document.querySelectorAll('.whatsapp-btn');
        whatsappButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const service = this.getAttribute('data-service') || 'Informacione';
                const phoneNumber = '38971294914'; // Numri i vërtetë: +389 71 294 914
                
                const message = `Përshëndetje! Jam i interesuar për ${service} nga BREZ PAS BREZI.
                
Ju lutem më dërgoni më shumë informacione.`;
                
                const encodedMessage = encodeURIComponent(message);
                const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
                
                // Test if number is valid
                console.log('Testing WhatsApp number:', phoneNumber);
                console.log('WhatsApp URL:', whatsappURL);
                
                // Open WhatsApp immediately
                window.open(whatsappURL, '_blank');
            });
        });

        // Logo Link Smooth Scrolling
        const logoLink = document.querySelector('.logo-link');
        if (logoLink) {
            logoLink.addEventListener('click', function(e) {
                e.preventDefault();
                
                const homeSection = document.querySelector('#home');
                if (homeSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = homeSection.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }

        console.log('🎭 BREZ PAS BREZI - Website u ngarkua me sukses! Të gjitha funksionalitetet janë aktive.');
    }
});

// Test WhatsApp Number Function
function testWhatsAppNumber() {
    const phoneNumber = '38971294914';
    
    // Try to detect service from button context
    let service = 'Informacione';
    const button = event.target.closest('button');
    if (button && button.closest('.service-card')) {
        const serviceTitle = button.closest('.service-card').querySelector('h3');
        if (serviceTitle) {
            service = serviceTitle.textContent;
        }
    }
    
    const message = `Përshëndetje! Jam i interesuar për ${service} nga BREZ PAS BREZI.
                
Ju lutem më dërgoni më shumë informacione.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    console.log('Phone Number:', phoneNumber);
    console.log('Service:', service);
    console.log('WhatsApp URL:', whatsappURL);
    
    // Open WhatsApp immediately
    window.open(whatsappURL, '_blank');
} 