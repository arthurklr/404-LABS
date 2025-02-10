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
    // Initialisation de GSAP d'abord
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

    // Animation du hero
    gsap.to('.hero__title', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5
    });

    gsap.to('.hero__subtitle', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.8
    });

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

        // Vérifier si le canvas existe
        const canvas = document.querySelector('#webgl');
        if (!canvas) return;

        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Création des particules
        const particlesGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(5000 * 3);

        for (let i = 0; i < 5000 * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * window.innerWidth * 0.8;
            positions[i + 1] = (Math.random() - 0.5) * window.innerHeight * 0.8;
            positions[i + 2] = (Math.random() - 0.5) * 500; // Plus de profondeur
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        // Matériel des particules avec un shader personnalisé
        const particlesMaterial = new THREE.ShaderMaterial({
            transparent: true,
            uniforms: {
                time: { value: 0 },
                mousePosition: { value: new THREE.Vector3() }
            },
            vertexShader: `
                uniform float time;
                uniform vec3 mousePosition;
                varying float vDistance;

                void main() {
                    vec3 pos = position;
                    float distance = length(mousePosition - pos);
                    vDistance = distance;
                    
                    // Effet d'ondulation subtil
                    pos.y += sin(time * 0.5 + pos.x * 2.0) * 0.1;
                    
                    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                    gl_Position = projectionMatrix * mvPosition;
                    gl_PointSize = 2.0 * (1.0 - distance * 0.1);
                }
            `,
            fragmentShader: `
                varying float vDistance;
                
                void main() {
                    float alpha = 1.0 - smoothstep(0.0, 5.0, vDistance);
                    gl_FragColor = vec4(1.0, 1.0, 1.0, alpha * 0.5);
                }
            `
        });

        particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        // Création des lignes de connexion
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.1
        });

        // Position de la caméra
        camera.position.z = 10;

        // Effet de brouillard subtil
        scene.fog = new THREE.FogExp2(0x000000, 0.08);

        // Gestion de la souris de manière sécurisée
        document.addEventListener('mousemove', (event) => {
            if (mouse) {
                mouseX = (event.clientX / window.innerWidth) * 2 - 1;
                mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
                if (mouse) {
                    mouse.x = mouseX;
                    mouse.y = mouseY;
                }
            }
        });

        // Démarrer l'animation
        animate();

    } catch (error) {
        console.error('Erreur lors de l\'initialisation des particules:', error);
    }
}

// Fonction animate modifiée pour vérifier si renderer existe
function animate() {
    if (!renderer) return;

    requestAnimationFrame(animate);

    const time = performance.now() * 0.001;

    // Mise à jour du shader
    particles.material.uniforms.time.value = time;

    if (mouseX && mouseY) {
        // Conversion des coordonnées de la souris en coordonnées 3D
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2(mouseX, mouseY);
        raycaster.setFromCamera(mouse, camera);
        const intersection = new THREE.Vector3();
        intersection.copy(raycaster.ray.direction);
        intersection.multiplyScalar(10);
        particles.material.uniforms.mousePosition.value = intersection;

        // Rotation douce vers la souris
        particles.rotation.y += (mouseX * 0.5 - particles.rotation.y) * 0.05;
        particles.rotation.x += (mouseY * 0.5 - particles.rotation.x) * 0.05;
    }

    // Animation des particules
    const positions = particles.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(time + positions[i]) * 0.002;
    }
    particles.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
}

function initScroll() {
    // ... Code initScroll existant ...
} 