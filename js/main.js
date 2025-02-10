// Loader
const loader = {
    init() {
        const loaderElement = document.createElement('div');
        loaderElement.className = 'loader';
        loaderElement.innerHTML = `
            <div class="loader__content">
                <div class="loader__progress">
                    <div class="loader__progress-bar"></div>
                </div>
                <div class="loader__text">404 LABS</div>
            </div>
        `;
        document.body.appendChild(loaderElement);

        // Animation du loader
        const tl = gsap.timeline({
            onComplete: () => {
                gsap.to('.loader', {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => loaderElement.remove()
                });
            }
        });

        tl.to('.loader__progress-bar', {
            width: '100%',
            duration: 1.5,
            ease: 'power2.inOut'
        })
            .to('.loader__text', {
                opacity: 0,
                duration: 0.3
            }, '-=0.3');

        return tl;
    }
};

// Variables globales pour Three.js
let scene, camera, renderer, particles, mouseX = 0, mouseY = 0;

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {
    // Split text function
    const splitText = (element) => {
        if (!element) return;
        const text = element.textContent;
        const chars = text.split('');
        element.textContent = '';
        chars.forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? ' ' : char;
            span.className = 'char';
            span.style.animationDelay = `${i * 0.03}s`;
            element.appendChild(span);
        });
    };

    // Apply text split to elements with class 'split-text'
    document.querySelectorAll('.split-text').forEach(splitText);

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.text-reveal, .section-reveal, .stat, .card').forEach(el => {
        observer.observe(el);
    });

    // Stats counter animation
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-value'));
        const duration = 2000;
        const step = target / duration * 10;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current = Math.min(current + step, target);
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    };

    // Observe stats for counter animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.stat__number').forEach(stat => {
        statsObserver.observe(stat);
    });

    // Initialize particles if the function exists
    if (typeof initParticles === 'function') {
        initParticles();
    }

    // GSAP ScrollTrigger animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero section animations
    gsap.from('.hero__content', {
        opacity: 0,
        y: 100,
        duration: 1.5,
        ease: 'power4.out'
    });

    // Innovation section animations
    gsap.from('.innovation__text', {
        scrollTrigger: {
            trigger: '.innovation__text',
            start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.card', {
        scrollTrigger: {
            trigger: '.innovation__cards',
            start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Highlight section animation
    gsap.from('.innovation__highlight', {
        scrollTrigger: {
            trigger: '.innovation__highlight',
            start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: 'power3.out'
    });

    // Initialisation de GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Initialisation de Locomotive Scroll
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        multiplier: 1,
        lerp: 0.1
    });

    // Synchroniser Locomotive Scroll avec ScrollTrigger
    scroll.on('scroll', ScrollTrigger.update);

    ScrollTrigger.scrollerProxy('[data-scroll-container]', {
        scrollTop(value) {
            return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        },
        pinType: document.querySelector('[data-scroll-container]').style.transform ? "transform" : "fixed"
    });

    // Animation du hero avec séquence
    const heroTimeline = gsap.timeline({
        defaults: { ease: "power4.out" }
    });

    heroTimeline
        .from('.hero__title', {
            y: 100,
            opacity: 0,
            duration: 1.2,
            delay: 0.5
        })
        .from('.hero__subtitle', {
            y: 20,
            opacity: 0,
            duration: 0.8
        }, "-=0.8")
        .from('.hero__description', {
            y: 30,
            opacity: 0,
            duration: 0.8
        }, "-=0.6")
        .from('.hero__cta', {
            y: 20,
            opacity: 0,
            duration: 0.8
        }, "-=0.6")
        .from('.hero__stats', {
            x: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2
        }, "-=0.8");

    // Animation des cartes de service
    gsap.from('.service-card', {
        scrollTrigger: {
            trigger: '.services',
            start: 'top center',
            toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2
    });

    // Effet de parallaxe sur les projets
    gsap.utils.toArray('.projets__container > *').forEach(element => {
        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            },
            y: -100
        });
    });

    // Démarrer avec le loader
    const loaderTimeline = loader.init();

    // Attendre que le loader soit terminé
    loaderTimeline.then(() => {
        initScroll();
        if (typeof THREE !== 'undefined') {
            initParticles();
        }
        initLaptopScroll();
    });

    // Animation au scroll pour les sections
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section.children, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2
        });
    });
});

