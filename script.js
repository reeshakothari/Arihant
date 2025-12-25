// Enhanced JavaScript with Slider
document.addEventListener('DOMContentLoaded', function() {
    // Hero Slider Functionality
    const slides = document.querySelectorAll('.slide');
    const sliderNext = document.getElementById('sliderNext');
    const sliderPrev = document.getElementById('sliderPrev');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        // Remove active class from all slides
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // Add active class to current slide
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');

        // Reset animations
        const activeSlide = slides[currentSlide];
        const animatedElements = activeSlide.querySelectorAll('.fade-in-up');
        animatedElements.forEach(el => {
            el.style.animation = 'none';
            setTimeout(() => {
                el.style.animation = '';
            }, 10);
        });
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    // Event listeners for slider
    if (sliderNext) {
        sliderNext.addEventListener('click', () => {
            nextSlide();
            stopSlideShow();
            startSlideShow();
        });
    }

    if (sliderPrev) {
        sliderPrev.addEventListener('click', () => {
            prevSlide();
            stopSlideShow();
            startSlideShow();
        });
    }

    // Indicator click events
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            stopSlideShow();
            startSlideShow();
        });
    });

    // Start automatic slideshow
    if (slides.length > 0) {
        startSlideShow();
    }

    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            // Animate hamburger menu
            const spans = this.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // Partners Slider - Seamless Infinite Auto-Scroll
    const partnersTrack = document.getElementById('partnersTrack');

    if (partnersTrack) {
        // Store original partner cards
        const originalCards = Array.from(partnersTrack.children);
        const originalCount = originalCards.length;

        // Duplicate partner cards multiple times for truly seamless infinite loop
        for (let i = 0; i < 4; i++) {
            originalCards.forEach(card => {
                const clone = card.cloneNode(true);
                partnersTrack.appendChild(clone);
            });
        }

        let scrollPosition = 0;
        let animationId;
        let isPaused = false;
        const scrollSpeed = 1; // pixels per frame

        let singleSetWidth = 0;

        // Function to calculate the exact width of one set
        function calculateSetWidth() {
            const allCards = partnersTrack.children;
            let width = 0;

            // Calculate width of first set of cards (including gaps)
            for (let i = 0; i < originalCount; i++) {
                width += allCards[i].offsetWidth;
                if (i < originalCount - 1) {
                    width += 24; // Add gap between cards (not after the last card)
                }
            }

            // Add the gap after the last card of the set to the first card of next set
            width += 24;

            return width;
        }

        // Smooth continuous scroll function
        function smoothScroll() {
            if (!isPaused) {
                scrollPosition += scrollSpeed;

                // Reset position seamlessly when first set has scrolled out of view
                if (scrollPosition >= singleSetWidth) {
                    scrollPosition = scrollPosition - singleSetWidth;
                }

                // Use translate3d for better GPU acceleration and smoother animation
                partnersTrack.style.transform = `translate3d(-${scrollPosition}px, 0, 0)`;
            }
            animationId = requestAnimationFrame(smoothScroll);
        }

        // Start the animation after layout is ready
        setTimeout(() => {
            singleSetWidth = calculateSetWidth();
            console.log('Single set width:', singleSetWidth); // Debug
            smoothScroll();
        }, 100);

        // Pause on hover
        partnersTrack.addEventListener('mouseenter', function() {
            isPaused = true;
        });

        // Resume on mouse leave
        partnersTrack.addEventListener('mouseleave', function() {
            isPaused = false;
        });

        // Optional: Pause on individual card click
        partnersTrack.addEventListener('click', function(e) {
            if (e.target.closest('.partner-card')) {
                isPaused = true;
            }
        });

        // Recalculate on window resize
        window.addEventListener('resize', function() {
            singleSetWidth = calculateSetWidth();
        });
    }

    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                company: document.getElementById('company').value,
                interest: document.getElementById('interest').value,
                message: document.getElementById('message').value
            };

            // Here you would typically send the data to a server
            console.log('Form submitted:', formData);

            // Show success message
            alert('Thank you for your message! We will get back to you soon.');

            // Reset form
            contactForm.reset();
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add scroll effect to navbar
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        }
    });

    // Enhanced scroll-triggered animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe various elements with staggered animation
    const animatedElements = document.querySelectorAll('.stat-card, .service-card, .product-category, .partner-card, .service-card-detail, .mission-box');

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Animate section headers on scroll
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.style.opacity = '0';
        header.style.transform = 'translateY(20px)';
        header.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(header);
    });

    // Counter animation for stats
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 16);
    }

    // Observe stat cards and trigger counter animation
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const numberElement = entry.target.querySelector('h3');
                const targetNumber = parseInt(numberElement.textContent);
                animateCounter(numberElement, targetNumber);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-card').forEach(card => {
        statObserver.observe(card);
    });

});
