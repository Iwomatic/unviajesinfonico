// app.js

// Loading Screen Handler
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');

    // Wait a bit for smooth transition
    setTimeout(() => {
        loadingScreen.classList.add('hidden');

        // Remove from DOM after transition
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 1000);
    }, 500);
});

// Track image loading progress
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    const totalImages = Math.max(images.length, 1);
    let loadedImages = 0;

    // Update progress for each loaded image
    function updateProgress() {
        loadedImages++;
        const progress = Math.min((loadedImages / totalImages) * 100, 100);
        const progressBar = document.querySelector('.loading-progress');
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
    }

    // Listen to each image load
    images.forEach(img => {
        if (img.complete) {
            updateProgress();
        } else {
            img.addEventListener('load', updateProgress);
            img.addEventListener('error', updateProgress);
        }
    });

    // Ensure progress bar fills even if no images
    if (images.length === 0) {
        updateProgress();
    }

    // Cycle loading messages only if reduced motion is NOT preferred
    const loadingMessages = [
        "Llenando barriles",
        "Levando anclas",
        "Reticulando la cuadrícula",
        "Limpiando la cubierta",
        "Arriando la mayor",
        "Buscando las torres en la niebla",
        "Maldiciendo a la cartógrafa",
        "Buscando a Rob"

    ];
    let currentMessageIndex = 0;
    const loadingTextElement = document.querySelector('.loading-text');
    let messageInterval;

    function cycleLoadingMessage() {
        if (!loadingTextElement) return;

        // Fade out
        loadingTextElement.classList.add('fade-out');

        // Change text after fade out
        setTimeout(() => {
            currentMessageIndex = (currentMessageIndex + 1) % loadingMessages.length;
            loadingTextElement.textContent = loadingMessages[currentMessageIndex];

            // Fade in
            loadingTextElement.classList.remove('fade-out');
        }, 400);
    }

    // Only start cycling if reduced motion is not preferred
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        messageInterval = setInterval(cycleLoadingMessage, 1000);
    }

    // Clear interval when page loads
    window.addEventListener('load', () => {
        if (messageInterval) {
            clearInterval(messageInterval);
        }
    });

    // Dynamic Page Titles for Accessibility (WCAG AA)
    const sectionTitles = {
        'intro': 'Introducción | Ekyrian: Un Viaje Sinfónico',
        'song-1': 'Ekyrian - Canción 1 | Un Viaje Sinfónico',
        'song-2': 'Alza la Vista - Canción 2 | Un Viaje Sinfónico',
        'song-3': 'Angua - Canción 3 | Un Viaje Sinfónico',
        'song-4': 'Valor - Canción 4 | Un Viaje Sinfónico',
        'song-5': 'Kaguya - Canción 5 | Un Viaje Sinfónico',
        'song-6': 'La Danza de los Muertos - Canción 6 | Un Viaje Sinfónico',
        'song-7': 'Colores en el Viento - Canción 7 | Un Viaje Sinfónico',
        'song-8': 'El Cuento de la Oscuridad - Canción 8 | Un Viaje Sinfónico',
        'song-9': 'Volverte a Soñar - Canción 9 | Un Viaje Sinfónico',
        'song-10': 'El Alquimista - Canción 10 | Un Viaje Sinfónico',
        'song-11': 'El Alma del Viento - Canción 11 | Un Viaje Sinfónico',
        'song-12': 'El Aprendiz - Canción 12 | Un Viaje Sinfónico',
        'song-13': 'La Travesía del Navegante - Canción 13 | Un Viaje Sinfónico',
        'song-14': 'Ítaca - Canción 14 | Un Viaje Sinfónico',
        'song-15': 'La Balada de Wilfred el Enano - Canción 15 | Un Viaje Sinfónico',
        'song-16': 'El Rey Blanco - Canción 16 | Un Viaje Sinfónico',
        'song-17': 'El Templo del Mar - Canción 17 | Un Viaje Sinfónico',
        'song-18': 'Rutas Misteriosas - Canción 18 | Un Viaje Sinfónico',
        'song-19': 'La Llegada de Krampus - Canción 19 | Un Viaje Sinfónico',
        'song-20': 'Más Allá de la Tempestad - Canción 20 | Un Viaje Sinfónico'
    };

    // Update page title based on visible section
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                if (sectionTitles[sectionId]) {
                    document.title = sectionTitles[sectionId];
                }
            }
        });
    }, observerOptions);

    // Observe all story sections
    const allSections = document.querySelectorAll('.story-section, .hero');
    allSections.forEach(section => {
        if (section.id) {
            sectionObserver.observe(section);
        }
    });

    // Init ScrollMagic Controller only if reduced motion is NOT preferred
    const reducedMotionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let controller = null;
    let scrollMagicScenes = [];

    function initParallax() {
        if (controller) return; // Already initialized

        controller = new ScrollMagic.Controller();

        // Select all story sections
        const storySections = document.querySelectorAll('.story-section');

        storySections.forEach((section) => {
            // Find the parallax background element within the section
            const parallaxBg = section.querySelector('.background-parallax');

            // Create a new GSAP tween for the parallax effect
            const parallaxTween = gsap.fromTo(parallaxBg,
                { y: '-30vh' },
                { y: '30vh', ease: 'none' }
            );

            // Create a ScrollMagic scene
            const scene = new ScrollMagic.Scene({
                triggerElement: section,
                triggerHook: 1,
                duration: '100%'
            })
                .setTween(parallaxTween)
                .addTo(controller);

            scrollMagicScenes.push(scene);
        });
    }

    function destroyParallax() {
        if (!controller) return;

        // Kill all active GSAP tweens first to stop animation immediately
        const parallaxBgs = document.querySelectorAll('.background-parallax');
        parallaxBgs.forEach(bg => {
            gsap.killTweensOf(bg);
            gsap.set(bg, { clearProps: 'all', y: 0 });
        });

        // Destroy all scenes
        scrollMagicScenes.forEach(scene => scene.destroy(true));
        scrollMagicScenes = [];

        // Destroy controller
        controller.destroy(true);
        controller = null;
    }

    // Initialize or destroy based on current preference
    if (!reducedMotionMediaQuery.matches) {
        initParallax();
    }

    // Listen for changes in reduced motion preference
    reducedMotionMediaQuery.addEventListener('change', (e) => {
        if (e.matches) {
            // User enabled reduced motion
            destroyParallax();
        } else {
            // User disabled reduced motion
            initParallax();
        }
    });

    // Smooth scrolling function
    function smoothScrollTo(targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Handle skip link focus management (WCAG 2.4.1)
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            const main = document.getElementById('main');
            if (main) {
                main.focus();
                main.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    // Start experience button functionality
    const startBtn = document.getElementById('start-experience');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            smoothScrollTo('intro');
        });
    }

    // Next button functionality
    const nextBtns = document.querySelectorAll('.next-btn');
    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            if (target && target !== 'end') {
                smoothScrollTo(target);
            } else if (target === 'end') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Previous button functionality
    const prevBtns = document.querySelectorAll('.prev-btn');
    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            if (target) {
                smoothScrollTo(target);
            }
        });
    });

    // Scroll to top button functionality
    const scrollToTopBtn = document.getElementById('scroll-to-top-btn');

    // Show/hide button based on scroll position
    function toggleScrollToTopBtn() {
        const introSection = document.getElementById('intro');
        if (introSection) {
            const introBottom = introSection.offsetTop + introSection.offsetHeight;
            if (window.pageYOffset > introBottom) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        }
    }

    // Undock all docked containers when user scrolls
    function undockAllOnScroll() {
        const dockedContainers = document.querySelectorAll('.content-container.docked');

        dockedContainers.forEach(container => {
            container.classList.remove('docked');

            const btn = container.querySelector('.dock-toggle-btn');
            if (btn) {
                const icon = btn.querySelector('.dock-icon');
                if (icon) {
                    icon.textContent = '→';
                    btn.setAttribute('title', 'Colapsa a la derecha');
                }
            }
        });
    }

    // Combined scroll handler
    function handleScroll() {
        toggleScrollToTopBtn();
        undockAllOnScroll();
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Add click event listener for scroll to top
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Dock/Undock functionality
    const dockToggleBtns = document.querySelectorAll('.dock-toggle-btn');

    dockToggleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();

            const contentContainer = btn.closest('.content-container');

            if (contentContainer) {
                contentContainer.classList.toggle('docked');

                const icon = btn.querySelector('.dock-icon');
                if (icon) {
                    if (contentContainer.classList.contains('docked')) {
                        icon.textContent = '←';
                        btn.setAttribute('title', 'Expandir contenido');
                    } else {
                        icon.textContent = '→';
                        btn.setAttribute('title', 'Colapsa a la derecha');
                    }
                }
            }
        });
    });

    // Side Menu functionality
    const menuToggle = document.getElementById("menu-toggle");
    const sideMenu = document.getElementById("side-menu");
    const menuOverlay = document.getElementById("menu-overlay");
    const menuItems = document.querySelectorAll(".menu-item");

    // Function to open menu
    function openMenu() {
        sideMenu.classList.add("open");
        menuOverlay.classList.add("active");
        menuToggle.classList.add("active");
        menuToggle.setAttribute("aria-expanded", "true");
    }

    // Function to close menu
    function closeMenu() {
        sideMenu.classList.remove("open");
        menuOverlay.classList.remove("active");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
    }

    // Toggle menu on button click
    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            if (sideMenu.classList.contains("open")) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    // Close menu on overlay click
    if (menuOverlay) {
        menuOverlay.addEventListener("click", closeMenu);
    }

    // Handle menu item clicks
    menuItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();

            const targetId = item.getAttribute("data-target");

            closeMenu();

            setTimeout(() => {
                if (targetId) {
                    smoothScrollTo(targetId);
                }
            }, 200);
        });
    });

    // Close menu on escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && sideMenu.classList.contains("open")) {
            closeMenu();
        }
    });

});