function initLaptopScroll() {
    const laptopSection = document.querySelector('.laptop-section');
    const laptop = document.querySelector('.laptop-container');
    const screen = document.querySelector('.laptop-screen');
    const content = document.querySelector('.screen-content');

    // Timeline principale
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.laptop-section',
            start: 'top top',
            end: '+=300%',
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => {
                const progress = self.progress;

                // Phase 1: 0-0.3 - Approche initiale
                if (progress < 0.3) {
                    const phase1Progress = progress / 0.3;
                    gsap.set(laptop, {
                        scale: 1 + phase1Progress * 0.1
                    });
                }

                // Phase 2: 0.3-0.7 - Zoom dans l'écran
                else if (progress < 0.7) {
                    const phase2Progress = (progress - 0.3) / 0.4;
                    const screenScale = 1 + phase2Progress * 8;
                    const contentScale = 0.2 + phase2Progress * 0.8;

                    gsap.set(screen, {
                        scale: screenScale,
                        xPercent: -50 * phase2Progress,
                        yPercent: -50 * phase2Progress,
                        x: '50%',
                        y: '50%'
                    });

                    gsap.set(content, {
                        scale: contentScale
                    });
                }

                // Phase 3: 0.7-1 - Transition vers plein écran
                else {
                    const phase3Progress = (progress - 0.7) / 0.3;
                    const screenScale = 9 + phase3Progress * 3;

                    gsap.set(screen, {
                        scale: screenScale,
                        xPercent: -50,
                        yPercent: -50,
                        x: '50%',
                        y: '50%'
                    });

                    gsap.set(content, {
                        scale: 1
                    });
                }
            }
        }
    });

    // Animation des sections dans l'écran
    gsap.utils.toArray('.screen-content section').forEach((section, i) => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            scrollTrigger: {
                trigger: section,
                start: 'top center',
                end: 'top top',
                scrub: true,
                containerAnimation: tl
            }
        });
    });
}

function initParticles() {
    try {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);

        const canvas = document.querySelector('#webgl');
        if (!canvas) return;

        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Configuration améliorée des particules
        const particlesGeometry = new THREE.BufferGeometry();
        const count = 5000; // Augmentation du nombre de particules
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 40;
            positions[i + 1] = (Math.random() - 0.5) * 40;
            positions[i + 2] = (Math.random() - 0.5) * 40;

            // Nouvelle couleur violet électrique
            colors[i] = 0.54;     // R: 138/255
            colors[i + 1] = 0.17; // G: 43/255
            colors[i + 2] = 0.89; // B: 226/255
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.05, // Particules légèrement plus grandes
            sizeAttenuation: true,
            vertexColors: true,
            transparent: true,
            opacity: 0.8, // Opacité augmentée
        });

        particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        camera.position.z = 5;

        // Gestion du mouvement de la souris avec plus d'impact
        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        });

        // Animation des particules plus dynamique
        function animateParticles() {
            const positions = particles.geometry.attributes.position.array;
            const time = performance.now() * 0.0001;
        
            for (let i = 0; i < positions.length; i += 3) {
                const x = positions[i];
                const y = positions[i + 1];
                const z = positions[i + 2];
        
                positions[i + 1] = y + Math.sin(time + x) * 0.01;
                positions[i] = x + Math.cos(time + z) * 0.01;
                positions[i + 2] = z + Math.sin(time + y) * 0.01;
            }
        
            particles.geometry.attributes.position.needsUpdate = true;
            
            particles.rotation.y += (mouseX * 0.2 - particles.rotation.y) * 0.05;
            particles.rotation.x += (mouseY * 0.2 - particles.rotation.x) * 0.05;
        } 

        function animate() {
            requestAnimationFrame(animate);
            animateParticles();
            renderer.render(scene, camera);
        }

        animate();

        // Gestion du redimensionnement
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

    } catch (error) {
        console.error('Erreur lors de l\'initialisation des particules:', error);
    }
}

function initScroll() {
    // ... Code initScroll existant ...
} 