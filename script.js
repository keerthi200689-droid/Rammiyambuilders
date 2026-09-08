/* =========================================
   RAMMIYAM HOMES
   INTERACTIONS
========================================= */


document.addEventListener("DOMContentLoaded", () => {


    /* =====================================
       PRELOADER
    ===================================== */

    const preloader =
        document.querySelector(".preloader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            preloader.classList.add("hide");

            document.body.classList.add("loaded");

        }, 700);

    });

    /* =====================================
       LAZYLOAD FALLBACK (for older browsers)
    ===================================== */

    if (!('loading' in HTMLImageElement.prototype)) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            // lazy-load fallback using IntersectionObserver
            const io = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    const node = entry.target;
                    // If data-srcset exists, set it (not used here)
                    if (node.dataset.src) node.src = node.dataset.src;
                    observer.unobserve(node);
                });
            });
            io.observe(img);
        });
    }


    /* =====================================
       NAVBAR SCROLL
    ===================================== */

    const navbar =
        document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    });


    /* =====================================
       MOBILE MENU
    ===================================== */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const navMenu =
        document.querySelector(".nav-menu");

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("mobile-open");

        const icon =
            menuToggle.querySelector("i");

        if (
            navMenu.classList.contains(
                "mobile-open"
            )
        ) {

            icon.classList.remove(
                "fa-bars"
            );

            icon.classList.add(
                "fa-xmark"
            );

        } else {

            icon.classList.remove(
                "fa-xmark"
            );

            icon.classList.add(
                "fa-bars"
            );

        }

    });


    /* =====================================
       CLOSE MOBILE MENU
    ===================================== */

    document.querySelectorAll(
        ".nav-menu a"
    ).forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove(
                "mobile-open"
            );

            const icon =
                menuToggle.querySelector("i");

            icon.classList.remove(
                "fa-xmark"
            );

            icon.classList.add(
                "fa-bars"
            );

        });

    });


    /* =====================================
       SCROLL REVEAL
    ===================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

    /* =====================================
       CORE VALUES STAGGERED ANIMATION
    ===================================== */

    const coreSection = document.querySelector('.core-content');

    if (coreSection) {
        const coreObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                const items = document.querySelectorAll('.core-list li');
                items.forEach((li, i) => {
                    setTimeout(() => li.classList.add('visible'), i * 120);
                });

                observer.unobserve(entry.target);
            });
        }, { threshold: 0.18 });

        coreObserver.observe(coreSection);
    }


    /* =====================================
       COUNTERS
    ===================================== */

    const counters =
        document.querySelectorAll(".counter");

    const counterObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting)
                        return;

                    const counter =
                        entry.target;

                    const target =
                        Number(
                            counter.dataset.target
                        );

                    let current = 0;

                    const duration = 1600;

                    const start =
                        performance.now();

                    function updateCounter(time) {

                        const progress =
                            Math.min(
                                (time - start) /
                                duration,
                                1
                            );

                        const eased =
                            1 -
                            Math.pow(
                                1 - progress,
                                3
                            );

                        current =
                            Math.floor(
                                eased * target
                            );

                        counter.textContent =
                            current.toLocaleString();

                        if (progress < 1) {

                            requestAnimationFrame(
                                updateCounter
                            );

                        } else {

                            counter.textContent =
                                target.toLocaleString();

                        }

                    }

                    requestAnimationFrame(
                        updateCounter
                    );

                    observer.unobserve(counter);

                });

            },
            {
                threshold: .7
            }
        );


    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

    /* =====================================
       HERO CONTROLS (DOTS, ARROWS, PAUSE)
    ===================================== */

    const slides = Array.from(document.querySelectorAll('.hero-slide'));
    const dots = Array.from(document.querySelectorAll('.hero-dot'));
    const prevBtn = document.querySelector('.hero-prev');
    const nextBtn = document.querySelector('.hero-next');
    const heroBackground = document.querySelector('.hero-background');

    let currentSlide = slides.findIndex(s => s.classList.contains('active')) || 0;
    let heroTimer = null;
    const HERO_INTERVAL = 5000;

    function goToSlide(index) {
        slides.forEach((s, i) => s.classList.toggle('active', i === index));
        dots.forEach((d, i) => d.classList.toggle('active', i === index));
        currentSlide = index;
    }

    function nextSlide() { goToSlide((currentSlide + 1) % slides.length); }
    function prevSlide() { goToSlide((currentSlide - 1 + slides.length) % slides.length); }

    function startHeroTimer() {
        stopHeroTimer();
        heroTimer = setInterval(nextSlide, HERO_INTERVAL);
    }

    function stopHeroTimer() { if (heroTimer) { clearInterval(heroTimer); heroTimer = null; } }

    // attach events
    dots.forEach(d => d.addEventListener('click', () => { goToSlide(Number(d.dataset.index)); startHeroTimer(); }));
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startHeroTimer(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startHeroTimer(); });

    // pause on hover
    if (heroBackground) {
        heroBackground.addEventListener('mouseenter', stopHeroTimer);
        heroBackground.addEventListener('mouseleave', startHeroTimer);
    }

    // keyboard accessibility
    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // start auto play
    if (slides.length > 1) startHeroTimer();

    /* =====================================
       STAGGERED REVEAL FOR KEY SECTIONS
    ===================================== */

    const staggerSections = ['.stats-section', '.project-grid', '.testimonial-grid', '.core-values', '.vision'];

    staggerSections.forEach(selector => {
        const el = document.querySelector(selector);
        if (!el) return;

        const children = el.querySelectorAll('.reveal, .stat-card, .project-card, .testimonial, .core-list li, .vision-content p');

        const obs = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                children.forEach((child, i) => {
                    setTimeout(() => child.classList.add('visible'), i * 90);
                });

                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12 });

        obs.observe(el);
    });


    /* =====================================
       FAQ
    ===================================== */

    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );

    faqItems.forEach(item => {

        const question =
            item.querySelector(
                ".faq-question"
            );

        question.addEventListener(
            "click",
            () => {

                const alreadyActive =
                    item.classList.contains(
                        "active"
                    );

                faqItems.forEach(
                    faq => {

                        faq.classList.remove(
                            "active"
                        );

                    }
                );

                if (!alreadyActive) {

                    item.classList.add(
                        "active"
                    );

                }

            }
        );

    });


    /* =====================================
       CONTACT FORM
    ===================================== */

    const form = document.querySelector("#contactForm");

    // Submit enquiries via WhatsApp: open a prefilled message to the business number
    const WHATSAPP_NUMBER = '919841660902'; // international format without +

    form.addEventListener("submit", event => {
        event.preventDefault();

        const button = form.querySelector(".form-submit");
        const originalText = button.innerHTML;

        // Collect form values
        const formData = new FormData(form);
        const name = formData.get('name') || '';
        const phone = formData.get('phone') || '';
        const email = formData.get('email') || '';
        const interest = formData.get('interest') || '';
        const message = formData.get('message') || '';

        const lines = [
            'Hi Rammiyam Homes,',
            `Name: ${name}`,
            `Phone: ${phone}`,
            `Email: ${email}`,
            `Interest: ${interest}`,
            `Message: ${message}`
        ];

        const text = lines.join('\n');
        const waUrl = `https://wa.me/${9841660902}?text=${encodeURIComponent(text)}`;

        // UI feedback
        button.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Opening WhatsApp...`;
        button.disabled = true;

        // Open WhatsApp with the prefilled message
        window.open(waUrl, '_blank');

        // Restore UI and reset form after short delay
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            form.reset();
        }, 1500);

    });


    /* =====================================
       CUSTOM CURSOR
    ===================================== */

    const cursor =
        document.querySelector(
            ".cursor"
        );

    const cursorDot =
        document.querySelector(
            ".cursor-dot"
        );


    document.addEventListener(
        "mousemove",
        event => {

            cursor.style.left =
                `${event.clientX}px`;

            cursor.style.top =
                `${event.clientY}px`;

            cursorDot.style.left =
                `${event.clientX}px`;

            cursorDot.style.top =
                `${event.clientY}px`;

        }
    );


    const interactiveElements =
        document.querySelectorAll(
            "a, button, input, textarea, select"
        );

    interactiveElements.forEach(element => {

        element.addEventListener(
            "mouseenter",
            () => {

                cursor.classList.add(
                    "active"
                );

            }
        );

        element.addEventListener(
            "mouseleave",
            () => {

                cursor.classList.remove(
                    "active"
                );

            }
        );

    });


    /* =====================================
       ACTIVE NAVIGATION
    ===================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav-menu a"
        );


    window.addEventListener(
        "scroll",
        () => {

            let current = "";

            sections.forEach(section => {

                const sectionTop =
                    section.offsetTop - 180;

                if (
                    window.scrollY >=
                    sectionTop
                ) {

                    current =
                        section.getAttribute(
                            "id"
                        );

                }

            });


            navLinks.forEach(link => {

                link.classList.remove(
                    "active"
                );

                if (
                    link.getAttribute(
                        "href"
                    ) === `#${current}`
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            });

        }
    );


    /* =====================================
       PROJECT IMAGE PARALLAX
    ===================================== */

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );

    projectCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const rotateY =
                    ((x / rect.width) -
                        .5) * 3;

                const rotateX =
                    ((y / rect.height) -
                        .5) * -3;

                card.style.transform =
                    `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    scale(1.01)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });


});